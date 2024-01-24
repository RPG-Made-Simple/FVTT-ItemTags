## Ready
`item-tags.ready`
```js
// Example
Hooks.once('item-tags.ready', () => {
    // ...
});
// Will execute something when toolbox is ready
```
Main hook of the module, gets called after `ready`.

> `options` is a special `Object` that contains relevant data about the changes on tags, take a look at the structure:
> ```js
> {
>     document, // The container of the tags
>     currentTags, // The tags at the current state
>     addedTags, // Tags that will be/got added
>     removedTags, // Tags that will be/got removed
>     oldTags, // Tags before the change
>     newTags, // Tags after the change
> }
> ```

## Pre Tag Set
`item-tags.tag.pre-set`
```js
// Example
Hooks.on('item-tags.tag.pre-set', (options) => {
    // ...
});
// Will always execute before tags get changed somewhere
```
Will get called before any amount of tags are changed somewhere.

## Pos Tag Set
`item-tags.tag.pos-set`
```js
// Example
Hooks.on('item-tags.tag.pos-set', (options) => {
    // ...
});
// Will always execute after tags get changed somewhere
```
Will get called after any amount of tags are changed somewhere.
