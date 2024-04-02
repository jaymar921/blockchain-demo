import { Account } from "../classes/Account";
import { BlockChain } from "../objects/BlockChain"
import { sha256HashObject } from "../objects/Cryptography";
import { Transaction } from "../objects/Transaction";
import { User } from "../objects/User";
import { getAccountByUsername, getAccountByWalletAddress, loadBlockchain, saveAccount, saveBlockchain } from "./datahandler";
import { getRandomIntInclusive } from "./utility";

export const InitializeBlockChain = async () => {
    await InitializeUsers();
    const blockchain = await loadBlockchain(2, 5);
    if(blockchain.GetLastBlock().ID === 1){

        // first transaction, we give 1000JHC Token to "Jaymar-JHC"
        const JaymarJHCWalletAddress = getAccountByUsername("jaymar921-JHC").WalletAddress;
        const transaction_1 = new Transaction(1000, "", JaymarJHCWalletAddress);
    
        await blockchain.addTransaction(transaction_1);
    
        console.log("simulate transactions")
        await SimulateCirculation(blockchain, JaymarJHCWalletAddress)
    }
}

/**
 * 
 * @param {BlockChain} blockchain 
 * @param {String} JaymarJHCWalletAddress 
 */
const SimulateCirculation = async (blockchain, JaymarJHCWalletAddress) => {
    const users = await InitializeUsers(); // load users
    let limit = 10
    
    // circulation
    // await SendCryptoCurrency(blockchain, JaymarJHCWalletAddress, users[1].WalletAddress, 50);
    // await SendCryptoCurrency(blockchain, JaymarJHCWalletAddress, users[2].WalletAddress, 5);
    // await SendCryptoCurrency(blockchain, JaymarJHCWalletAddress, users[3].WalletAddress, 8);
    // await SendCryptoCurrency(blockchain, JaymarJHCWalletAddress, users[5].WalletAddress, 2);
    
    const intervalId = setInterval(async () => {
        if(limit <= 0){
            clearInterval(intervalId);
            return;
        }
        // do transaction every second, circulate the balance
        let userWalletAddress = JaymarJHCWalletAddress;
        let user2WalletAddress = JaymarJHCWalletAddress;
        if(Math.random() <= 0.8){
            userWalletAddress = users[getRandomIntInclusive(0, users.length-1)].WalletAddress;
        }
        if(Math.random() <= 0.8){
            user2WalletAddress = users[getRandomIntInclusive(0, users.length-1)].WalletAddress;
        }

        if(userWalletAddress !== user2WalletAddress){
            let success = await SendCryptoCurrency(blockchain, userWalletAddress, user2WalletAddress, getRandomIntInclusive(1,50));
            if(success) limit--;
            else return;
        }

        // save block chain
        saveBlockchain(blockchain)
    }, 50);

}


export const InitializeUsers = async () => {
    // Dummy Account 1
    const _userData_1 = new User("Jaymar-JHC");
    await _userData_1.GenerateKeys();
    const account_1 = new Account()
    account_1.construct(_userData_1, "jaymar921-JHC", await sha256HashObject("P@ssw0rd"));

    // Dummy Account 2
    const _userData_2 = new User("Pia");
    await _userData_2.GenerateKeys();
    const account_2 = new Account()
    account_2.construct(_userData_2, "MikaPikaChu921", await sha256HashObject("P@ssw0rd"));

    // Dummy Account 3
    const _userData_3 = new User("Raph Jess");
    await _userData_3.GenerateKeys();
    const account_3 = new Account()
    account_3.construct(_userData_3, "raisondetre1207", await sha256HashObject("P@ssw0rd"));

    // Dummy Account 4
    const _userData_4 = new User("Trisha");
    await _userData_4.GenerateKeys();
    const account_4 = new Account()
    account_4.construct(_userData_4, "takiii20", await sha256HashObject("P@ssw0rd"));

    // Dummy Account 5
    const _userData_5 = new User("James");
    await _userData_5.GenerateKeys();
    const account_5 = new Account()
    account_5.construct(_userData_5, "criticalzero123", await sha256HashObject("P@ssw0rd"));

    // Dummy Account 6
    const _userData_6 = new User("Xerxes");
    await _userData_6.GenerateKeys();
    const account_6 = new Account()
    account_6.construct(_userData_6, "extella", await sha256HashObject("P@ssw0rd"));

    // Dummy Account 7
    const _userData_7 = new User("Kenneth");
    await _userData_7.GenerateKeys();
    const account_7 = new Account()
    account_7.construct(_userData_7, "kinloveko", await sha256HashObject("P@ssw0rd"));

    // Dummy Account 8
    const _userData_8 = new User("Harold");
    await _userData_8.GenerateKeys();
    const account_8 = new Account()
    account_8.construct(_userData_8, "ha-rold1999", await sha256HashObject("P@ssw0rd"));

    // Save accounts
    saveAccount(account_1);
    saveAccount(account_2);
    saveAccount(account_3);
    saveAccount(account_4);
    saveAccount(account_5);
    saveAccount(account_6);
    saveAccount(account_7);
    saveAccount(account_8);

    return [account_1, account_2, account_3, account_4, account_5, account_6, account_7, account_8]
}

/**
 * 
 * @param {BlockChain} blockchain 
 * @param {String} fromWalletAddress 
 * @param {String} toWalletAddress 
 * @param {Number} amount 
 */
export const SendCryptoCurrency = async (blockchain, fromWalletAddress, toWalletAddress, amount, showWarning = false) => {
    let senderBalance = blockchain.getBalance(fromWalletAddress);

    if(senderBalance <= amount){
        if(showWarning)
            alert(`Sender has insufficient fund`)
        return false;
    }

    const sender = getAccountByWalletAddress(fromWalletAddress);
    const receiver = getAccountByWalletAddress(toWalletAddress);

    // create transaction
    const transaction = new Transaction(amount, fromWalletAddress, toWalletAddress);
    await transaction.sign(sender.User.PrivateKey);

    console.log(`${sender.Username} sent ${amount}JHC to ${receiver.Username}`)

    // add transaction to the blockchain
    await blockchain.addTransaction(transaction);
    return true;
}