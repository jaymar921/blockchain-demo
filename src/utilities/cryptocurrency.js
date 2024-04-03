import { notifications } from "@mantine/notifications";
import { Account } from "../classes/Account";
import { sha256HashObject } from "../objects/Cryptography";
import { Transaction } from "../objects/Transaction";
import { User } from "../objects/User";
import { BlockchainLocked, GetPendingTransaction, LoadUsers, LockBlockchain, SendPendingTransaction, getAccountByUsername, getAccountByWalletAddress, loadBlockchain, saveAccount, saveBlockchain } from "./datahandler";
import { IsMobile, getRandomIntInclusive } from "./utility";
import { BlockChain } from "../objects/BlockChain";

export const InitializeBlockChain = async (start = false) => {
    if(start){
        notifications.show({
            title: "System",
            message: `Initializing Blockchain`,
            color: 'green',
        });
        localStorage.removeItem("_blockchain")
        console.log("Initializing Blockchain")
        await InitializeUsers();
        const blockchain = await loadBlockchain(IsMobile()?2:4, 5, true);
        if(blockchain.GetLastBlock().ID === 1){
            // first transaction, we give 1000JHC Token to "Jaymar-JHC"
            const JaymarJHCWalletAddress = getAccountByUsername("jaymar921-JHC").WalletAddress;
            const transaction_1 = new Transaction(5000, "", JaymarJHCWalletAddress);
            transaction_1.signature = "System Generated"
            notifications.show({
                title: "Transaction [System]",
                message: `System sent 1000JHC to jaymar921-JHC [for circulation]`,
                style: { width: '100'}
            });
            const MikaPikaChu921WalletAddress = getAccountByUsername("MikaPikaChu921").WalletAddress;
            const transaction_2 = new Transaction(5000, "", MikaPikaChu921WalletAddress);
            transaction_2.signature = "System Generated"
            notifications.show({
                title: "Transaction [System]",
                message: `System sent 1000JHC to MikaPikaChu921 [for circulation]`,
                style: { width: '100'}
            });
        
            await blockchain.addTransaction(transaction_1);
            await blockchain.addTransaction(transaction_2);
            
            saveBlockchain(blockchain)
            LockBlockchain(false)
        }
        
        console.log("simulate transactions")
        await blockchain.RunAutoMiner();
        
        await SimulateCirculation(blockchain, 9999)
        
    }
}

/**
 * 
 * @param {BlockChain} blockchain 
 */
const SimulateCirculation = async (blockchain, limit = 10) => {
    const users = LoadUsers(); // load users
    const loggedInUser = JSON.parse(localStorage.getItem("_account_loggedIn"));
    console.info("DOING SIMULATION")
    
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
        let userWalletAddress = users[getRandomIntInclusive(0, users.length-1)].WalletAddress;
        let user2WalletAddress = users[getRandomIntInclusive(0, users.length-1)].WalletAddress;

        // If you're the logged in user, we should let you send money by your own
        if(loggedInUser && loggedInUser.WalletAddress === userWalletAddress){
            return;
        }

        // 0% chance to receive money from unknown user (maybe they sent by mistake?)
        if(loggedInUser && loggedInUser.WalletAddress === user2WalletAddress){
            return;
        }

        // priority pending transaction
        const pendingTransaction = GetPendingTransaction();
        if(pendingTransaction){
            const selectedUser = users[getRandomIntInclusive(0, users.length-1)];
            if(pendingTransaction.from === "anyone") pendingTransaction.from = selectedUser.WalletAddress;
            let success = await SendCryptoCurrency(blockchain, pendingTransaction.from, pendingTransaction.to, pendingTransaction.amount, true, true);
            if(success){ 
                limit--;
                
                saveBlockchain(blockchain)
            }
        }

        if(userWalletAddress !== user2WalletAddress){
            let success = await SendCryptoCurrency(blockchain, userWalletAddress, user2WalletAddress, getRandomIntInclusive(1,blockchain.getBalance(userWalletAddress)), false);
            if(success){ 
                limit--;
            }
            else return;
        }

        // save block chain
        saveBlockchain(blockchain)
        if(BlockchainLocked())
            LockBlockchain(false)
    }, 1000);
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

    // Dummy Account 9
    const _userData_9 = new User("Alyssa");
    await _userData_9.GenerateKeys();
    const account_9 = new Account()
    account_9.construct(_userData_9, "jumapaoA", await sha256HashObject("P@ssw0rd"));

    // Dummy Account 10
    const _userData_10 = new User("Ada Pauline");
    await _userData_10.GenerateKeys();
    const account_10 = new Account()
    account_10.construct(_userData_10, "adavillacarlos", await sha256HashObject("P@ssw0rd"));

    // Dummy Account 11
    const _userData_11 = new User("Nathaniel");
    await _userData_11.GenerateKeys();
    const account_11 = new Account()
    account_11.construct(_userData_11, "natnat1432", await sha256HashObject("P@ssw0rd"));

    // Save accounts
    saveAccount(account_1);
    saveAccount(account_2);
    saveAccount(account_3);
    saveAccount(account_4);
    saveAccount(account_5);
    saveAccount(account_6);
    saveAccount(account_7);
    saveAccount(account_8);
    saveAccount(account_9);
    saveAccount(account_10);
    saveAccount(account_11);

}

