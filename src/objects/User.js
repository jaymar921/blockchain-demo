import { GenerateKey, sha256HashObject } from "./Cryptography";

export class User{
    constructor(fullname){
        this.Fullname = fullname;
        this.WalletBalance = 0;
        this.WalletAddress = undefined;
        this.PrivateKey = undefined;
        this.PublicKey = undefined;

        // Generate Keys asynchronously
        this.GenerateKeys();
    }

    async GenerateKeys(){
        const keys = await GenerateKey();
        this.PrivateKey = keys.privateKey;
        this.PublicKey = keys.publicKey;
        this.WalletAddress = await sha256HashObject(Math.random * 99999);
    }
}