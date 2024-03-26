import { Block } from "./Block"
import { sha256HashObject } from "./Cryptography"

/**
 * @param {Block} _block The block
 * @param {Number} NofOs Number 0's in the first string of hash
 * @returns {Block} Mined block
 */
export async function MineBlock(_block, NofOs = 2){
    let numberOf0s_string = ""
    for(let i = 0; i < NofOs; i++){
        numberOf0s_string += "0";
    }

    let nonce = 1;

    let hash = await sha256HashObject(_block);
    while(!hash.startsWith(numberOf0s_string)){
        _block.SetNonce(nonce++);
        hash = await sha256HashObject(_block);
        _block.SetHash(hash)
    }

    return _block;
}