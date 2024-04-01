import { Block } from "./Block";
import { MineBlock } from "./MineBlock";
import { Transaction } from "./Transaction";

export class BlockChain{
    /**
     * @param {Array<Block>} blocks List of blocks in a blockchain
     */
    constructor(blocks = []){
        this.blocks = blocks;
        //this.AddGenesisBlock();
        this.tempTransactions = [];
        this.difficulty = 5;
        this.blockTransactionSize = 2;
    }

    async AddGenesisBlock(){
        let genesisBlock = new Block(1)
        genesisBlock.SetPreviousHash("0000000000000000000000000000000000000000000000000000000000000000");
        await MineBlock(genesisBlock, this.difficulty)
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

    /**
     * 
     * @param {Transaction} transaction 
     */
    async addTransaction(transaction){
        if(this.tempTransactions.length >= this.blockTransactionSize){
            await this.createBlock();
        }
        this.tempTransactions.push(transaction);
    }

    async createBlock(){
        const block = new Block();
        block.ID = this.blocks.length+1;
        for(const transaction of this.tempTransactions){
            block.AddTransaction(transaction);
        }
        // get the last block hash
        block.SetPreviousHash(this.GetLastBlock().GetHash());
        // Mine the block
        await MineBlock(block, this.difficulty);
        // push the block into the blockchain
        this.blocks.push(block);
        // clear the transactions
        this.tempTransactions = [];
    }

    getBalance(WalletAddress){
        let balance = 0;
        
        this.blocks.forEach(block => {
            block.GetTransactions().forEach(transaction => {
                if(transaction.to === WalletAddress){
                    balance += transaction.amount;
                }else if(transaction.from === WalletAddress){
                    balance -= transaction.amount;
                }
            })
        })
        this.tempTransactions.forEach(transaction => {
            if(transaction.to === WalletAddress){
                balance += transaction.amount;
            }else if(transaction.from === WalletAddress){
                balance -= transaction.amount;
            }
        })
        return balance;
    }
}