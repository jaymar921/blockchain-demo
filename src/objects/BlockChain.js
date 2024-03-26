import { Block } from "./Block";

export class BlockChain{
    /**
     * @param {Array<Block>} blocks List of blocks in a blockchain
     */
    constructor(blocks = []){
        this.blocks = blocks;
    }

    /**
     * @param {Block} block Add a new block in the blockchain
     */
    AddBlock(block){
        let lastBlock = undefined;
        block.ID = this.blocks.length+1;
        if(this.blocks.length > 0){
            lastBlock = this.blocks[this.blocks.length - 1]
            block.SetPreviousHash(lastBlock.GetHash());
        }else{
            block.SetPreviousHash("0000000000000000000000000000000000000000000000000000000000000000");
        }
        this.blocks.push(block);
    }

    GetLastBlock(){
        return this.blocks[this.blocks.length - 1];
    }

    async UpdateBlocks(){
        for(let i = this.blocks.length-1; i >= 0; i--){
            if(i > 0){
                const earlyBlock = this.blocks[i - 1];
                const lastBlock = this.blocks[i];
                lastBlock.SetPreviousHash(earlyBlock.GetHash());
            }else{
                this.blocks[i].SetPreviousHash("0000000000000000000000000000000000000000000000000000000000000000")
            }
        }
    }
}