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
    accsArray.push(account)

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