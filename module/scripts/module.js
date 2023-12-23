////////////////////////////////////////////////////////////////////////////////
//                 _____ _              _______                               //
//                 |_   _| |            |__   __|                             //
//                   | | | |_ ___ _ __ ___ | | __ _  __ _ ___                 //
//                   | | | __/ _ \ '_ ` _ \| |/ _` |/ _` / __|                //
//                  _| |_| ||  __/ | | | | | | (_| | (_| \__ \                //
//                 |_____|\__\___|_| |_| |_|_|\__,_|\__, |___/ LIBRARY        //
//                                                   __/ |       By ZotyDev   //
////////////////////////////////////////////////////|___////////////////////////
// ? Main class of the library. ItemTags provides users with a easy way to tag
// ? documents, which makes possible to macro/module developers to make generic
// ? code that can select the outcomes based on the tags. This way you don't
// ? need to rely on auto recognition based on names.
import { DocumentTagsWindow } from "./documentTagsWindow.js";
import { TagHandler } from "./tagHandler.js";

Hooks.on('init', () => {
    console.log("%cItemTags", `
        color:#FF0088;
        background-color:white;
        font-size:25pt;
        font-weight:bold;
        padding:15pt;
    `);

    Hooks.on('ready', () => {
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
        }

        console.log("Item Tags is ready!!");
    });

});
