import Rive from '@rive-app/canvas-advanced-single';

class RivePlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager, 'RivePlugin');
    this.riveInstances = [];
    this.renderer = null;
    this.Rive = null;
    this.game = pluginManager.game;
    this.isWebGL = this.game.config.renderType === 2;
    this.gl = this.isWebGL ? this.game.renderer.gl : null;
    this.canvas = this.game.canvas;
    this.lastTime = 0;

    pluginManager.registerFileType("rive", this.riveLoaderCallback);

  }
  riveLoaderCallback(key, url) {
    const fileConfig = {
      type: "rive",
      key,
      url,
      extension: "riv",
    };
    this.addFile(new LoadRivFile(this, fileConfig));
    return this;
  }
  boot() {
    Rive().then(rive => {
      this.Rive = rive;
      this.Rive.enableFPSCounter();

      if (!this.scene.sys.game.renderer) {
        console.error('Phaser rendering context is not ready.');
        return;
      }

      if (!this.canvas || !(this.canvas instanceof HTMLCanvasElement)) {
        console.error('Canvas is not a valid HTMLCanvasElement:', this.canvas);
        return;
      }

      if (!this.gl || !(this.gl instanceof WebGLRenderingContext)) {
        console.error('Phaser rendering context is not a WebGLRenderingContext:', this.gl);
        return;
      }

      try {
        console.log('Creating Rive renderer for canvas:', this.canvas);
        if (typeof this.Rive.makeRenderer === 'function') {
          this.renderer = this.Rive.makeRenderer(this.canvas, true);
          console.log('Rive renderer created:', this.renderer);
        } else {
          console.error('makeRenderer function not available in Rive module');
          return;
        }
      } catch (error) {
        console.error('Error while creating the Rive renderer:', error);
        return;
      }
      this.setupEventHandlers();
    }).catch(error => {
      console.error('Rive WASM file not loaded:', error);
    });
  }

  setupEventHandlers() {
    const eventEmitter = this.systems.events;

    eventEmitter.on('start', this.sceneStart, this);
    eventEmitter.on('ready', this.sceneReady, this);
    eventEmitter.on('preupdate', this.scenePreUpdate, this);
    eventEmitter.on('update', this.sceneUpdate, this);
    eventEmitter.on('postupdate', this.scenePostUpdate, this);
    eventEmitter.on('resize', this.sceneResize, this);
    eventEmitter.on('pause', this.scenePause, this);
    eventEmitter.on('resume', this.sceneResume, this);
    eventEmitter.on('sleep', this.sceneSleep, this);
    eventEmitter.on('wake', this.sceneWake, this);
    eventEmitter.on('transitioninit', this.sceneTransitionInit, this);
    eventEmitter.on('transitionstart', this.sceneTransitionStart, this);
    eventEmitter.on('transitioncomplete', this.sceneTransitionComplete, this);
    eventEmitter.on('transitionout', this.sceneTransitionOut, this);
    eventEmitter.on('shutdown', this.sceneShutdown, this);
    eventEmitter.on('destroy', this.sceneDestroy, this);
    eventEmitter.on('prerender', this.scenePrerender, this);
    eventEmitter.on('render', this.sceneRender, this);
    eventEmitter.on('postrender', this.scenePostrender, this);
  }

  sceneStart() {
    console.log('RivePlugin Scene started');
  }

  sceneReady() {
    console.log('RivePlugin Scene ready');
  }

  scenePreUpdate() {
    // Preparazioni preliminari per il rendering
  }

  sceneUpdate(time, delta) {
    const elapsedTimeSec = delta / 1000; // Converti ms in secondi

    this.riveInstances.forEach(instance => {
      if (instance.artboard) {
        if (instance.animation) {
          // console.log('Advancing animation by:', elapsedTimeSec);
          instance.animation.advance(elapsedTimeSec);
          instance.animation.apply(instance.artboard);
          // console.log('Animation applied.');
        }
        if (instance.stateMachine) {
          // console.log('Advancing state machine by:', elapsedTimeSec);
          instance.stateMachine.advance(elapsedTimeSec);
        }
        // console.log('Advancing artboard by:', elapsedTimeSec);
        instance.artboard.advance(elapsedTimeSec);
        this.renderer.save();
        // console.log('Drawing artboard.');
        instance.artboard.draw(this.renderer);
        this.renderer.restore();
      }
      this.renderer.align(
        this.Rive.Fit.contain,
        this.Rive.Alignment.center,
        { minX: 0, minY: 0, maxX: this.scene.sys.game.canvas.width, maxY: this.scene.sys.game.canvas.height },
        instance.artboard.bounds
      );
    });
  }

  scenePostUpdate() {
    this.renderer.flush();
    this.Rive.requestAnimationFrame(() => {
      // this.scene.sys.game.loop.tick();
    });
  }

  scenePrerender() {
    // this.renderer.clear();
  }

  sceneRender(time, delta) {
    // Gestisci il rendering qui se necessario
  }

  scenePostrender() {
    console.log('RivePlugin Scene Render');
  }

  sceneResize() {
    console.log('RivePlugin Scene resize');
  }

  scenePause() {
    console.log('RivePlugin Scene pause');
  }

  sceneResume() {
    console.log('RivePlugin Scene resume');
  }

  sceneSleep() {
    console.log('RivePlugin Scene sleep');
  }

  sceneWake() {
    console.log('RivePlugin Scene wake');
  }

  sceneTransitionInit() {
    console.log('RivePlugin Scene transitioninit');
  }

  sceneTransitionStart() {
    console.log('RivePlugin Scene transitionstart');
  }

  sceneTransitionComplete() {
    console.log('RivePlugin Scene transitioncomplete');
  }

  sceneTransitionOut() {
    console.log('RivePlugin Scene transitionout');
  }

  sceneShutdown() {
    console.log('RivePlugin Scene shutdown');
    this.riveInstances.forEach(instance => {
      instance.animation.delete();
      instance.artboard.delete();
    });
    this.riveInstances = [];
  }

  sceneDestroy() {
    console.log('RivePlugin Scene destroyed');
    if (this.renderer) {
      this.renderer.delete();
      this.renderer = null;
    }
  }

  loadRive(key, url, callback) {
    this.scene.load.binary({
      key: key,
      url: url,
      dataType: Uint8Array
    });
    this.scene.load.once('complete', () => {
      const buffer = this.scene.cache.binary.get(key);
      this.processRiveFile(buffer, callback);
    });
  }

  processRiveFile(buffer, callback) {
    this.Rive.load(buffer).then(file => {
      if (!file) {
        console.error('Failed to load the Rive file.');
        return;
      }

      const artboard = file.defaultArtboard();
      if (!artboard) {
        console.error('Artboard not found in the Rive file.');
        return;
      }

      const animation = new this.Rive.LinearAnimationInstance(
        artboard.animationByIndex(0),
        artboard
      );

      if (!animation) {
        console.error('Animation not found on the artboard.');
        return;
      }

      let stateMachine = null;
      if (artboard.stateMachineByIndex(0)) {
        stateMachine = new this.Rive.StateMachineInstance(
          artboard.stateMachineByIndex(0),
          artboard
        );
      }

      this.riveInstances.push({ file, artboard, animation, stateMachine });
      console.log('Rive file and instances loaded successfully.');

      if (callback) callback(true, file, artboard, animation, stateMachine);
    }).catch(error => {
      console.error('Error while loading the Rive file:', error);
      if (callback) callback(false);
    });
  }

  playAnimation(instanceIndex, animationName) {
    // Implement animation playback logic here
  }

  getCanvas(instanceIndex) {
    console.log('Getting canvas for instance index:', instanceIndex);
    return this.scene.sys.game.canvas;
  }
  
}
class LoadRivFile extends Phaser.Loader.FileTypes.BinaryFile {
  onProcess() {
    this.state = Phaser.Loader.FILE_PROCESSING;
    if (this.xhrLoader) {
      this.data = this.xhrLoader.response;
    } else {
      console.error("Failed to create canvas texture.");
    }
    RiveObjectFactory
      .processRivFile(this.key, new Uint8Array(this.data))
      .then((factoryInstance) => {
        console.log('Rive file contents:', factoryInstance);
        this.onProcessComplete();
      });
  }
}

