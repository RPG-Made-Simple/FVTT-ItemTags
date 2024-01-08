////////////////////////////////////////////////////////////////////////////////
//                 _____ _              _______                               //
//                 |_   _| |            |__   __|                             //
//                   | | | |_ ___ _ __ ___ | | __ _  __ _ ___                 //
//                   | | | __/ _ \ '_ ` _ \| |/ _` |/ _` / __|                //
//                  _| |_| ||  __/ | | | | | | (_| | (_| \__ \                //
//                 |_____|\__\___|_| |_| |_|_|\__,_|\__, |___/ LIBRARY        //
//                                                   __/ |       By ZotyDev   //
////////////////////////////////////////////////////|___////////////////////////
// ? This class is handles all the UI for interacting with the global tags
// ? defined by world.
import { Constants as C } from "./constants.js";
import { GlobalTags } from "./globalTags.js";

export class GlobalTagsWindow extends FormApplication {
    static get defaultOptions() {
        const defaults = super.defaultOptions;

        const overrides = {
            closeOnSubmit: false,
            height: 'auto',
            id: 'global-tags',
            submitOnChange: true,
            template: `modules/${C.ID}/module/templates/globalTagsWindow.hbs`,
            title: game.i18n.localize('itemTags.window.globalTags'),
            document: '',
        }

        const mergedOptions = foundry.utils.mergeObject(defaults, overrides);

        return mergedOptions;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Activate the listeners
    ////////////////////////////////////////////////////////////////////////////
    activateListeners(html) {
        super.activateListeners(html);
    }

    ////////////////////////////////////////////////////////////////////////////
    // Returns the data that will populate the window
    ////////////////////////////////////////////////////////////////////////////
    getData(options) {
        return {
            ...GlobalTags.data,
        }
    }

    async _updateObject(event, formData) {
    }
}
