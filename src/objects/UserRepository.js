import { User } from "./User";

export class UserRepository{
    constructor(){
        this.users = [
            new User("Jayharron"),
            new User("Pia"),
            new User("Dylan"),
            new User("Xerxes"),
            new User("Harold"),
            new User("Raphael")
        ]
    }

    GetUser(fullname){
        return this.users.filter((u) => u.Fullname.toLowerCase() === fullname.toLowerCase())[0];
    }
}