class RiveObjectFactory {
  static rive;
  static rivePromise;
  static factoryMap = new Map();
  file;
  key;

  constructor(key, file) {
    this.file = file;
    this.key = key;
  }

  static async awaitRuntime() {
    if (this.rive) {
      return this.rive;
    }
    if (!this.rivePromise) {
      this.rivePromise = Rive();
      this.rive = await this.rivePromise;
    }

    return this.rivePromise;
  }

  static getRuntime() {
    if (this.rive) {
      return this.rive;
    } else {
      throw new Error("Rive runtime not loaded yet");
    }
  }

  static async processRivFile(key, buffer) {
    if (this.factoryMap.has(key)) {
      console.warn("Already processed", { rivFileKey: key });
      return;
    }
    const rive = await this.awaitRuntime();
    const file = await rive.load(buffer);
    const factoryInstance = new RiveObjectFactory(key, file);
    if (this.factoryMap.has(key)) {
      console.warn("Race when processing", { rivFileKey: key });
    }
    this.factoryMap.set(key, factoryInstance);
  }

  static getFactory(key) {
    const factory = this.factoryMap.get(key);
    if (!factory) {
      console.warn("No rive factory for key", key);
    }
    return factory;
  }

  getArtboard(artboardName) {
    let artboard;
    if (artboardName) {
      artboard = this.file.artboardByName(artboardName);
    } else {
      artboard = this.file.defaultArtboard();
    }
    if (!artboard) {
      console.warn(`Unknown artboard ${artboardName} in ${this.key}`);
    }
    return artboard;
  }
}


export default RivePlugin;
