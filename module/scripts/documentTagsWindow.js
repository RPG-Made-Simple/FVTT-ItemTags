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
        }

        const mergedOptions = foundry.utils.mergeObject(defaults, overrides);

        return mergedOptions;
    }

    async _handleEnterKeypress(html, event) {
        if (event.key == "Enter") {
            let currentTags = await TagHandler.GetTags(this.options.document, event.target.value);
            currentTags.push(event.target.value);
            await TagHandler.UpdateTags(this.options.document, currentTags);
            event.target.value = "";
            this.render();
            html[0].querySelector('input[class="oif-tag-input"]')?.focus();
        }
    }

    async _handleLinkClick(html, event) {
        let clickedElement = $(event.currentTarget);
        let currentTags = await TagHandler.GetTags(this.options.document, event.target.value);
        currentTags.splice(clickedElement[0].id, 1);
        await TagHandler.UpdateTags(this.options.document, currentTags);
        this.render();
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.on('keypress', 'input[class="oif-tag-input"]', this._handleEnterKeypress.bind(this, html));
        html.on('click', 'i[class="fas fa-times"]', this._handleLinkClick.bind(this, html));

        html[0].querySelector('input[class="oif-tag-input"]')?.focus();
    }

    getData(options) {
        return {
            documentTags: TagHandler.GetTags(options.document)
        }
    }

    async _updateObject(event, formData) {
    }
}
