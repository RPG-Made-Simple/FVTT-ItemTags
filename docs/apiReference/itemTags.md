!> Tags are **case-sensitive**, don't forget about it while using the API!

## Get Tags
```js
ItemTags.get(document: Document) -> Array<String>
```
```js
// Example
const item = await fromUuid('<placehold_uuid>');
const isMetallic = ItemTags.get(item);
// Will return the tags of the passed item
```

Returns `Array` of `String` containing all the tags of the passed `document`. If no tags are found, it returns `undefined`.

## Check Tags
```js
ItemTags.check(document: Document, tags: Array<String>, method: String = 'includeAND') -> Boolean;
```
```js
// Example
const item = await fromUuid('<placehold_uuid>');
const isMetallic = ItemTags.check(item, ['metal']);
// Checks if the passed item has the metal tag
```
- `method` - Defines what filtering method will be used, this value can be:
    - `'includeAND'`
      - Only shows results that contain **all** the passed tags
    - `'excludeAND'`
      - Only shows results that **don't** contain **all** the passed tags
    - `'includeOR'`
      - Only show results that contain **at least one** of the passed tags
    - `'excludeOR'`
      - Only show results that **don't** contain **at least one** of the passed tags

Returns `true` if the check passes with the passed `method`, otherwise returns `false`.

## Check Tags by String
```js
ItemTags.checkString(document: Document, string: String, method: String = 'includeAND') -> Boolean;
```
```js
// Example
const item = await fromUuid('<placehold_uuid>');
const hasDagger = ItemTags.checkString(item, 'dagger', 'includeOR');
// Checks if the passed item has the string 'dagger' in at least one tag
```
- `method` - Defines what filtering method will be used, this value can be:
    - `'includeAND'`
      - Only show the results when **all** contained tags have the string
    - `'excludeAND'`
      - Only show the results when **all** the contained tags **don't** contain the string
    - `'includeOR'`
      - Only show results when **at least one** of the tags contain the string
    - `'excludeOR'`
      - Only show results when **at least one** of the tags **don't** contain the string

Returns `true` if the check passes with the passed `method`, otherwise returns `false`.

## Set the Tags
```js
ItemTags.set(document: Document, tags: Array<String>) -> void;
```
```js
// Example
const item = await fromUuid('<placehold_uuid>');
ItemTags.set(item, ['dagger', 'metal', 'wood']);
// Set the tags of the passed item to 'dagger', 'metal' and 'wood'
```
Set the `tags` of a passed `document`.

## Add Tags
```js
ItemTags.add(document: Document, tags: Array<String>) -> void;
```
```js
// Example
const item = await fromUuid('<placehold_uuid>');
ItemTags.add(item, ['metal']);
// Adds the 'metal' tag to the passed item
```
Append the `tags` to the already existing ones inside of a passed `document`.

### Remove Tags
```js
ItemTags.remove(document: Documet, tags: Array<String>) -> void;
```
```js
// Example
const item = await fromUuid('<placehold_uuid>');
ItemTags.remove(item, ['wood']);
// Removes the 'wood' tag from the passed item
```
Remove the `tags` from a passed `document` if they exist, otherwise does nothing.

## Clear Tags
```js
ItemTags.clear(document: Document) -> void;
```
```js
// Example
const item = await fromUuid('<placehold_uuid>');
ItemTags.clear(item);
// Removes all tags from the passed item
```
Removes **all** `tags` from a passed `document`.

## Search All
```js
ItemTags.searchAll(options: Object) -> Object;
```
**`options` example:**
```js
// Example 1
{
  method: 'includeAND',
  where: {
    actor: {
      global: false
      scene: false,
      player: true,
    },
    item: true
  }
  tags: ['magic']
}
// Example 2
```
- `method` (optional, defaults to `'includeAND'`) - A `string` that defines what filtering method will be used when `tags` or `string` is passed, this value can be:
  - `'includeAND'`
    - For tags: only shows results that contain **all** the passed tags
    - For string: only show the results when **all** contained tags have the string
  - `'excludeAND'`
    - For tags: only shows results that **don't** contain **all** the passed tags
    - For string: only show the results when **all** the contained tags **don't** contain the string
  - `'includeOR'`
    - For tags: only show results that contain **at least one** of the passed tags
    - for string: only show results when **at least one** of the tags contain the string
  - `'excludeOR'`
    - For tags: only show results that **don't** contain **at least one** of the passed tags
    - For string: only show results when **at least one** of the tags **don't** contain the string
- `where` (optional) - A `Object` that defines where the search will be made, this objett contains:
  - `actor` (optional) - A `boolean` that defines what actors will be searche, this object contains:
    - `global` (optional) - A `boolean` that defines if actors from the actor directory should be searched for tags
    - `scene` (optional) - A `boolean` that defines if actors from the current scene should be searched for tags
    - `player` (optional) - A `boolean` that defines if the players should be searched for tags
  - `item` (optional) - A `Object` that defines what items will be searched, this object contains:
    - `global` (optional) - A `boolean` that defines if items inside the item directory should be searched for tags
    - `actor` (optional) - A `boolean` that defines if items inside the actors from the actor directory should be searched for tags
    - `scene` (optional) - A `boolean` that defines if items inside the actors from the current scene should be searched for tags
    - `player` (optional) - A `boolea` that defines if items inside the players should be searched for tags
