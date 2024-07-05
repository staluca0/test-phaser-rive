// import RiveWebGL, { File } from '@rive-app/webgl-advanced-single';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        console.log('GameScene constructor');

    }


    preload() {
        this.load.atlas('walker', 'res/walker.png', 'res/walker.json');
        this.load.image('sky', 'res/ms3-sky.png');
        this.load.image('trees', 'res/ms3-trees.png');

        this.load.rive('riveFile', 'res/untitled.riv');
        // this.load.rive('riveFile2', 'res/Corsairs_Tale.riv');

    }

// GameScene.js
create(data) {
    // if (this.cache.binary.exists('riveFile')) {
    //     const buffer = this.cache.binary.get('riveFile');
    //     // console.log('File Rive caricato dalla cache:', buffer);
    //     const riveObject = this.add.rive('riveFile', 400, 300, 'Artboard', 'State Machine 1');
    //     // riveObject.play('lanterne'); 
    //     console.log('RiveObject aggiunto alla scena:', riveObject);
    // } else {
    //     console.log('File Rive non trovato nella cache.');
    // }

    // if (this.cache.binary.exists('riveFile2')) {
    //     const buffer = this.cache.binary.get('riveFile2');
    //     // console.log('File Rive 2 caricato dalla cache:', buffer);
    //     this.add.rive('riveFile2', 400, 300, 'Artboard', 'State Machine 1');
    // } else {
    //     console.error('File Rive 2 non trovato nella cache.');
    // }
}



    update(time, delta) {
        // Update Rive animations through the plugin
        // if (this.rive) {
        //     this.rive.sceneUpdate(time, delta);
        // }
        // this.bg.tilePositionX -= 2;
        // this.trees.tilePositionX -= 6;
    }

}
