import GameScene from './GameScene';
// import { RiveLoaderPlugin } from "./RiveLoader";
import RivePlugin from "./PLUGINPHASER/back/RivePlugin";

export const GameSceneConfig = {
  type: Phaser.WEBGL,
  width: 1280,
  height: 720,
  title: 'Bull Gaming',
  autoRound: true,
  disableContextMenu: true,
  transparent: true,
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
    scene:[
      {key: 'RivePlugin', plugin: RivePlugin, mapping: 'rive' }

    ],
    // global: [
    //   { key: 'RiveLoaderPlugin', plugin: RiveLoaderPlugin, mapping: 'rive' }
    // ]
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true // Abilita il debug della fisica
    }
  },
  scene: [GameScene]
};
