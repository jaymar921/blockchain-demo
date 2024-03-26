export class Block{
    constructor(ID = 0, Transactions = [], PreviousHash = undefined){
        this.ID = ID;
        this.Nonce = Math.random() * 100000;
        this.Transactions = Transactions;
        this.Hash = undefined;
        this.PreviousHash = PreviousHash;
    }

    GetHash() {return this.Hash; }
    SetHash(H) {this.Hash = H;}
    GetNonce() {return this.Nonce;}
    SetNonce(N) {this.Nonce = N;}
    GetPreviousHash() {return this.PreviousHash;}
    SetPreviousHash(P) {this.PreviousHash = P;}
    GetTransactions() {return this.Transactions;}
    AddTransaction(Transaction) {this.Transactions.push(Transaction);}
}