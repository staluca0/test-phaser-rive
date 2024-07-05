// import Rive from '@rive-app/webgl-advanced-single';

// class RivePlugin extends Phaser.Plugins.ScenePlugin {
//   constructor(scene, pluginManager) {
//     super(scene, pluginManager, 'RivePlugin');
//     this.riveInstances = [];
//     this.renderer = null;
//     this.Rive = null;
//     this.game = pluginManager.game;
//     this.isWebGL = this.game.config.renderType === 2;
//     this.gl = this.isWebGL ? this.game.renderer.gl : null;
//     this.canvas = this.game.canvas;
//     this.lastTime = 0;

//   }

//   boot() {
//     Rive().then(rive => {
//       this.Rive = rive;
//         // Log the contents of the Rive file
      
//       this.Rive.enableFPSCounter();

//       // Ensure that the Phaser rendering context is ready
//       if (!this.scene.sys.game.renderer) {
//         console.error('Phaser rendering context is not ready.');
//         return;
//       }

//       if (!this.canvas || !(this.canvas instanceof HTMLCanvasElement)) {
//         console.error('Canvas is not a valid HTMLCanvasElement:', this.canvas);
//         return;
//       }

//       if (!this.gl || !(this.gl instanceof WebGLRenderingContext)) {
//         console.error('Phaser rendering context is not a WebGLRenderingContext:', this.gl);
//         return;
//       }

//       try {
//         console.log('Creating Rive renderer for canvas:', this.canvas);
//         if (typeof this.Rive.makeRenderer === 'function') {
//           this.renderer = this.Rive.makeRenderer(this.canvas, true);
//           console.log('Rive renderer created:', this.renderer);
//         } else {
//           console.error('makeRenderer function not available in Rive module');
//           return;
//         }
//       } catch (error) {
//         console.error('Error while creating the Rive renderer:', error);
//         return;
//       }
//       this.setupEventHandlers();

//     }).catch(error => {
//       console.error('Rive WASM file not loaded:', error);
//     });

//   }

//   setupEventHandlers() {
//     const eventEmitter = this.systems.events;

//     eventEmitter.on('start', this.sceneStart, this);
//     eventEmitter.on('ready', this.sceneReady, this);
//     eventEmitter.on('preupdate', this.scenePreUpdate, this);
//     eventEmitter.on('update', this.sceneUpdate, this);
//     eventEmitter.on('postupdate', this.scenePostUpdate, this);
//     eventEmitter.on('resize', this.sceneResize, this);
//     eventEmitter.on('pause', this.scenePause, this);
//     eventEmitter.on('resume', this.sceneResume, this);
//     eventEmitter.on('sleep', this.sceneSleep, this);
//     eventEmitter.on('wake', this.sceneWake, this);
//     eventEmitter.on('transitioninit', this.sceneTransitionInit, this);
//     eventEmitter.on('transitionstart', this.sceneTransitionStart, this);
//     eventEmitter.on('transitioncomplete', this.sceneTransitionComplete, this);
//     eventEmitter.on('transitionout', this.sceneTransitionOut, this);
//     eventEmitter.on('shutdown', this.sceneShutdown, this);
//     eventEmitter.on('destroy', this.sceneDestroy, this);
//     eventEmitter.on('prerender', this.scenePrerender, this);
//     eventEmitter.on('render', this.sceneRender, this);
//     eventEmitter.on('postrender', this.scenePostrender, this);

//   }

//   sceneStart() {
//     console.log('RivePlugin Scene started');
//   }

//   sceneReady() {
//     console.log('RivePlugin Scene ready');
//   }

//   scenePreUpdate() {
//     // Preparazioni preliminari per il rendering

//   }

//   sceneUpdate(time, delta) {


    

//   }

//   scenePostUpdate() {
//     // Eventuali operazioni da fare dopo il rendering
//     // this.Rive.resolveAnimationFrame()
//     this.renderer.flush();
//     this.Rive.requestAnimationFrame(this.sceneUpdate);
//   }

//   scenePrerender() {
//     // console.log('RivePlugin Scene Prerender');
//     this.renderer.clear();

//   }


