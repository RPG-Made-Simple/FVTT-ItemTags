////////////////////////////////////////////////////////////////////////////////
//                 _____ _              _______                               //
//                 |_   _| |            |__   __|                             //
//                   | | | |_ ___ _ __ ___ | | __ _  __ _ ___                 //
//                   | | | __/ _ \ '_ ` _ \| |/ _` |/ _` / __|                //
//                  _| |_| ||  __/ | | | | | | (_| | (_| \__ \                //
//                 |_____|\__\___|_| |_| |_|_|\__,_|\__, |___/ LIBRARY        //
//                                                   __/ |       By ZotyDev   //
////////////////////////////////////////////////////|___////////////////////////
// ? This class provides the interactions with the tags.
import { Constants as C } from "./constants.js";

export class TagHandler {
    ////////////////////////////////////////////////////////////////////////////
    // Checks to see if the document has tags
    ////////////////////////////////////////////////////////////////////////////
    static _Check(document) {
        let tags = document.getFlag(C.ID, C.FLAGS.TAGS);
        if (tags == null || tags == undefined)
        {
            // Document has no tags
            return { valid: false, tags: tags };
        }
        else
        {
            // Document has tags
            return { valid: true, tags: tags };
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Validates the tags and return only valid tags
    ////////////////////////////////////////////////////////////////////////////
    static _Validate(tags) {
        // Check if the data is valid
        if (tags != null && tags != undefined) {
            // Check if the tags are contained inside a array
            if (Array.isArray(tags))
            {
                // Check if the array is not empty
                if (tags.length != 0)
                {
                    // Convert all tags to strings
                    let convertedTags = [];
                    tags.forEach(element => {
                        convertedTags.push(String(element));
                    });

                    return convertedTags;
                } else {
                    return [];
                }
            } else {
                return [];
            }
        } else {
            return [];
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Migrate tags from OIF
    // TODO: remove at a future version
    ////////////////////////////////////////////////////////////////////////////
    static _Migrate(document) {
        let tags = document.getFlag('objects-interactions-fx', 'item-tags');
        if (tags != null && tags != undefined) {
            TagHandler.SetTags(document, tags);
            document.unsetFlag('objects-interactions-fx', 'item-tags');
            return tags;
        } else {
            return [];
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Return the tags of a document
    ////////////////////////////////////////////////////////////////////////////
    static GetTags(document) {
        let check = TagHandler._Check(document);
        if (check.valid) {
            return check.tags;
        }
        else {
            // Try migration
            return TagHandler._Migrate(document);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Set the tags of a document
    ////////////////////////////////////////////////////////////////////////////
    static SetTags(document, tags) {
        // Validate the tags
        tags = TagHandler._Validate(tags);

        // Check to see if the new tags are empty
        if (tags.length == 0) {
            // Delete all the tags
            TagHandler.DeleteTags(document);
        }
        else {
            // Set the new tags
            document.setFlag(C.ID, C.FLAGS.TAGS, tags);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Add tags to the document
    ////////////////////////////////////////////////////////////////////////////
    static AddTags(document, tags) {
        // Validate the tags
        tags = TagHandler._Validate(tags);

        // Check if the new tags are not empty
        if (tags.length != 0)
        {
            // Get the current tags
            let currentTags = TagHandler.GetTags(document);
            // Append to the current tags
            let newTags = [...currentTags, ...tags];
            // Remove duplicates
            newTags = [...new Set(newTags)];
            // Set the new array
            TagHandler.SetTags(document, newTags);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Remove tags from the document
    ////////////////////////////////////////////////////////////////////////////
    static RemoveTags(document, tags) {
        // Validate the tags
        tags = TagHandler._Validate(tags);

        if (tags.length != 0)
        {
            // Get the current tags
            let currentTags = TagHandler.GetTags(document);
            // Filter the current tags removing the ones passed
            let newTags = currentTags.filter(element => !tags.includes(element));
            // Set the new array
            TagHandler.SetTags(document, newTags);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Checks if the passed tags are set
    ////////////////////////////////////////////////////////////////////////////
    static CheckTags(document, tags) {
        // Validate the tags
        tags = TagHandler._Validate(tags);

        if (tags.length != 0)
        {
            // Get the current tags
            let currentTags = TagHandler.GetTags(document);
            // Iterates checking if each of the passed tags are set, if atleast
            // one is not set, then returns false
            let check = true;
            tags.forEach(element => {
                // Check if the current tags include this tag
                if (!currentTags.includes(element)) {
                    check = false;
                }
            });
            return check;
        } else {
            // If the passed tags are not valid they are not set
            return false;
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Delete the tags of a document
    ////////////////////////////////////////////////////////////////////////////
    static DeleteTags(document) {
        document.unsetFlag(C.ID, C.FLAGS.TAGS);
    }
}
