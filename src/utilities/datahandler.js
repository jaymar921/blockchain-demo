import { Account } from "../classes/Account";

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