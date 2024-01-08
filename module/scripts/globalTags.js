////////////////////////////////////////////////////////////////////////////////
//                 _____ _              _______                               //
//                 |_   _| |            |__   __|                             //
//                   | | | |_ ___ _ __ ___ | | __ _  __ _ ___                 //
//                   | | | __/ _ \ '_ ` _ \| |/ _` |/ _` / __|                //
//                  _| |_| ||  __/ | | | | | | (_| | (_| \__ \                //
//                 |_____|\__\___|_| |_| |_|_|\__,_|\__, |___/ LIBRARY        //
//                                                   __/ |       By ZotyDev   //
////////////////////////////////////////////////////|___////////////////////////
// ? This class handles everything related to Global Tags, data that is stored
// ? on worlds and interacts with Tags.

import { TagHandler } from "./tagHandler.js";
import { Constants as C } from "./constants.js";

export class GlobalTags {
    static data = {
        tags: {}
    }

    ////////////////////////////////////////////////////////////////////////////
    // Should be called when Tags are edited
    ////////////////////////////////////////////////////////////////////////////
    static _OnEdit(document, tags) {
        // Adds the tags and document to a custom map that points to references
        tags.forEach(tag => {
            // Add the tag if it does not exist yet
            if (GlobalTags.data.tags[tag] == undefined || GlobalTags.data.tags[tag] == null) {
                GlobalTags.data.tags[tag] = {
                    references: new Set(),
                }
            }

            // Add the document to the references
            GlobalTags.data.tags[tag].references.add(document.uuid);
        });

        // Remove the tags that are now missing
        let missingTags = TagHandler.CheckTagsMissing(document, tags);
        missingTags.forEach(tag => {
            // Prevent errors on a edge case where the cache does not exist for
            // the world yet
            if (GlobalTags.data.tags[tag] != undefined || GlobalTags.data.tags[tag] != null) {
                // Remove the reference
                GlobalTags.data.tags[tag].references.delete(document.uuid);
                // Remove the tag if references get to 0
                if (GlobalTags.data.tags[tag].references.size == 0) {
                    delete GlobalTags.data.tags[tag];
                }
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////
    // Saves the data on the server
    ////////////////////////////////////////////////////////////////////////////
    static async _SaveData() {
        // Convert into proper object
        let data = structuredClone(GlobalTags.data);
        Object.entries(data.tags).forEach(entry => {
            data.tags[entry[0]].references = Array.from(entry[1].references);
        });

        const newFile = new File([JSON.stringify(data)], `${game.world.id}.json`, { type: 'application/json' });
        await FilePicker.upload(C.FILES.ORIGIN, C.FILES.DATA_FOLDERS.CACHE, newFile);
    }

    ////////////////////////////////////////////////////////////////////////////
    // Loads the data from the server
    ////////////////////////////////////////////////////////////////////////////
    static async _LoadData() {
        // Check if there is a cache
        let folders = await FilePicker.browse(C.FILES.ORIGIN, C.FILES.DATA_FOLDERS.CACHE);
        if (!folders.files.includes(`${C.FILES.DATA_FOLDERS.CACHE}/${game.world.id}.json`)) {
            // Create it
            console.warn("Item Tags cache not found for this world, creating it...");
            GlobalTags.CacheRedo();
            GlobalTags._SaveData();
        } else {
            // Load it
            let data = await foundry.utils.fetchJsonWithTimeout(`${C.FILES.DATA_FOLDERS.CACHE}/${game.world.id}.json`);

            // Convert into usable data again
            Object.entries(data.tags).forEach(entry => {
                data.tags[entry[0]].references = new Set(entry[1].references);
            });

            GlobalTags.data = data;
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Recalculate the cache
    ////////////////////////////////////////////////////////////////////////////
    static CacheRedo() {
        // Return all documents that have atleast one tag set
        let allTagOwners = TagHandler.SearchAll()

        // Iterate the categories
        Object.values(allTagOwners).forEach(category => {
            // Iterate the containers
            Object.values(category).forEach(container => {
                // Iterate the tag owners
                Object.values(container).forEach(tagOwner => {
                    // Get the tags and send them to cache
                    let tags = TagHandler.GetTags(tagOwner);
                    GlobalTags._OnEdit(tagOwner, tags);
                })
            })
        })
    }
}
