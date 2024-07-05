import Phaser from "phaser";
import _ from "lodash";
import { RiveObjectFactory } from "./RiveObjectFactory";

interface RivFileConfig {
  type: "rive";
  key: string;
  url: string;
  extension: "riv";
}

class RivFile extends Phaser.Loader.FileTypes.BinaryFile {
  onProcess(): void {
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


function riveLoaderCallback(this: Phaser.Loader.LoaderPlugin, key: string, url: string): Phaser.Loader.LoaderPlugin {
  const fileConfig: RivFileConfig = {
    type: "rive",
    key,
    url,
    extension: "riv",
  };
  this.addFile(new RivFile(this, fileConfig));
  return this;
}

class RivePackFile extends Phaser.Loader.File {
  constructor(loader: Phaser.Loader.LoaderPlugin, fileConfig: Phaser.Types.Loader.FileConfig) {
    super(loader, fileConfig);
    this.type = "rivePackFile";
  }

  onProcess() {
    if (this.state !== Phaser.Loader.FILE_POPULATED) {
      this.state = Phaser.Loader.FILE_PROCESSING;
      if (this.xhrLoader) {
        this.data = JSON.parse(this.xhrLoader.responseText);
      } else {
        console.error("Failed to create canvas texture.");
      }
    }
    this.processPackFile();
    this.onProcessComplete();
  }

  private processPackFile() {
    _.forEach(this.data, value => {
      const files = value.files;
      if (!files || !_.isArray(files)) {
        return;
      }
      files.forEach(file => {
        const absoluteUrl = (new URL(file.url, document.location.toString())).toString();
        const key = file.key;
        this.loader.rive(key, absoluteUrl);
      });
    });
  }
}

function rivePackloaderCallback(this: Phaser.Loader.LoaderPlugin, key: string, url: string): Phaser.Loader.LoaderPlugin {
  const config = { key, url };
  const fileConfig = {
    type: "rivePackFile",
    key,
    url,
    extension: "json",
    config,
    cache: this.cacheManager.json
  };
  this.addFile(new RivePackFile(this, fileConfig));
  return this;
}

export class RiveLoaderPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
    pluginManager.registerFileType("rivePack", rivePackloaderCallback);
    pluginManager.registerFileType("rive", riveLoaderCallback);
  }
}

declare module "phaser" {
  namespace Loader {
    interface LoaderPlugin {
      rivePack(key?: string, url?: string): this;
      rive(key: string, url?: string): this;
    }
  }
}
