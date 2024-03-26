import { Block } from "./Block";
import { MineBlock } from "./MineBlock";

export class BlockChain{
    /**
     * @param {Array<Block>} blocks List of blocks in a blockchain
     */
    constructor(blocks = []){
        this.blocks = blocks;
        this.AddGenesisBlock();
    }

    AddGenesisBlock(){
        let genesisBlock = new Block()
        genesisBlock.SetPreviousHash("0000000000000000000000000000000000000000000000000000000000000000");
        MineBlock(genesisBlock)
        this.blocks.push(genesisBlock);
    }

    /**
     * @param {Block} block Add a new block in the blockchain
     */
    AddBlock(block){
        let lastBlock = undefined;
        block.ID = this.blocks.length+1;
        lastBlock = this.blocks[this.blocks.length - 1]
        block.SetPreviousHash(lastBlock.GetHash());
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
            }
        }
    }
}