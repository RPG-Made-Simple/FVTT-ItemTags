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
        // Check if OIF is present
        if (game.modules.get('objects-interactions-fx') != undefined) {
            let tags = document.getFlag('objects-interactions-fx', 'item-tags');
            if (tags != null && tags != undefined) {
                TagHandler.SetTags(document, tags);
                document.unsetFlag('objects-interactions-fx', 'item-tags');
                return tags;
            } else {
                return [];
            }
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
    // Checks a document's tags based on the passed tags using a method, the
    // method defaults to 'include'
    ////////////////////////////////////////////////////////////////////////////
    static CheckTags(document, tags, method) {
        // Validate the tags
        tags = TagHandler._Validate(tags);

        if (tags.length != 0)
        {
            // Check the method
            if (method == undefined) {
                method = 'includeAND';
            }

            // Get the current tags
            let currentTags = TagHandler.GetTags(document);
            // Checking method
            if (method == 'includeAND') {
                // Iterates checking if each of the passed tags are set, if
                // atleast one is not set, returns false
                let check = true;
                tags.forEach(element => {
                    // Check if the current tags include this tag
                    if (!currentTags.includes(element)) {
                        check = false;
                        return;
                    }
                });
                return check;
            } else if (method == 'excludeAND') {
                // Iterates checking if each of the passed tags are set, if
                // atleast one is set, returns true
                let check = false;
                tags.forEach(element => {
                    // Check if the current tags include this tag
                    if (!currentTags.includes(element)) {
                        check = true;
                        return;
                    }
                });
                return check;
            } else if (method == 'includeOR') {
                // Iterates checking if each of the passed tags are set, if
                // atleast one is set, returns true
                let check = false;
                tags.forEach(element => {
                    // Check if the current tags include this tag
                    if (currentTags.includes(element)) {
                        check = true;
                        return;
                    }
                });
                return check;
            } else if (method == 'excludeOR') {
                // Iterates checking if each of the passed tags are set, if
                // atleast one is set, returns false
                let check = true;
                tags.forEach(element => {
                    // Check if the current tags does not include this tag
                    if (currentTags.includes(element)) {
                        check = false;
                        return;
                    }
                });
                return check;
            } else {
                console.error('Invalid method');
                return false;
            }
        } else {
            // If the passed tags are not valid they are not set
            return false;
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Checks a document's tags based on the passed string, the method defaults
    // to 'include'
    ////////////////////////////////////////////////////////////////////////////
    static CheckTagsString(document, string, method) {
        // Check the method
        if (method == undefined) {
            method = 'includeAND';
        }

        // Get the current tags
        let currentTags = TagHandler.GetTags(document);
        // Checking method
        if (method == 'includeAND') {
            // Iterates checking if the passed string is included in the tags,
            // if atleast one tag does not contain the string, returns false
            let check = true;
            currentTags.forEach(tag => {
                if (!tag.includes(string)) {
                    check = false;
                    return;
                }
            });
            return check;
        } else if (method == 'excludeAND') {
            // Iterates checking if the passed string is excluded in the tags,
            // if atleast one tag includes the string, returns false
            let check = false;
            currentTags.forEach(tag => {
                // Check if the current tags include this tag
                if (!tag.includes(string)) {
                    check = true;
                    return;
                }
            });
            return check;
        } else if (method == 'includeOR') {
            // Iterates checking if the passed string is included in one or more
            // tags, returns true if atleast one is set
            let check = false;
            currentTags.forEach(tag => {
                // Check if the current tags include this tag
                if (tag.includes(string)) {
                    check = true;
                    return;
                }
            });
            return check;
        } else if (method == 'excludeOR') {
            // Iterates checking if the passed string is excluded in one or more
            // tags, returns false if atleast one is set
            let check = true;
            currentTags.forEach(tag => {
                // Check if the current tags does not include this tag
                if (tag.includes(string)) {
                    check = false;
                    return;
                }
            });
            return check;
        } else {
            console.error("Invalid method");
            return false;
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Delete the tags of a document
    ////////////////////////////////////////////////////////////////////////////
    static DeleteTags(document) {
        document.unsetFlag(C.ID, C.FLAGS.TAGS);
    }

    static _DefaultSearchOptions = {
        method: 'include',
        where: {
            item: {
                compendium: true, // Should search inside compendium
                global: true, // Should search for global items
                actor: true, // Should search inside global actors
                scene: true, // Should search inside current scene actors
                player: true, // Should search inside player actors
            },
            actor: {
                compendium: true, // Should search inside compendium
                global: true, // Should search for global actors
                scene: true, // Should search inside current scene
                player: true, // Should search inside players
            }
        }
    }

    static _NegativeDefautlSearchOptions = {
        where: {
            item: {
                compendium: !TagHandler._DefaultSearchOptions.where.item.compendium,
                global: !TagHandler._DefaultSearchOptions.where.item.global,
                actor: !TagHandler._DefaultSearchOptions.where.item.actor,
                scene: !TagHandler._DefaultSearchOptions.where.item.scene,
                player: !TagHandler._DefaultSearchOptions.where.item.player,
            },
            actor: {
                compendium: !TagHandler._DefaultSearchOptions.where.actor.compendium,
                global: !TagHandler._DefaultSearchOptions.where.actor.global,
                scene: !TagHandler._DefaultSearchOptions.where.actor.scene,
                player: !TagHandler._DefaultSearchOptions.where.actor.player,
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Search all possibilities everywhere to find the tags using the respective
    // filters and options
    ////////////////////////////////////////////////////////////////////////////
    static SearchAll(options) {
        ////////////////////////////////////////////////////////////////////////
        // Validation for the options

        // Check if the options are undefined
        if (options === undefined || options === null) {
            options = TagHandler._DefaultSearchOptions;
        }
        else {
            // Set the 'where' option to default if its undefined
            if (options.where === undefined || options.where === null) {
                options.where = TagHandler._DefaultSearchOptions.where;
            // Set the 'where' option to default if its 'true'
            } else if (options.where == true) {
                options.where = TagHandler._DefaultSearchOptions.where;
            // Set the 'where' option to negative default if its 'false'
            } else if (options.where == false) {
                options.where = TagHandler._NegativeDefautlSearchOptions.where;
            // The 'where' option was set
            } else {
                // Set the 'item' option to default if its undefined
                if (options.where.item === undefined || options.where.item === null) {
                    options.where.item = TagHandler._DefaultSearchOptions.where.item;
                // Set the 'item' option to default if its 'true'
                } else if (options.where.item == true) {
                    options.where.item = TagHandler._DefaultSearchOptions.where.item;
                // Set the 'item' option to negative default if its 'false'
                } else if (options.where.item == false) {
                    options.where.item = TagHandler._NegativeDefautlSearchOptions.where.item;
                // The 'item' option was set
                } else {
                    // Check each option to see if the defaults should be used
                    if (options.where.item.compendium === undefined || options.where.item.compendium === null) {
                        options.where.item.compendium = TagHandler._DefaultSearchOptions.where.item.compendium;
                    }
                    if (options.where.item.global === undefined || options.where.item.global === null) {
                        options.where.item.global = TagHandler._DefaultSearchOptions.where.item.global;
                    }
                    if (options.where.item.actor === undefined || options.where.item.actor === null) {
                        options.where.item.actor = TagHandler._DefaultSearchOptions.where.item.actor;
                    }
                    if (options.where.item.scene === undefined || options.where.item.scene === null) {
                        options.where.item.scene = TagHandler._DefaultSearchOptions.where.item.scene;
                    }
                    if (options.where.item.player === undefined || options.where.item.player === null) {
                        options.where.item.player = TagHandler._DefaultSearchOptions.where.item.player;
                    }
                }

                // Set the 'actor' option to default if its undefined
                if (options.where.actor === undefined || options.where.actor === null) {
                    options.where.actor = TagHandler._DefaultSearchOptions.where.actor;
                // Set the 'actor' option to default if its 'true'
                } else if (options.where.actor == true) {
                    options.where.actor = TagHandler._DefaultSearchOptions.where.actor;
                // Set the 'actor' option to negative default if its 'false'
                } else if (options.where.actor == false) {
                    options.where.actor = TagHandler._NegativeDefautlSearchOptions.where.actor;
                // The 'actor' option was set
                } else {
                    // Check each option to see if the defaults should be used
                    if (options.where.actor.compendium === undefined || options.where.actor.compendium === null) {
                        options.where.actor.compendium = TagHandler._DefaultSearchOptions.where.actor.compendium;
                    }
                    if (options.where.actor.global === undefined || options.where.actor.global === null) {
                        options.where.actor.global = TagHandler._DefaultSearchOptions.where.actor.global;
                    }
                    if (options.where.actor.scene === undefined || options.where.actor.scene === null) {
                        options.where.actor.scene = TagHandler._DefaultSearchOptions.where.actor.scene;
                    }
                    if (options.where.actor.player === undefined || options.where.actor.player === null) {
                        options.where.actor.player = TagHandler._DefaultSearchOptions.where.actor.player;
                    }
                }
            }
            // Set the 'method' option to default if its undefined
            if (options.method === undefined || options.method === null) {
                options.method = TagHandler._DefaultSearchOptions.method;
            }
        }

        // Result that will be returned
        let result = {
            actors: {},
            items: [],
        }

        ////////////////////////////////////////////////////////////////////////
        // Define the actors that will be searched
        // Overlaps are ignored
        let globalActors = [];
        let sceneActors = [];
        let playerActors = [];

        ////////////////////////////////////////////////////////////////////////
        // Get the global actors
        if (options.where.actor.global || options.where.item.actor) {
            globalActors = Array.from(game.actors);
        }

        ////////////////////////////////////////////////////////////////////////
        // Get the scene actors
        if (options.where.actor.scene || options.where.item.scene) {
            // Get the tokens from the current scene
            let currentSceneTokens = Array.from(game.scenes.current.tokens);
            // Get the actors for the current scene
            currentSceneTokens.forEach(element => {
                sceneActors.push(element.actor);
            });
        }

        ////////////////////////////////////////////////////////////////////////
        // Get the player actors
        if (options.where.actor.player || options.where.item.player) {
            game.users.players.forEach(player => {
                let actor = player.character;
                if (actor != undefined) {
                    playerActors.push(actor);
                }
            });
        }

        ////////////////////////////////////////////////////////////////////////
        // Define the items that will be searched
        // Overlaps are ignored
        let compendiumItems = [];
        let globalItems = [];
        let actorItems = [];
        let sceneItems = [];
        let playerItems = [];

        ////////////////////////////////////////////////////////////////////////
        // Get the global items
        if (options.where.item.global) {
            globalItems = Array.from(game.items);
        }

        ////////////////////////////////////////////////////////////////////////
        // Get the actor items
        if (options.where.item.actor) {
            globalActors.forEach(actor => {
                actorItems = [...actorItems, ...Array.from(actor.items)];
            });
        }

        ////////////////////////////////////////////////////////////////////////
        // Get the scene items
        if (options.where.item.scene) {
            sceneActors.forEach(actor => {
                sceneItems = [...sceneItems, ...Array.from(actor.items)];
            });
        }

        ////////////////////////////////////////////////////////////////////////
        // Get the player items
        if (options.where.item.player) {
            playerActors.forEach(actor => {
                playerItems = [...playerItems, ...Array.from(actor.items)];
            });
        }

        ////////////////////////////////////////////////////////////////////////
        // The filtered data will go here
        let finalItems = {
            global: [],
            actor: [],
            scene: [],
            player: [],
        };
        let finalActors = {
            global: [],
            scene: [],
            player: [],
        };
        ////////////////////////////////////////////////////////////////////////
        // Filter using tags
        if (options.tags != null && options.tags != undefined) {
            // Validate the tags
            options.tags = TagHandler._Validate(options.tags);
            if (options.tags.length != 0) {
                ////////////////////////////////////////////////////////////////
                // Actors
                ////////////////////////////////////////////////////////////////
                // Global actors
                if (options.where.actor.global) {
                    globalActors.forEach(actor => {
                        if (TagHandler.CheckTags(actor, options.tags, options.method)) {
                            finalActors.global.push(actor);
                        }
                    });
                }

                ////////////////////////////////////////////////////////////////
                // Scene actors
                if (options.where.actor.scene) {
                    sceneActors.forEach(actor => {
                        if (TagHandler.CheckTags(actor, options.tags, options.method)) {
                            finalActors.scene.push(actor);
                        }
                    });
                }

                ////////////////////////////////////////////////////////////////
                // Player actors
                if (options.where.actor.player) {
                    playerActors.forEach(actor => {
                        if (TagHandler.CheckTags(actor, options.tags, options.method)) {
                            finalActors.player.push(actor);
                        }
                    });
                }

                ////////////////////////////////////////////////////////////////
                // Items
                ////////////////////////////////////////////////////////////////
                // Global items
                if (options.where.item.global) {
                    globalItems.forEach(item => {
                        if (TagHandler.CheckTags(item, options.tags, options.method)) {
                            finalItems.global.push(item);
                        }
                    });
                }

                ////////////////////////////////////////////////////////////////
                // Actor items
                if (options.where.item.actor) {
                    actorItems.forEach(item => {
                        if (TagHandler.CheckTags(item, options.tags, options.method)) {
                            finalItems.actor.push(item);
                        }
                    });
                }

                ////////////////////////////////////////////////////////////////
                // Scene items
                if (options.where.item.scene) {
                    sceneItems.forEach(item => {
                        if (TagHandler.CheckTags(item, options.tags, options.method)) {
                            finalItems.scene.push(item);
                        }
                    });
                }

                ////////////////////////////////////////////////////////////////
                // Player items
                if (options.where.item.player) {
                    playerItems.forEach(item => {
                        if (TagHandler.CheckTags(item, options.tags, options.method)) {
                            finalItems.player.push(item);
                        }
                    });
                }

                result.items = finalItems;
                result.actors = finalActors;
            } else {
                console.warn('No valid tags were passed');
            }
        ////////////////////////////////////////////////////////////////////////
        // Filters using a string
        } else if (options.string != null && options.string != undefined) {
            ////////////////////////////////////////////////////////////////////
            // Actors
            ////////////////////////////////////////////////////////////////////
            // Global actors
            if (options.where.actor.global) {
                globalActors.forEach(actor => {
                    if (TagHandler.CheckTagsString(actor, options.string, options.method)) {
                        finalActors.global.push(actor);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Scene actors
            if (options.where.actor.scene) {
                sceneActors.forEach(actor => {
                    if (TagHandler.CheckTagsString(actor, options.string, options.method)) {
                        finalActors.scene.push(actor);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Player actors
            if (options.where.actor.player) {
                playerActors.forEach(actor => {
                    if (TagHandler.CheckTagsString(actor, options.string, options.method)) {
                        finalActors.player.push(actor);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Items
            ////////////////////////////////////////////////////////////////////
            // Global items
            if (options.where.item.global) {
                globalItems.forEach(item => {
                    if (TagHandler.CheckTagsString(item, options.string, options.method)) {
                        finalItems.global.push(item);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Actor items
            if (options.where.item.actor) {
                actorItems.forEach(item => {
                    if (TagHandler.CheckTagsString(item, options.string, options.method)) {
                        finalItems.actor.push(item);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Scene items
            if (options.where.item.scene) {
                sceneItems.forEach(item => {
                    if (TagHandler.CheckTagsString(item, options.string, options.method)) {
                        finalItems.scene.push(item);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Player items
            if (options.where.item.player) {
                playerItems.forEach(item => {
                    if (TagHandler.CheckTagsString(item, options.string, options.method)) {
                        finalItems.player.push(item);
                    }
                })
            }

            result.items = finalItems;
            result.actors = finalActors;
        ////////////////////////////////////////////////////////////////////////
        // Get all the documents that have atleast one tag
        } else {
            ////////////////////////////////////////////////////////////////////
            // Actors
            ////////////////////////////////////////////////////////////////////
            // Global actors
            if (options.where.actor.global) {
                globalActors.forEach(actor => {
                    if (TagHandler.GetTags(actor).length != 0) {
                        finalActors.global.push(actor);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Scene actors
            if (options.where.actor.scene) {
                sceneActors.forEach(actor => {
                    if (TagHandler.GetTags(actor).length != 0) {
                        finalActors.scene.push(actor);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Player actors
            if (options.where.actor.player) {
                playerActors.forEach(actor => {
                    if (TagHandler.GetTags(actor).length != 0) {
                        finalActors.player.push(actor);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Items
            ////////////////////////////////////////////////////////////////////
            // Global items
            if (options.where.item.global) {
                globalItems.forEach(actor => {
                    if (TagHandler.GetTags(actor).length != 0) {
                        finalItems.global.push(actor);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Actor items
            if (options.where.item.actor) {
                actorItems.forEach(actor => {
                    if (TagHandler.GetTags(actor).length != 0) {
                        finalItems.actor.push(actor);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Scene items
            if (options.where.item.scene) {
                sceneItems.forEach(actor => {
                    if (TagHandler.GetTags(actor).length != 0) {
                        finalItems.scene.push(actor);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////
            // Player items
            if (options.where.item.player) {
                playerItems.forEach(actor => {
                    if (TagHandler.GetTags(actor).length != 0) {
                        finalItems.player.push(actor);
                    }
                });
            }

            result.items = finalItems;
            result.actors = finalActors;
        }

        ////////////////////////////////////////////////////////////////////////
        // Sanitizes the output to be more usable
        if (result.actors.global.length == 0) { result.actors.global = undefined; }
        if (result.actors.scene.length == 0) { result.actors.scene = undefined; }
        if (result.actors.player.length == 0) { result.actors.player = undefined; }
        if (result.actors.global == undefined &&
            result.actors.scene == undefined &&
            result.actors.player == undefined) { result.actors = undefined; }

        if (result.items.global.length == 0) { result.items.global = undefined; }
        if (result.items.actor.length == 0) { result.items.actor = undefined; }
        if (result.items.scene.length == 0) { result.items.scene = undefined; }
        if (result.items.player.length == 0) { result.items.player = undefined; }
        if (result.items.global == undefined &&
            result.items.actor == undefined &&
            result.items.scene == undefined &&
            result.items.player == undefined) { result.items = undefined; }

        if (result.actors == undefined && result.items == undefined) {
            result = undefined;
        }

        return result;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Search for tags inside the items of a actor
    ////////////////////////////////////////////////////////////////////////////
    static SearchActor(actor, options) {
        // Options validation
        if (options == undefined) {
            options = {
                method: 'include',
            }
        }
        else {
            if (options.method == undefined) {
                options.method = 'include';
            }
        }

        let actorItems = Array.from(actor.items);
        let finalItems = [];

        ////////////////////////////////////////////////////////////////////////
        // Filter using tags
        if (options.tags != undefined && options.tags != null) {
            actorItems.forEach(item => {
                if (TagHandler.CheckTags(item, options.tags, options.method)) {
                    finalItems.push(item);
                }
            });
        ////////////////////////////////////////////////////////////////////////
        // Filter using a string
        } else if (options.string != undefined && options.tags != null) {
            actorItems.forEach(item => {
                if (TagHandler.CheckTagsString(item, options.string, options.method)) {
                    finalItems.push(item);
                }
            })
        ////////////////////////////////////////////////////////////////////////
        // Get all the items that have atleast one tag
        } else {
            actorItems.forEach(actor => {
                if (TagHandler.GetTags(actor).length != 0) {
                    finalItems.push(actor);
                }
            });
        }

        // Do not return a empty array
        if (finalItems.length == 0) {
            finalItems = undefined;
        }

        return finalItems;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Search all possibilities to find the tags
    // ! DEPRECATED
    ////////////////////////////////////////////////////////////////////////////
    static Search(tags) {
        console.warn("This method is deprecated, please use SearchAll")
        // Result that will be returned
        let result = {
            actors: [],
            items: [],
        }

        // Get the tokens from the current scene
        let currentSceneTokens = Array.from(game.scenes.current.tokens);
        // Remove the linked tokens
        let filteredCurrentSceneTokens = [];
        currentSceneTokens.forEach(element => {
            if (!element.actorLink) {
                filteredCurrentSceneTokens.push(element);
            }
        });
        // Get the actors for the current scene
        let currentSceneActors = [];
        filteredCurrentSceneTokens.forEach(element => {
            currentSceneActors.push(element.actor);
        });
        // Combine all the actors together
        let allActors = [...game.actors, ...currentSceneActors];
        // Filter the actors to just include the ones that have the tags
        allActors.forEach(element => {
            if (TagHandler.CheckTags(element, tags)) {
                result.actors.push(element);
            }
        });

        // Get all owned items
        let allOwnedItems = [];
        allActors.forEach(element => {
            allOwnedItems = [...allOwnedItems, ...Array.from(element.items)];
        });
        // Combine all the items together
        let allItems = [...game.items, ...allOwnedItems];
        // Filter items to just include the ones that have the tags
        allItems.forEach(element => {
            if (TagHandler.CheckTags(element, tags)) {
                result.items.push(element);
            }
        })

        // Remove empty entries
        let noneFound = true;
        if (result.actors.length == 0) {
            result.actors = undefined;
        } else {
            noneFound = false;
        }
        if (result.items.length == 0) {
            result.items = undefined;
        } else {
            noneFound = false;
        }

        if (noneFound) {
            result["noneFound"] = true;
        }

        return { result };
    }
}
