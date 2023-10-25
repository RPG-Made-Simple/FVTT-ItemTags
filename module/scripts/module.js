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

    Hooks.on("getItemSheetHeaderButtons", async (itemSheet, buttonArray) => {
        let tagButton = {
            label: "Tags",
            class: "item-tags",
            icon: "fas fa-tags",
            onclick: async () => {
                new DocumentTagsWindow().render(true, {
                    document: itemSheet.object,
                    tags: TagHandler.GetTags(itemSheet.object).slice(),
                    width: 480
                });
            }
        }

        buttonArray.unshift(tagButton);
    });

    Hooks.on("ready", async () => {
        console.log("Item Tags is ready!!");
    });

});
