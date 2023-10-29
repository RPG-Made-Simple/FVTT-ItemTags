# Item Tags Changelog

## Version 1.1.0

- *API* - `Search()` is now deprecated, use [`SearchAll()`](https://modules.zoty.dev/itemTags/apiReference.html#search-all) instead.
- *Feature* - Better searching method, `SearchAll()`, that will search across all your world and filter the results, read more about it [here](https://modules.zoty.dev/itemTags/apiReference.html#search-all).
- *Feature* - New search method, `SearchActor()`, to search inside actors, read more about it [here](https://modules.zoty.dev/itemTags/apiReference.html#search-actor).

## Version 1.0.3

- *Feature* - Now only GMs see the `Item Tags` button.
- *Feature* - Added a `Search()` method to return all the Objects that pass the filter, read more about it [here](https://modules.zoty.dev/itemTags/apiReference.html#search-tags).
- *Interface* - Modified the header name from `Tags` to `Item Tags`

## Version 1.0.2

- *Fixed #1* - Fixed a bug where `_Migrate()` tried to access data that could be invalid.

## Version 1.0.1

- *Fixed* - OIF tag migration was not being saved.

## Version 1.0.0
_These changes are relative to [OIF](https://github.com/ZotyDev/objects-interactions-fx) since this module was originally part of it_

- *Fixed* - Empty flags are no more inserted into documents.
- *Fixed* - It is now impossible to create duplicate tags, note that Item Tags is case sensitive, so `Dagger` and `dagger` are different tags.
- *Fixed* - All tags are now stored as `String`.
- *Feature* - All the tags that were defined by OIF will be migrated and deleted.
- *Feature* - Added a API to interact with the tags of a document.
- *Feature* - Deleting tags now require a confirmation.
- *Feature* - All the tag modifications need to be saved, otherwise they will be cancelled.
- *Interface* - Improved tag visuals to be more readable and look better in general.
- *Interface* - Improved placeholder text for adding a new tag.
- *Languages* - Made all strings translatable.
-  *Internal* - Remove some unused code.
-  *Internal* - Changed CSS to SASS for a easier and cleaner development.
-  *Internal* - Changed the flag id where tags get stored, from `objects-interactions-fx` to `item-tags`, and the flag, from `item-tags` to `tags`.
