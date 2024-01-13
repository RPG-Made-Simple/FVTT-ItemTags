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
import { DocumentTagsWindow } from "./documentTagsWindow.js";
import { GlobalTagsWindow } from "./globalTagsWindow.js";
import { TagHandler } from "./tagHandler.js";
import { Constants as C } from "./constants.js";
import { GlobalTags } from "./globalTags.js";

////////////////////////////////////////////////////////////////////////////////
// Entry-point for everything
////////////////////////////////////////////////////////////////////////////////
Hooks.once('init', () => {
    Hooks.once('toolbox.ready', async () => {
        Toolbox.showcaseModule(C.NAME_FLAT);
    });

    Hooks.on('getSceneControlButtons', (controls) => {
        if (!canvas.scene) return;

        const GlobalTagsButton = {
            name: 'global-tags',
            title: game.i18n.localize('itemTags.tooltips.globalTags'),
            icon: 'fas fa-tags',
            onClick: async () => {
                new GlobalTagsWindow().render(true, {
                    width: 480
                });
            },
            button: true
        }

        controls.push({
            name: C.ID,
            title: C.NAME,
            layer: 'controls',
            icon: 'fas fa-tags',
            visible: game.user.isGM,
            tools: [
                GlobalTagsButton,
            ]
        });
    })

    Hooks.on('ready', async () => {
        // Create the folders that are going to be used
        Toolbox
        if (game.user.isGM)
        {
            // Create the root folder if it doesn't exist
            let Folders = await FilePicker.browse(C.FILES.ORIGIN, '.');
            if (!Folders.dirs.includes(C.FILES.DATA_FOLDERS.ROOT))
            {
                console.warn("Root folder doesn't exist, creating it...");
                await FilePicker.createDirectory(C.FILES.ORIGIN, C.FILES.DATA_FOLDERS.ROOT);
            }

            // Create the cache folder if it doesn't exist
            Folders = await FilePicker.browse(C.FILES.ORIGIN, C.FILES.DATA_FOLDERS.ROOT);
            if (!Folders.dirs.includes(C.FILES.DATA_FOLDERS.CACHE))
            {
                console.warn("Cache folder doesn't exist, creating it...");
                await FilePicker.createDirectory(C.FILES.ORIGIN, C.FILES.DATA_FOLDERS.CACHE);
            }
        }

        // Load current world data
        // TODO replicate the data to the clients
        if (game.user.isGM) {
            GlobalTags._LoadData();
        }

        // Only GMs should see the Tags
        if (game.user.isGM) {
            // Attach the 'Item Tags' button to the item sheets
            Hooks.on("getItemSheetHeaderButtons", (sheet, buttonArray) => {
                // Defines the button
                let tagButton = {
                    label: game.i18n.localize('itemTags.window.itemTags'),
                    class: 'item-tags',
                    icon: 'fas fa-tags',
                    onclick: () => {
                        new DocumentTagsWindow().render(true, {
                            document: sheet.object,
                            // We need a copy of the tags to be used as temporary storage
                            // for changes, that way the user can decide if they want to
                            // save or discard the changes
                            tags: TagHandler.GetTags(sheet.object).slice(),
                            width: 480
                        })
                    }
                }

                // Add the button to the button array
                buttonArray.unshift(tagButton);
            });

            // Attach the 'Item Tags' button to the actor sheet
            Hooks.on("getActorSheetHeaderButtons", (sheet, buttonArray) => {
                // Defines the button
                let tagButton = {
                    label: game.i18n.localize('itemTags.window.itemTags'),
                    class: 'item-tags',
                    icon: 'fas fa-tags',
                    onclick: () => {
                        new DocumentTagsWindow().render(true, {
                            document: sheet.object,
                            // We need a copy of the tags to be used as temporary storage
                            // for changes, that way the user can decide if they want to
                            // save or discard the changes
                            tags: TagHandler.GetTags(sheet.object).slice(),
                            width: 480,
                        })
                    }
                }

                // Add the button to the button array
                buttonArray.unshift(tagButton);
            })
        }

        // Setup the API
        window['ItemTags'] = {
            Get: TagHandler.GetTags,
            Check: TagHandler.CheckTags,
            CheckString: TagHandler.CheckTagsString,
            Set: TagHandler.SetTags,
            Add: TagHandler.AddTags,
            Remove: TagHandler.RemoveTags,
            Clear: TagHandler.DeleteTags,
            Search: TagHandler.Search,
            SearchAll: TagHandler.SearchAll,
            SearchActor: TagHandler.SearchActor,
            DeleteAll: TagHandler.DeleteTags,
            Missing: TagHandler.CheckTagsMissing,

            GlobalTags: GlobalTags,
        }

        Hooks.call('item-tags.ready');
        C.D.info('Ready!!');
    });

    // Debug info
    Hooks.once('debugger.ready', () => {
        C.D = new Debugger(C.ID, C.NAME, true, true);
        C.D.info('Module Information:');
        C.D.info(`Version ${game.modules.get(C.ID).version}`);
        C.D.info('Library By ZotyDev');
    });
});
