
import RivePlugin from './PLUGINPHASER/RivePlugin';
import GameScene from './GameScene'
// console.log("valori scene"+ scenes);

export const GameSceneConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  title: 'Bull Gaming',
  autoRound: true,
  disableContextMenu: true,
  transparent: true,
  parent: "phaser-game", // Assicurati di avere un div con questo ID nel tuo HTML
  fps: {
    min: 10,
    target: 60,
    limit: 0,
    forceSetTimeOut: false,
    deltaHistory: 10,
    panicMax: 120,
    smoothStep: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    scene: [
      { key: 'RivePlugin', plugin: RivePlugin, mapping: 'rive' }
      // ...
    ]
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [GameScene]
};
