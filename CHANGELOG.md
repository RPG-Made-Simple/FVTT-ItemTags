# Item Tags Changelog

### Version 0.0.1
_These changes are relative to [OIF](https://github.com/ZotyDev/objects-interactions-fx) since this module was originally part of it_

- *Feature* - Deleting tags now require a confirmation.
- *Feature* - All the tag modifications need to be saved, otherwise they will be cancelled.
- *Interface* - Improved tag visuals to be more readable and look better in general.
- *Interface* - Improved placeholder text for adding a new tag.
- *Languages* - Made all strings translatable.
- *Fix* - It is now impossible to create duplicate tags, note that Item Tags is case sensitive, so `Dagger` and `dagger` are different tags.
-  *Internal* - Remove some unused code.
-  *Internal* - Changed CSS to SASS for a easier and cleaner development.
-  *Internal* - Changed the flag id where tags get stored, from `objects-interactions-fx` to `item-tags`, and the flag, from `item-tags` to `tags`.
