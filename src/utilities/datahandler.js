import { Account } from "../classes/Account";
import { Block } from "../objects/Block";
import { BlockChain } from "../objects/BlockChain";
import { Transaction } from "../objects/Transaction";

/**
 * 
 * @param {Account} account 
 */
export const saveAccount = (account) => {
    if(!(account instanceof Account)){
        console.error("Parameter is not an instance of Account")
        return false;
    }
    // save to localstorage
    const accsArray = JSON.parse(localStorage.getItem("_accounts") ?? "[]");
    for(const _account of accsArray){
        if(_account.Username.toLocaleLowerCase() === account.Username.toLocaleLowerCase()){
            return false;
        }
    }
    accsArray.push(account);

    const accountsJson = JSON.stringify(accsArray);

    localStorage.setItem("_accounts", accountsJson);
    return true;
}

/**
 * 
 * @param {String} username 
 * @param {String} password 
 */
export const getAccount = (username, password) => {
    let _userAccount = undefined;

    const accsArray = JSON.parse(localStorage.getItem("_accounts") ?? "[]");
    if(!(accsArray instanceof Array)) return _userAccount;

    for(const account of accsArray){
        if(account.Username.toLocaleLowerCase() === username.toLocaleLowerCase() && account.Password === password){
            _userAccount = account;
            break;
        }
    }

    return _userAccount;
}

/**
 * 
 * @param {String} username 
 * @returns {Account | undefined}
 */
export const getAccountByUsername = (username) => {
    let _userAccount = undefined;

    const accsArray = JSON.parse(localStorage.getItem("_accounts") ?? "[]");
    if(!(accsArray instanceof Array)) return _userAccount;

    for(const account of accsArray){
        if(account.Username.toLocaleLowerCase() === username.toLocaleLowerCase()){
            _userAccount = account;
            break;
        }
    }

    return _userAccount;
}

/**
 * 
 * @param {String} WalletAddress 
 * @returns {Account | undefined}
 */
export const getAccountByWalletAddress = (WalletAddress) => {
    let _userAccount = undefined;

    const accsArray = JSON.parse(localStorage.getItem("_accounts") ?? "[]");
    if(!(accsArray instanceof Array)) return _userAccount;

    for(const account of accsArray){
        if(account.WalletAddress === WalletAddress){
            _userAccount = account;
            break;
        }
    }

    return _userAccount;
}

/**
 * 
 * @param {BlockChain} blockchain 
 */
export const saveBlockchain = (blockchain) => {
    localStorage.setItem("_blockchain", JSON.stringify(blockchain));
}

/**
 * 
 * @returns {BlockChain}
 */
export const loadBlockchain = async (difficulty, blockTransactionSize, forceLoad, suppressLogs = false) => {
    if(BlockchainLocked() && !forceLoad){
        console.log("Blockchain locked")
        return undefined
    }
    const blockchain = new BlockChain();
    if(!suppressLogs)
        console.log("Loading blockchain from localstorage")
    const data = JSON.parse(localStorage.getItem("_blockchain") ?? JSON.stringify(blockchain));
    
    if(!suppressLogs)
        console.log("copying data")
    blockchain.difficulty = difficulty ?? data.difficulty;
    blockchain.blockTransactionSize = blockTransactionSize ?? data.blockTransactionSize;
    blockchain.tempTransactions = [];
    blockchain.isMining = data.isMining;

    if(!suppressLogs)
        console.log("copying blocks")
    for(const block of data.blocks){
        const bk = new Block();
        bk.ID = block.ID;
        bk.Nonce = block.Nonce;
        bk.Hash = block.Hash;
        bk.PreviousHash = block.PreviousHash;

        for(const tr of block.Transactions){
            const transaction = new Transaction(tr.amount, tr.from, tr.to);
            transaction.timestamp = tr.timestamp;
            transaction.signature = tr.signature;
            bk.AddTransaction(transaction);
        }
        blockchain.blocks.push(bk);
    }

    if(!suppressLogs)
        console.log("copying transactions")
    for(const tran of data.tempTransactions){
        const transaction = new Transaction(tran.amount, tran.from, tran.to);
        transaction.timestamp = tran.timestamp;
        transaction.signature = tran.signature;
        blockchain.tempTransactions.push(transaction);
    }

    if(blockchain.blocks.length === 0){
        await blockchain.AddGenesisBlock();
    }
    
    if(!suppressLogs)
        console.log("blockchain loaded")
    return blockchain;
}

export const LoadUsers = () => {
    let allUsers = [];

    const accsArray = JSON.parse(localStorage.getItem("_accounts") ?? "[]");
    if(!(accsArray instanceof Array)) return allUsers;

    for(const account of accsArray){
        allUsers.push(account);
    }

    return allUsers;
}

export const BlockchainLocked = () => {
    return localStorage.getItem("_blockchainLOCK");
}

export const LockBlockchain = (lock) => {
    if(lock){
        console.info("Locking Blockchain")
        localStorage.setItem("_blockchainLOCK", true)
    }else{
        console.info("Unlocking Blockchain")
        localStorage.removeItem("_blockchainLOCK")
    }
}

/**
 * 
 * @returns {Transaction | undefined}
 */
export const GetPendingTransaction = () => {
    const json = localStorage.getItem("_pendingTransaction");
    if(!json) return undefined;
    const data = JSON.parse(json);

    const transaction = new Transaction(data.amount, data.from, data.to);
    transaction.timestamp = data.timestamp;
    transaction.signature = data.signature;

    localStorage.removeItem("_pendingTransaction")

    return transaction;
}


export const SendPendingTransaction = (transaction) => {
    localStorage.setItem("_pendingTransaction", JSON.stringify(transaction));
}