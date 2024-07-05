import Phaser from 'phaser';
import { GameSceneConfig } from './config';
// import registerRiveFactory from './registerRiveObjectFactory';
// registerRiveFactory();

window.StoSvillupando = true;

let style = document.createElement('style');
style.innerHTML = `
    body {
        overflow: hidden;
    }
    #riveCanvas {
        top: 0;
        left: 0;
        pointer-events: none; 
        z-index: 1; 
    }
    #phaser-game {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0; 
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    let GameOnline = new Phaser.Game(GameSceneConfig);
});
