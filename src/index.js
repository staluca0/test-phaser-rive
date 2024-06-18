import Phaser from 'phaser';
import { GameSceneConfig } from './config';

window.StoSvillupando = true;

// Stile per nascondere lo scroll e impostare il colore di sfondo
let style = document.createElement('style');
style.innerHTML = `
    body {
        overflow: hidden;
        background-color: #000000;
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
