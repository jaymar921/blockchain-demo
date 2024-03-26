import { GenerateKey } from "./Cryptography";

export class User{
    constructor(fullname){
        this.Fullname = fullname;
        this.WalletBalance = 0;
        this.PrivateKey = undefined;
        this.PublicKey = undefined;

        // Generate Keys asynchronously
        this.GenerateKeys();
    }

    async GenerateKeys(){
        const keys = await GenerateKey();
        this.PrivateKey = keys.privateKey;
        this.PublicKey = keys.publicKey;
    }
}