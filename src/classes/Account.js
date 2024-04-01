import { User } from "../objects/User";

export class Account {
    constructor(){
        this.Fullname = undefined;
        this.Username = undefined;
        this.Password = undefined;
        this.WalletAddress = undefined;
        this.User = new User(undefined);
    }
    /**
     * 
     * @param {User} user 
     * @param {String} username
     * @param {String} password
     */
    construct(user, username, password){
        this.Fullname = user.Fullname;
        this.Username = username;
        this.Password = password;
        this.WalletAddress = user.WalletAddress;
        this.User = user;
    }
}