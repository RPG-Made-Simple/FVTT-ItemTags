import { Constants as C } from "./constants.js";

export class TagHandler {
    static _Check(document) {
        let tags = document.getFlag(C.ID, C.FLAGS.TAGS);
        if (tags == null || tags == undefined)
        {
            return { valid: false, tags: tags };
        }
        else
        {
            return { valid: true, tags: tags };
        }
    }

    static GetTags(document) {
        let check = TagHandler._Check(document);
        if (check.valid) {
            return check.tags;
        }
        else {
            return TagHandler.CreateTags(document);
        }
    }

    static CreateTags(document, tags)
    {
        if (tags != null && tags != undefined) {
            tags = [tags];
        }
        else {
            tags = [];
        }

        let check = TagHandler._Check(document);
        if (check.valid) {
            return null;
        }
        else {
            return document.setFlag(C.ID, C.FLAGS.TAGS, tags);
        }
    }

    static UpdateTags(document, tags)
    {
        let check = TagHandler._Check(document);
        if (check.valid) {
            return document.setFlag(C.ID, C.FLAGS.TAGS, tags);
        }
    }

    static DeleteTags(document)
    {
        return document.unsetFlag(C.ID, C.FLAGS.TAGS)
    }
}
