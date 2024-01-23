////////////////////////////////////////////////////////////////////////////////
//                  _____ _              _______                              //
//                 |_   _| |            |__   __|                             //
//                   | | | |_ ___ _ __ ___ | | __ _  __ _ ___                 //
//                   | | | __/ _ \ '_ ` _ \| |/ _` |/ _` / __|                //
//                  _| |_| ||  __/ | | | | | | (_| | (_| \__ \                //
//                 |_____|\__\___|_| |_| |_|_|\__,_|\__, |___/ LIBRARY        //
//                                                   __/ |       By ZotyDev   //
////////////////////////////////////////////////////|___////////////////////////
// ? ItemTags provides users with a easy way to tag documents, which makes
// ? possible to macro/module developers to make generic code that can select
// ? the outcomes based on the tags. This way you don't need to rely on auto
// ? recognition based on names.
import { TagHandler } from "./tagHandler.js";
import { Constants as C } from "./constants.js";

import { ItemTags } from "./itemTags.js";
import { ItemTagsLayer } from "./itemTagsLayer.js";

////////////////////////////////////////////////////////////////////////////////
// Entry-point for everything
////////////////////////////////////////////////////////////////////////////////
Hooks.once('init', () => {
    Hooks.once('toolbox.ready', async () => {
        // Register the module for showcase
        Toolbox.showcaseModule(C.NAME_FLAT);

        ItemTags.initialize();

        // Setup the API and methods
        window['ItemTags'] = {
            // Deprecated naming
            Get: TagHandler.getTags,
            Check: TagHandler.checkTags,
            CheckString: TagHandler.checkTagsString,
            Set: TagHandler.setTags,
            Add: TagHandler.addTags,
            Remove: TagHandler.removeTags,
            Clear: TagHandler.deleteTags,
            SearchAll: TagHandler.searchAll,
            SearchActor: TagHandler.searchActor,
            DeleteAll: TagHandler.deleteTags,
            Missing: TagHandler.checkTagsMissing,

            // New naming
            get: TagHandler.getTags,
            check: TagHandler.checkTags,
            checkString: TagHandler.checkTagsString,
            set: TagHandler.setTags,
            add: TagHandler.addTags,
            remove: TagHandler.removeTags,
            clear: TagHandler.deleteTags,
            searchAll: TagHandler.searchAll,
            searchActor: TagHandler.searchActor,
            deleteAll: TagHandler.deleteTags,
            missing: TagHandler.checkTagsMissing,


            GlobalTags: GlobalTags,
        }

        // Informs that ItemTags is ready to be used
        Hooks.call('item-tags.ready');

        // Debug
        C.D.info('Ready!!');
    });

    // Debug info
    Hooks.once('debugger.ready', () => {
        C.D = new Debugger(C.ID, C.NAME, true, true);
        C.D.info('Module Information:');
        C.D.info(`Version ${game.modules.get(C.ID).version}`);
        C.D.info('Library By ZotyDev');
    });

    // Setup the layer where the interface will be
    CONFIG.Canvas.layers['itemTags'] = {
        group: 'interface',
        layerClass: ItemTagsLayer,
    }
});

