import { Sign, VerifySignature } from "./Cryptography";

export class Transaction{
    /**
     *  
     * @param {Number} amount Amount being transferred
     * @param {String} from Sender's Wallet Address
     * @param {String} to Receiver's Wallet Address
     */
    constructor(amount, from, to){
        this.amount = amount;
        this.from = from;
        this.to = to;
        this.timestamp = new Date();
        this.signature = "";
    }

    sign(privateKey){
        const data = {
            amount: this.amount,
            from: this.from,
            to: this.to,
            timestamp: this.timestamp
        }
        Sign(privateKey, data).then((s) => {
            this.signature = s;
        });
    }

    async verify(publicKey){
        const data = {
            amount: this.amount,
            from: this.from,
            to: this.to,
            timestamp: this.timestamp
        }
        return await VerifySignature(publicKey, data);
    }
}