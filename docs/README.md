<a href="https://foundryvtt.com/packages/item-tags">
    <p align="center">
        <img src="https://raw.githubusercontent.com/RPG-Made-Simple/FVTT-ItemTags/main/branding/title.png" alt="Item Tags Title">
    </p>
</a>

## What Item Tags is

A FoundryVTT library that provides a way to insert and manage tags across all documents. This is useful for storing simple data that can help modules and macros create generic code and reuse it easily, it also allows some type of customization. The idea of tagging Items was born because I don't use English in my sessions, and relying of autodetect based on names was going to be too much for me to handle.

> This library was part of [OIF](https://github.com/ZotyDev/objects-interactions-fx) and now is standalone since I think it can be very beneficial to other developers (even myself in the future!). Feel free to use it to do anything! If you have questions, join my discord or leave a issue, I will help you asap.

**If you are a developer, you are looking for [this](apireference/)**

## API Example
```js
if (ItemTags.check(game.items.get("<id>"), ['metal'])) {
    console.log('The tag is set');
} else {
    console.log('The tag is not set');
}
```

## Adding Tags
Open a supported document and find the `Tags` button, click it, insert the `Tag` and press <kbd>Enter</kbd>.

> All the changes you do need to be confirmed, if you click on cancel the changes you made will be discarded.

<p align="center">
    <img src="https://raw.githubusercontent.com/RPG-Made-Simple/FVTT-ItemTags/main/images/adding-tags.gif" alt="Adding Tags">
</p>

## Removing Tags
Open the `Tags` button and click on the `X` on the tag you want to remove. You need to confirm when removing tags.

<p align="center">
    <img src="https://raw.githubusercontent.com/RPG-Made-Simple/FVTT-ItemTags/main/images/removing-tags.gif" alt="Removing Tags">
</p>

## Reordering Tags
Open the `Tags` button and drag the `Tag` to its new position.

<p align="center">
    <img src="https://raw.githubusercontent.com/RPG-Made-Simple/FVTT-ItemTags/main/images/reordering-tags.gif" alt="Reordering Tags">
</p>

## Editing Tags
Open the `Tags` button and double-clic the **name** of a `Tag`, then press <kbd>Enter</kbd> to insert it again.

<p align="center">
    <img src="https://raw.githubusercontent.com/RPG-Made-Simple/FVTT-ItemTags/main/images/editing-tags.gif" alt="Editing Tags">
</p>