- `tags` (optional) - A `string array` containing the tags that will be used for filtering (take a look at the tips below)
- `string` (optional) - A `string` containing the string that will be used for filtering (take a look at tips below)

> There are two optional values for searching base filters, `tags` and `strings`, only one will be used for the search, if you pass both, the `tags` option will be used. And if you don't pass both, the search will return all the results that have atleast one tag set.

> All the options inside `where` are optional, if you don't pass any of the values it will default to `true`. You can set any of the values (including `where` itself, `where.item` and `where.actor`) to `false` to exclude them from the search.
>
**Returns a `Object` like this:**
```js
{
    // If a category has no results, it will be undefined, i.e:
    // no global actors got found, so actors.global will be undefined
    // If all the values from a type are undefined, it will be undefined too, i.e:
    // actors.global, actors.scene and actors.player are undefined, so actors will be undefined
    // If actors and items are undefined, them the returning value of the method will be undefined too
    actors: { // The actors that got found
        global: [] // From the actor directory
        scene: [] // From the current scene
        player: [] // From the players
    }
    items: { // The items that got found
        global: [] // From the item directory
        actor: [] // From the actor directory
        scene: [] // From the current scene
        player: [] // From the players
    }
}
```

> Yes, the returned values may be duplicated, i.e your actor being contained in `player` and `scene`. I've tried many designs and this is the best one I found since its simple and easy to use. If someone really needs this, I will try another approach, but for now I'm not considering it.

Lets say you want to get all the items and actors that have at least one tag set:
```js
ItemTags.searchAll();
```
Thats it, simple as that.

Now one that is a little bit more complex, imagine you want to find all the items on your world that are **not** made of metal, for this scenario consider that you have tagged the metallic items as `metal`:
```js
ItemTags.searchAll({
    tags: ['metal'],
    method: 'excludeOR', // You could use 'excludeAND' too if you have only one tag to search
    where: {
        actor: false, // We just want items
        item: true, // We want to find ALL the items
    }
})
```

The returned Object will contain only items that **don't** have the metal tag set.

Lets imagine a more realistic use, lets say we have a spell that makes all magical wooden items in a area turn into dust and vanish, you could get all the wooden items like this:
```js
ItemTags.searchAll({
    tags: ['wood', 'magic'], // We want magical wooden items to be affected, not only wood, not only magic
    method: 'includeAND', // Since we want the items with BOTH tags set, we need to use includeAND
    where: {
        actor: false, // We are not searching for actors, just items
        item: {
            global: false, // We don't need it
            actor: false, // We don't need it
            scene: true, // The only option we need, items that are inside a actor from the current scene
            player: false, // We don't need it
        }
    }
})
```
The returned Object will contain only the items that have **both** the `wood` and `magic` tags set.

If you are trying to do something and these examples are not enough, feel free to join my [Discord](https://discord.gg/RAgPXB4zG7) and ping me `@zotydev` and I will help you!

## Search Actor
```js
ItemTags.searchActor(actor: Actor, options: Object) -> Array<Object>;
```
**`options` must be:**
- `method` (optional, defaults to `'includeAND'`) - A `string` that defines what filtering method will be used when `tags` or `string` is passed, this value can be:
  - `'includeAND'`
    - For tags: only shows results that contain **all** the passed tags
    - For string: only show the results when **all** contained tags have the string
  - `'excludeAND'`
    - For tags: only shows results that **don't** contain **all** the passed tags
    - For string: only show the results when **all** the contained tags **don't** contain the string
  - `'includeOR'`
    - For tags: only show results that contain **at least one** of the passed tags
    - for string: only show results when **at least one** of the tags contain the string
  - `'excludeOR'`
    - For tags: only show results that **don't** contain **at least one** of the passed tags
    - For string: only show results when **at least one** of the tags **don't** contain the string
- `tags` (optional) - A `string array` containing the tags that will be used for filtering
- `string` (optional) - A `string` containing the string that will be used for filtering

> Very similar to [searchAll()](#search-all), the only difference is that `searchActor()` will search inside of an actor, everything else is the same.

This method returns a `Object array` containing the items that got found, if no items match the filters it returns `undefined`.

Usage example: lets say you taged all the items on your world, and the items that emit light all have the `light_` prefix, you can easily find the light emitting items of a certain actor like this:
```js
let actor = ... // Where you are getting your actor Object from
ItemTags.searchActor(actor, {
    string: 'light_', // String that will be used on the search
    method: 'includeOR', // At least one tag must contain the string
})
```
This way we will search all the items of a actor and only the ones that have atleast one tag with the `light_` string inside of it will be returned.

> PS: Don't do this :P Its just a example and is not a good idea to replicate, if you want to do something similar try using combination of tags, like `light` and `emit`. This way you can benefit from the individual tags if you need _idk if someone will ever get to this level of complexity, but its possible :D_

## Missing
```js
ItemTags.missing(document: Documet, tags: Array<String>) -> Array<String>;
```
```js
// Example
const item = await fromUuid('<placehold_uuid>');
const missingTags = ItemTags.missing(item, ['metal', 'wood']);
// Checks which of the passed tags are missing from item
```
Checks which of the passed `tags` are missing from the `document`.

## Delete All
```js
ItemTags.deleteAll(document: Document) -> void;
```
```js
// Example
const item = await fromUuid('<placehold_uuid>');
ItemTags.deleteAll(item);
// Deletes all tags from item
```
Deletes all the tags from the passed `document`.
