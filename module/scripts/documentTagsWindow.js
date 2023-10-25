import { Constants as C } from "./constants.js";
import { TagHandler } from "./tagHandler.js";

export class DocumentTagsWindow extends FormApplication {
    static get defaultOptions() {
        const defaults = super.defaultOptions;

        const overrides = {
            closeOnSubmit: false,
            height: 'auto',
            id: 'document-tags',
            submitOnChange: true,
            template: `modules/${C.ID}/module/templates/documentTagsWindow.hbs`,
            title: "Tags",
            document: '',
            tags: '',
        }

        const mergedOptions = foundry.utils.mergeObject(defaults, overrides);

        return mergedOptions;
    }

    async _handleEnterKeypress(html, event) {
        if (event.key == "Enter") {
            let currentTags = this.options.tags;
            if (currentTags.indexOf(event.target.value) != -1) {
                ui.notifications.warn(game.i18n.localize('itemTags.warning.duplicate'));
            }
            else
            {
                currentTags.push(event.target.value);
                event.target.value = "";
                this.render();
                html[0].querySelector('input[class="tag-input"]')?.focus();
            }
        }
    }

    async _handleLinkClick(html, event) {
        let clickedElement = $(event.currentTarget);
        let dialog = new Dialog({
            title: game.i18n.localize('itemTags.tag.deletion.title'),
            content: `<p>${game.i18n.localize('itemTags.tag.deletion.description').replace('$tag', clickedElement[0].parentElement.parentElement.childNodes[1].innerText)}</p>`,
            buttons: {
                no: {
                    icon: '<i class="fas fa-times"></i>',
                    label: game.i18n.localize('itemTags.confirmation.no'),
                },
                yes: {
                    icon: '<i class="fas fa-check"></i>',
                    label: game.i18n.localize('itemTags.confirmation.yes'),
                    callback: () => {
                        let currentTags = this.options.tags;
                        currentTags.splice(clickedElement[0].id, 1);
                        this.render();
                    }
                }
            }
        });
        dialog.render(true);
    }

    async _handleCancel() {
        //...
        this.close();
    }

    async _handleSave() {
        TagHandler.UpdateTags(this.options.document, this.options.tags);
        this.close();
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.on('keypress', 'input[class="tag-input"]', this._handleEnterKeypress.bind(this, html));
        html.on('click', 'i[class="fas fa-times"]', this._handleLinkClick.bind(this, html));

        html.on('click', 'button[class="cancel"]', this._handleCancel.bind(this));
        html.on('click', 'button[class="save"]', this._handleSave.bind(this));

        html[0].querySelector('input[class="tag-input"]')?.focus();
    }

    getData(options) {
        return {
            documentTags: this.options.tags
        }
    }

    async _updateObject(event, formData) {
    }
}
