<a href="https://foundryvtt.com/packages/item-tags">
  <p align="center">
    <img src="https://raw.githubusercontent.com/RPG-Made-Simple/FVTT-ItemTags/main/branding/title.png" alt="Item Tags Title">
  </p>
</a>

<p align="center">
  <a href="https://discord.gg/RAgPXB4zG7">
    <img src="https://discord.com/api/guilds/1071251491375042661/widget.png?style=shield"/>
  </a>
</p>

A FoundryVTT library that provides a way to insert and manage tags across all documents. This is useful for storing simple data that can help modules and macros create generic code and reuse it easily, it also allows some type of customization. The idea of tagging Items was born because I don't use English in my sessions, and relying of autodetect based on names was going to be too much for me to handle.

> This library was part of [OIF](https://github.com/ZotyDev/objects-interactions-fx) and now is standalone since I think it can be very beneficial to other developers (even myself in the future!). Feel free to use it to do anything! If you have questions, join my discord or leave a issue, I will help you asap.

---
Do you like the module? Consider supporting it :)

<a href='https://ko-fi.com/T6T8IFCB5' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi5.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Note for Developers (modules and macros)
Take a look at the [Documentation](https://docs.rpgmadesimple.com/FVTT-ItemTags).

## Main Features
- Insert `Tags` in almost all types of document
- Interact with the `Tags` using the [API](https://docs.rpgmadesimple.com/FVTT-ItemTags/#/apiReference/)

## API Example
```js
if (ItemTags.Check(game.items.get("<id>"), ['metal'])) {
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
Open the `Tags` button and double-click the **name** of a `Tag`, then press <kbd>Enter</kbd> to insert it again.

<p align="center">
  <img src="https://raw.githubusercontent.com/RPG-Made-Simple/FVTT-ItemTags/main/images/editing-tags.gif" alt="Editing Tags">
</p>

<h2 align="center"> <a href="https://github.com/RPG-Made-Simple/FVTT-ItemTags/blob/main/CHANGELOG.md"> Changelog</a></h2>