/**
 * 
 * @param {BlockChain} blockchain 
 * @param {String} fromWalletAddress 
 * @param {String} toWalletAddress 
 * @param {Number} amount 
 */
export const SendCryptoCurrency = async (blockchain, fromWalletAddress, toWalletAddress, amount, waitTillFilled, showWarning = false) => {
    let senderBalance = blockchain.getBalance(fromWalletAddress);
    const loggedInUser = JSON.parse(localStorage.getItem("_account_loggedIn"));
    if(senderBalance < amount){
        if(waitTillFilled && loggedInUser){
            if(senderBalance > 0){
                const newRequest = amount - senderBalance;
                amount = senderBalance;
                await SendRealCryptoCurrency(fromWalletAddress, toWalletAddress, newRequest);
            }else{ 
                await SendRealCryptoCurrency("anyone", toWalletAddress, amount);
                return false;
            }
        }else{
            if(showWarning)
                alert(`Sender has insufficient fund`)
            return false;
        }
    }

    const sender = getAccountByWalletAddress(fromWalletAddress);
    const receiver = getAccountByWalletAddress(toWalletAddress);

    if(sender.WalletAddress === receiver.WalletAddress){
        await SendRealCryptoCurrency("anyone", toWalletAddress, amount);
        return false;
    }

    // create transaction
    const transaction = new Transaction(amount, fromWalletAddress, toWalletAddress);
    await transaction.sign(sender.User.PrivateKey);

    if(loggedInUser){
        if(loggedInUser.WalletAddress === sender.WalletAddress){
            
            notifications.show({
                title: "Transaction",
                message: `You sent ${amount}JHC to ${receiver.Username}`,
                color: 'red',
            });
        }else if(loggedInUser.WalletAddress === receiver.WalletAddress){
            notifications.show({
                title: "Transaction",
                message: `You received ${amount}JHC from ${sender.Username}`,
                color: 'red',
            });
        }else{
            notifications.show({
                title: "Transaction",
                message: `${sender.Username} sent ${amount}JHC to ${receiver.Username}`,
            }); 
        }
    }else{
        
        notifications.show({
            title: "Transaction",
            message: `${sender.Username} sent ${amount}JHC to ${receiver.Username}`,
        });
    }

    // add transaction to the blockchain
    if(showWarning){
        //console.log(transaction)
    }
    await blockchain.addTransaction(transaction);
    return true;
}

/**
 * 
 * @param {BlockChain} blockchain 
 * @param {Transaction} transaction 
 * @returns 
 */
export const SendRealCryptoCurrency = async (from, to, amount) => {
    
    const sender = getAccountByWalletAddress(from);
    const transaction = new Transaction(amount, from, to);
    if(sender){
        await transaction.sign(sender.User.PrivateKey);
    }
    SendPendingTransaction(transaction);
}
