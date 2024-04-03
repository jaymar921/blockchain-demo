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
        this.pendingBlocks = []
        //this.AddGenesisBlock();
        this.tempTransactions = [];
        this.difficulty = 5;
        this.blockTransactionSize = 2;
        this.isMining = false;
    }

    async AddGenesisBlock(){
        if(this.isMining) return;
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
                    color: "orange"
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

    GetBlockById(ID){
        return this.blocks.filter(b => b.ID === ID)[0];
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

    async createBlock(block = new Block()){
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
            color: "orange"
        })
        
        this.blocks.push(block);
        if(this.isMining) {
            this.pendingBlocks.push(block)
            const pendingBlockToMine = this.pendingBlocks.shift();
            const cancelId = setInterval(()=> {
                if(this.isMining) return;
                if(!pendingBlockToMine) return;
                const previousBlockMined = this.GetBlockById(pendingBlockToMine.ID - 1);
                if(!previousBlockMined) return;
                if(!previousBlockMined.GetHash()) return;
                pendingBlockToMine.SetPreviousHash(previousBlockMined.GetHash());
                notifications.show({
                    title: "Mining Block [System]",
                    message: `Mining Block #${pendingBlockToMine.ID}`,
                    color: "orange"
                })
                MineBlock(pendingBlockToMine, this.difficulty).then(()=>{
                    this.isMining = false;
                    if(!this.isMining){
                        notifications.show({
                            title: "Mining Block [System]",
                            message: `Block #${pendingBlockToMine.ID} was mined`,
                            color: "orange"
                        })
                    }
                })
                clearInterval(cancelId);
            }, [1000])
            return;
        }

        // Mine the block
        this.isMining = true;
        MineBlock(block, this.difficulty).then(()=>{
            this.isMining = false;
            if(!this.isMining){
                notifications.show({
                    title: "Mining Block [System]",
                    message: `Block #${block.ID} was mined`,
                    color: "orange"
                })
            }
        })
        // push the block into the blockchain
    }

    getBalance(WalletAddress){
        let balance = 0;
        
        this.blocks.forEach(block => {
            block.GetTransactions().forEach(transaction => {
                if(transaction.to === WalletAddress){
                    balance += parseFloat(transaction.amount);
                }else if(transaction.from === WalletAddress){
                    balance -= parseFloat(transaction.amount);
                }
            })
        })
        this.tempTransactions.forEach(transaction => {
            if(transaction.to === WalletAddress){
                balance += parseFloat(transaction.amount);
            }else if(transaction.from === WalletAddress){
                balance -= parseFloat(transaction.amount);
            }
        })
        return balance;
    }
}