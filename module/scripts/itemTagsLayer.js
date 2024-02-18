////////////////////////////////////////////////////////////////////////////////
//                  _____ _              _______                              //
//                 |_   _| |            |__   __|                             //
//                   | | | |_ ___ _ __ ___ | | __ _  __ _ ___                 //
//                   | | | __/ _ \ '_ ` _ \| |/ _` |/ _` / __|                //
//                  _| |_| ||  __/ | | | | | | (_| | (_| \__ \                //
//                 |_____|\__\___|_| |_| |_|_|\__,_|\__, |___/ LIBRARY        //
//                                                   __/ |       By ZotyDev   //
////////////////////////////////////////////////////|___////////////////////////
// ? Class that defines the layer for interaction.
import { Constants as C } from "./constants.js";

export class ItemTagsLayer extends InteractionLayer {
  constructor() {
    super();

    if (game.release.generation == 10) {
      // Debug
      C.D.info('Detected FoundryVTT 10, making compatibility changes...');

      this.loader = new PIXI.loader();
    }

    this.mouseInteractionManager = undefined;
    this._interactiveChildren = false;
    this._dragging = false;
    this.options = this.constructor.layerOptions;
  }

  async _draw(options) {}
}
