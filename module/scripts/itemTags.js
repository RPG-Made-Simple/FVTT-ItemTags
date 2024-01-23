////////////////////////////////////////////////////////////////////////////////
//                  _____ _              _______                              //
//                 |_   _| |            |__   __|                             //
//                   | | | |_ ___ _ __ ___ | | __ _  __ _ ___                 //
//                   | | | __/ _ \ '_ ` _ \| |/ _` |/ _` / __|                //
//                  _| |_| ||  __/ | | | | | | (_| | (_| \__ \                //
//                 |_____|\__\___|_| |_| |_|_|\__,_|\__, |___/ LIBRARY        //
//                                                   __/ |       By ZotyDev   //
////////////////////////////////////////////////////|___////////////////////////
// ? Main class of the library
import { Constants as C } from "./constants.js";
import { DocumentTagsWindow } from "./documentTagsWindow.js";
import { TagHandler } from "./tagHandler.js";

export class ItemTags {
    ////////////////////////////////////////////////////////////////////////////
    // Initialize the module
    ////////////////////////////////////////////////////////////////////////////
    static initialize() {
        // Debug
        C.D.info('ItemTags.initialize()');

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
                            tags: TagHandler.getTags(sheet.object).slice(),
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
                            tags: TagHandler.getTags(sheet.object).slice(),
                            width: 480,
                        })
                    }
                }

                // Add the button to the button array
                buttonArray.unshift(tagButton);
            })
        }
    }
}
