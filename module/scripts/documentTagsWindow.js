////////////////////////////////////////////////////////////////////////////////
//                 _____ _              _______                               //
//                 |_   _| |            |__   __|                             //
//                   | | | |_ ___ _ __ ___ | | __ _  __ _ ___                 //
//                   | | | __/ _ \ '_ ` _ \| |/ _` |/ _` / __|                //
//                  _| |_| ||  __/ | | | | | | (_| | (_| \__ \                //
//                 |_____|\__\___|_| |_| |_|_|\__,_|\__, |___/ LIBRARY        //
//                                                   __/ |       By ZotyDev   //
////////////////////////////////////////////////////|___////////////////////////
// ? This class handle all the UI for interacting with the tags of a document.
import { Constants as C } from "./constants.js";
import { TagHandler } from "./tagHandler.js";

export class DocumentTagsWindow extends FormApplication {
    static get defaultOptions() {
        const defaultOptions = super.defaultOptions;

        const overrides = {
            closeOnSubmit: false,
            height: 'auto',
            id: 'document-tags',
            submitOnChange: true,
            template: `modules/${C.ID}/module/templates/documentTagsWindow.hbs`,
            title: game.i18n.localize('itemTags.window.itemTags'),
            document: '',
            tags: '',
            tagBeingEdited: '',
        }

        defaultOptions.classes = ['item-tags-window', 'window-content']

        const mergedOptions = foundry.utils.mergeObject(defaultOptions, overrides);

        return mergedOptions;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Handle tag creation by pressing enter
    ////////////////////////////////////////////////////////////////////////////
    async _handleEnterKeypress(html, event) {
        // Check the pressed key to see if it is enter
        if (event.key == "Enter") {
            // Check the ordering of tags
            this.solveOrder(html);

            // Get the current temporary tags from the passed options
            let currentTags = this.options.tags;

            // Check if the tag already exist
            if (currentTags.indexOf(event.target.value) != -1) {
                // The tag is a duplicate and cannot be inserted
                ui.notifications.warn(game.i18n.localize('itemTags.warning.duplicate'));
            }
            else
            {
                // The tag is not a duplicate and is inserted in the current
                // temporary tags
                currentTags.push(event.target.value);
                // Resets the value inside the input field
                event.target.value = "";

                // Reset the current tag being edited
                this.options.tagBeingEdited = '';

                // Render the window again to show changes
                this.render();
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Handle tag deletion by pressing the 'X' on the tag
    ////////////////////////////////////////////////////////////////////////////
    async _handleDeleteClick(html, event) {
        // Get clicked element
        const clickedElement = $(event.currentTarget);

        // Dialog to ask if the user wants to delete the tag
        const dialog = new Dialog({
            title: game.i18n.localize('itemTags.tag.deletion.title'),
            content: `<p>${game.i18n.localize('itemTags.tag.deletion.description').replace('$tag', clickedElement[0].parentElement.parentElement.childNodes[1].innerText)}</p>`,
            buttons: {
                no: {
                    // Don't delete the tag
                    icon: '<i class="fas fa-times"></i>',
                    label: game.i18n.localize('itemTags.confirmation.no'),
                },
                yes: {
                    // Delete the tag
                    icon: '<i class="fas fa-check"></i>',
                    label: game.i18n.localize('itemTags.confirmation.yes'),
                    callback: () => {
                        // Get the current temporary tags
                        let currentTags = this.options.tags;
                        // Remove the tag using the id of its position
                        currentTags.splice(event.target.dataset.index, 1);

                        // Render the window again to show changes
                        this.render();
                    }
                }
            }
        });
        dialog.render(true);
    }

    ////////////////////////////////////////////////////////////////////////////
    // Handle double click to edit
    ////////////////////////////////////////////////////////////////////////////
    async _handleDoubleClickEdit(html, event) {
        // Get clicked element
        const clickedElement = $(event.currentTarget);

        // Get the current temporary tags
        let currentTags = this.options.tags;
        const tag = clickedElement[0].outerText;
        currentTags.splice(currentTags.indexOf(tag), 1)

        this.options.tagBeingEdited = tag;

        this.render();
    }

    ////////////////////////////////////////////////////////////////////////////
    // Handle clicking on cancel
    ////////////////////////////////////////////////////////////////////////////
    async _handleCancel() {
        // Just closes the window without saving the current temporary tags
        this.close();
    }

    ////////////////////////////////////////////////////////////////////////////
    // Handle clicking on save
    ////////////////////////////////////////////////////////////////////////////
    async _handleSave(html, event) {
        const tagBeingEdited = html[0].querySelector('input[class="tag-input"]').value;

        // Check ordering of tags
        this.solveOrder(html);

        // Add the current tag being edited, just in case
        if (tagBeingEdited.length > 0) {
            this.options.tags.push(tagBeingEdited);
        }

        // Saves the current temporary tags
        TagHandler.setTags(this.options.document, this.options.tags);
        // Closes the window
        this.close();
    }

    ////////////////////////////////////////////////////////////////////////////
    // Check and solves ordering of tags
    ////////////////////////////////////////////////////////////////////////////
    solveOrder(html) {
        const rawTags = html[0].children[0].children;
        let tags = new Array();
        for (let i = 0; i < rawTags.length - 1; i++) {
            tags.push(rawTags[i].outerText);
        }

        // Sanitizes the strings
        let orderedTags = new Array();
        for (const tag of tags) {
            orderedTags.push(tag.trim());
        }

        // Check if the tags only differ in ordering
        if (this.options.tags.toSorted().toString() === orderedTags.toSorted().toString()) {
            // Set the tags as the new ordered ones
            this.options.tags = orderedTags;
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Activate the listeners
    ////////////////////////////////////////////////////////////////////////////
    activateListeners(html) {
        super.activateListeners(html);

        html.on('keypress', 'input[class="tag-input"]', this._handleEnterKeypress.bind(this, html));
        html.on('click', 'i[class="fas fa-times"]', this._handleDeleteClick.bind(this, html));

        html.on('click', 'button[class="cancel"]', this._handleCancel.bind(this));
        html.on('click', 'button[class="save"]', this._handleSave.bind(this, html));

        html.on('dblclick', 'span[class="text"]', this._handleDoubleClickEdit.bind(this, html));

        html[0].querySelector('input[class="tag-input"]').focus();
        html[0].querySelector('input[class="tag-input"]').value = this.options.tagBeingEdited;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Returns the data that will populate the window
    ////////////////////////////////////////////////////////////////////////////
    getData(options) {
        return {
            documentTags: this.options.tags
        }
    }

    async _updateObject(event, formData) {
    }
}