//   sceneRender(time,delta) {
//     console.log('RivePlugin Scene Render');
//     const elapsedTimeSec = delta / 1000; // Converti ms in secondi

//     this.riveInstances.forEach(instance => {
//       if (instance.artboard) {
//         if (instance.animation) {
//           instance.animation.advance(elapsedTimeSec);
//           instance.animation.apply(1);
//         }
//         instance.stateMachine.advance(elapsedTimeSec);
//         instance.artboard.advance(elapsedTimeSec);
//         this.renderer.save();
//         instance.artboard.draw(this.renderer);
//         this.renderer.restore();
//       }
//       // this.renderer.align(
//       //   this.Rive.Fit.contain,
//       //   this.Rive.Alignment.center,
//       //   { minX: 0, minY: 0, maxX: this.scene.sys.game.canvas.width, maxY: this.scene.sys.game.canvas.height },
//       //   instance.artboard.bounds
//       // );



//     });
//   }
//   scenePostrender(){
//     console.log('RivePlugin Scene Render');

//   }
//   sceneResize() {
//     console.log('RivePlugin Scene resize');
//   }

//   scenePause() {
//     console.log('RivePlugin Scene pause');
//   }

//   sceneResume() {
//     console.log('RivePlugin Scene resume');
//   }

//   sceneSleep() {
//     console.log('RivePlugin Scene sleep');
//   }

//   sceneWake() {
//     console.log('RivePlugin Scene wake');
//   }

//   sceneTransitionInit() {
//     console.log('RivePlugin Scene transitioninit');
//   }

//   sceneTransitionStart() {
//     console.log('RivePlugin Scene transitionstart');
//   }

//   sceneTransitionComplete() {
//     console.log('RivePlugin Scene transitioncomplete');
//   }

//   sceneTransitionOut() {
//     console.log('RivePlugin Scene transitionout');
//   }

//   sceneShutdown() {
//     console.log('RivePlugin Scene shutdown');
//     this.riveInstances.forEach(instance => {
//       instance.animation.delete();
//       instance.artboard.delete();
//     });
//     this.riveInstances = [];
//   }

//   sceneDestroy() {
//     console.log('RivePlugin Scene destroyed');
//     if (this.renderer) {
//       this.renderer.delete();
//       this.renderer = null;
//     }
//   }

//   loadRive(key, url, callback) {
//     // Load the binary file using Phaser loader
//     this.scene.load.binary({
//       key: key,
//       url: url,
//       dataType: Uint8Array
//     });
//     this.scene.load.once('complete', () => {
//       // File uploaded, get binary buffer
//       const buffer = this.scene.cache.binary.get(key);
//       // Continue as before
//       this.processRiveFile(buffer, callback);
//     });
//   }

//   processRiveFile(buffer, callback) {
//     this.Rive.load(buffer).then(file => {
//       if (!file) {
//         console.error('Failed to load the Rive file.');
//         return;
//       }

//       const artboard = file.defaultArtboard();// || file.artboardByName('New Artboard');
//       if (!artboard) {
//         console.error('Artboard not found in the Rive file.');
//         return;
//       }

//       const animation = new this.Rive.LinearAnimationInstance(
//         artboard.animationByIndex(0),//animationByName('lanterne'),//altro
//         artboard
//       );

//       if (!animation) {
//         console.error('Animation not found on the artboard.');
//         return;
//       }

//       let stateMachine = null;
//       if (artboard.stateMachineByName('State Machine 1')) {
//         stateMachine = new this.Rive.StateMachineInstance(
//           artboard.stateMachineByName('State Machine 1'),
//           artboard
//         );
//       }

//       this.riveInstances.push({ file, artboard, animation, stateMachine });
//       console.log('Rive file and instances loaded successfully.');

//       if (callback) callback(true, file, artboard, animation, stateMachine);
//     }).catch(error => {
//       console.error('Error while loading the Rive file:', error);
//       if (callback) callback(false);
//     });
//   }

//   playAnimation(instanceIndex, animationName) {
//     // Implement animation playback logic here
//   }

//   getCanvas(instanceIndex) {
//     console.log('Getting canvas for instance index:', instanceIndex);
//     return this.scene.sys.game.canvas;
//   }
// }

// export default RivePlugin;
