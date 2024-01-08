////////////////////////////////////////////////////////////////////////////////
//                 _____ _              _______                               //
//                 |_   _| |            |__   __|                             //
//                   | | | |_ ___ _ __ ___ | | __ _  __ _ ___                 //
//                   | | | __/ _ \ '_ ` _ \| |/ _` |/ _` / __|                //
//                  _| |_| ||  __/ | | | | | | (_| | (_| \__ \                //
//                 |_____|\__\___|_| |_| |_|_|\__,_|\__, |___/ LIBRARY        //
//                                                   __/ |       By ZotyDev   //
////////////////////////////////////////////////////|___////////////////////////
// ? Here are all the constants used by ItemTags, all static values are and
// ? should be here
export class Constants {
    static ID = 'item-tags';
    static NAME_FLAT = 'Item Tags';
    static NAME = `🏷️ ${Constants.NAME_FLAT}`;
    static FLAGS = {
        TAGS: 'tags',
        HIDDEN_TAGS: 'hidden-tags',
    }
    static FILES = {
        ORIGIN: 'data',
        DATA_FOLDERS: {
            ROOT: 'itemTags',
            CACHE: 'itemTags/cache'
        }
    }
    static PACKETS = {};
    static D;
}
