////////////////////////////////////////////////////////////////////////////////
//                  _____ _              _______                              //
//                 |_   _| |            |__   __|                             //
//                   | | | |_ ___ _ __ ___ | | __ _  __ _ ___                 //
//                   | | | __/ _ \ '_ ` _ \| |/ _` |/ _` / __|                //
//                  _| |_| ||  __/ | | | | | | (_| | (_| \__ \                //
//                 |_____|\__\___|_| |_| |_|_|\__,_|\__, |___/ LIBRARY        //
//                                                   __/ |       By ZotyDev   //
////////////////////////////////////////////////////|___////////////////////////
// ? Main class of the library
import { Constants as C } from "./constants.js";

export class ItemTags {
    ////////////////////////////////////////////////////////////////////////////
    // Initialize the module
    ////////////////////////////////////////////////////////////////////////////
    static initialize() {
        // Debug
        C.D.info('ItemTags.initialize()');

        // Register module inside Packets
        Packets.registerModule(C.ID);

        // Create a Packet for global tags
        const packetData = {

        }
        C.PACKETS.GLOBAL_TAGS = Packets.create()
    }
}
