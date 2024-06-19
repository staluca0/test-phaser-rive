// import * as RiveCanvas from "@rive-app/canvas";
// import * as RiveWebGL from "@rive-app/webgl";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        console.log('GameScene constructor');

    }


    init(data) {

    }

    preload() {



        this.load.atlas('walker', 'res/walker.png', 'res/walker.json');
        this.load.image('sky', 'res/ms3-sky.png');
        this.load.image('trees', 'res/ms3-trees.png');
        // this.load.binary('riveFile', 'res/Nuova_grafica/DragonMod/Rive/untitled.riv');
        // this.load.riv('untitled', 'res/Nuova_grafica/DragonMod/Rive/untitled.riv');

        // this.load.rive('myRiveFile', 'res/Nuova_grafica/DragonMod/Rive/untitled.riv');


    }

    create(data) {

        if (this.game.renderer.type === Phaser.WEBGL) {
            console.log('The game is using WebGL');
        } else if (this.game.renderer.type === Phaser.CANVAS) {
            console.log('The game is using Canvas');
        }
        
        this.add.text(0,0,'hello');

        this.bg = this.add.tileSprite(0, 38, 800, 296, 'sky').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 280, 800, 320, 'trees').setOrigin(0, 0);

        const animConfig = {
            key: 'walk',
            frames: 'walker',
            frameRate: 60,
            repeat: -1
        };

        this.anims.create(animConfig);

        const sprite = this.add.sprite(400, 484, 'walker', 'frame_0000');

        sprite.play('walk');
        // const rive = require("@rive-app/canvas");
        const riveData = this.cache.binary.get('riveFile');

        // if (riveData) {
        //     try {
        //         let riveCanvas = document.createElement('canvas');
        //         riveCanvas.width = 800; // Set your desired dimensions
        //         riveCanvas.height = 600;
        //         riveCanvas.x =-600;
        //         riveCanvas.y = -800;
        //         document.body.appendChild(riveCanvas); // For testing, add it to the body
                
        //         this.riveAnimation = new Rive({
        //             buffer: riveData,
        //             canvas: riveCanvas,
        //             autoplay: true
        //         });
                
        //     } catch (error) {
        //         console.error('Error initializing Rive:', error);
        //     }
        // } else {
        //     console.error('Rive data not found in cache.');
        // }

        // const riveCanvas = document.getElementById("riveCanvas");
        // if (riveData) {
        //     try {

        //       this.riveAnimation = new RiveCanvas.Rive({
        //         buffer: riveData,
        //         canvas: riveCanvas,
        //         autoplay: true,
        //         onload: () => console.log('Rive caricato correttamente'),
        //         onerror: (error) => console.error('Errore nel caricamento di Rive:', error)
        //       });
        //     } catch (error) {
        //       console.error('Errore nell\'inizializzazione di Rive:', error);
        //     }
        //   } else {
        //     console.error('Dati Rive non trovati nel cache.');
        //   }

        // this.rive.loadRive('res/Nuova_grafica/DragonMod/Rive/untitled.riv', (riveInstance, riveCanvas) => {
        //     console.log('Rive file loaded');
        //     console.log('Rive Instance:', riveInstance);
        
        //     // Configura correttamente il canvas di Rive
        //     riveCanvas.width = this.sys.game.config.width;
        //     riveCanvas.height = this.sys.game.config.height;
        
        //     // Crea una texture Phaser a partire dal canvas di Rive
        //     this.textures.addCanvas('riveTexture', riveCanvas);
        
        //     // Aggiungi un'immagine Phaser che utilizza la texture creata
        //     this.riveImage = this.add.image(400, 300, 'riveTexture');
        //     this.riveImage.setOrigin(0.5, 0.5).setDepth(900000);
        
        //     // Avvia l'animazione (se autoplay non è abilitato)
        //     // this.rive.playAnimation(0, 'your_animation_name'); // Utilizza l'indice corretto e il nome dell'animazione
        //   });

    }

   


    update(time, delta) {
        this.bg.tilePositionX -= 2;
        this.trees.tilePositionX -= 6;
    }
  

}
