import Rive from '@rive-app/webgl-advanced-single';

class RivePlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager, 'RivePlugin');
    this.riveInstances = [];
    this.renderer = null;
    this.Rive = null; 

    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this);
    }
  }

  async boot() {

    this.Rive = await Rive();

    console.log('RivePlugin boot');
    console.log('Rive:', this.Rive);
    console.log('Rive module:', Rive);
    console.log('Rive module type:', typeof this.Rive);
    console.log('Rive module keys:', Object.keys(this.Rive));

    // Print all the keys and their types available in this.Rive
    for (const key of Object.keys(this.Rive)) {
      console.log(`Key: ${key}, Type: ${typeof this.Rive[key]}`);
    }

    // Check that the Rive module is loaded correctly
    if (this.Rive) {
      console.log('Rive module loaded correctly');
    } else {
      console.error('Rive module failed to load');
      return;
    }

    if (typeof this.Rive.ready === 'function') {
      await this.Rive.ready();
      console.log('Rive WASM file loaded');
    } else {
      console.error('Rive WASM file not loaded');
      return;
    }

    // Ensure that the Phaser rendering context is ready
    if (!this.scene.sys.game.renderer) {
      console.error('Phaser rendering context is not ready.');
      return;
    }

    try {
      const canvas = this.scene.sys.game.canvas;
      console.log('Creating Rive renderer for canvas:', canvas);
      if (typeof this.Rive.makeRenderer === 'function') {
        this.renderer = this.Rive.makeRenderer(canvas, true);
        console.log('Rive renderer created:', this.renderer);
      } else {
        console.error('makeRenderer function not available in Rive module');
        return;
      }
    } catch (error) {
      console.error('Error while creating the Rive renderer:', error);
      return;
    }

    const eventEmitter = this.systems.events;

    eventEmitter.on('start', this.sceneStart, this);
    eventEmitter.on('ready', this.sceneReady, this);
    eventEmitter.on('preupdate', this.scenePreUpdate, this);
    eventEmitter.on('update', this.sceneUpdate, this);
    eventThereEmitter.on('postupdate', this.scenePostUpdate, this);
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
    eventEmitter.on('destroy', this.sceneDestroy, showing);
  }

  sceneStart() {
    console.log('RivePlugin Scene started');
  }

  sceneReady() {
    console.log('RivePlugin Scene ready');
  }

  scenePreUpdate() {
    console.log('RivePlugin Scene preupdate');
  }

  sceneUpdate(time, delta) {
    this.riveInstances.forEach(instance => {
      const elapsedTimeSec = delta / 1000;
      instance.animation.advance(elapsedTimeSec);
      instance.animation.apply(1);
      instance.artboard.advance(elapsedTimeSec);
      this.renderer.clear();
      this.renderer.save();
      this.renderer.align(
        this.Rive.Fit.contain,
        this.Rive.Alignment.center,
        { minX: 0, minY: 0, maxX: this.scene.sys.game.canvas.width, maxY: this.scene.sys.game.canvas.height },
        instance.artboard.bounds
      );
      instance.artboard.draw(this.renderer);
      this.renderer.restore();
      this.renderer.flush();
    });
  }

  scenePostUpdate() {
    console.log('RivePlugin Scene postupdate');
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

  async loadRive(url, callback) {
    console.log('Loading Rive file from URL:', url);
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();

      console.log('Loading Rive file buffer:', buffer);
      const file = await this.Rive.load(new Uint8Array(buffer));
      const artboard = file.defaultArtboard();
      const animation = new this.Rive.LinearAnimationInstance(artboard.animationByName('idle'));

      this.riveInstances.push({ file, artboard, animation });

      if (callback) callback(file, artboard, animation);
    } catch (error) {
      console.error('Error while loading the Rive file:', error);
    }
  }

  playAnimation(instanceIndex, animationName) {
    console.log('Playing animation:', animationName, 'on instance:', instanceIndex);
    const instance = this.riveInstances[instanceIndex];
    if (instance) {
      instance.animation = new this.Rive.LinearAnimationInstance(instance.artboard.animationByName(animationName));
      instance.animation.play();
    }
  }

  getCanvas(instanceIndex) {
    console.log('Getting canvas for instance index:', instanceIndex);
    return this.scene.sys.game.canvas;
  }
}

export default RivePlugin;
