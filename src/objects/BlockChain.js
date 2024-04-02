import { notifications } from "@mantine/notifications";
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
        this.isMining = false;
    }

    async AddGenesisBlock(){
        if(this.isMining) return;
        console.log(this.isMining)
        this.isMining = true;
        let genesisBlock = new Block(1)
        notifications.show({
            title: "Mining Block [System]",
            message: `Mining Block #1 [Genesis Block]`,
        })
        genesisBlock.SetPreviousHash("0000000000000000000000000000000000000000000000000000000000000000");
        MineBlock(genesisBlock, this.difficulty).then(() => {
            this.isMining = false;
            if(!this.isMining){
                notifications.show({
                    title: "Mining Block [System]",
                    message: `Block #${genesisBlock.ID} was mined`,
                })
            }
        })
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

    GetBlock(hash){
        for(const block of this.blocks){
            if(block.Hash === hash){
                return block;
            }
        }
        return undefined;
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
        if(this.isMining) return;
        const block = new Block();
        block.ID = this.blocks.length+1;
        for(const transaction of this.tempTransactions){
            block.AddTransaction(transaction);
        }
        // clear the transactions
        this.tempTransactions = [];

        // get the last block hash
        block.SetPreviousHash(this.GetLastBlock().GetHash());
        notifications.show({
            title: "Mining Block [System]",
            message: `Mining Block #${block.ID}`,
        })
        // Mine the block
        this.isMining = true;
        MineBlock(block, this.difficulty).then(()=>{
            this.isMining = false;
            if(!this.isMining){
                notifications.show({
                    title: "Mining Block [System]",
                    message: `Block #${block.ID} was mined`,
                })
            }
        })
        // push the block into the blockchain
        this.blocks.push(block);
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