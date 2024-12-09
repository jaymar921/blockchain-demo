export class CryptoMarket{
    constructor(initialPrice = 1, totalSupply = 10_000, adjustmentPerCoin = 0.001) {
        this.InitialPrice = initialPrice;
        this.TotalSupply = totalSupply;
        this.AvailableCoins = totalSupply;
        this.AdjustmentPerCoin = adjustmentPerCoin;
    }
   /**
    * 
    * @param {Number} amount bought amount
    * @returns {Array} [
            success - fail,
            new price,
            market cap
        ]
    */
    buy(amount){
        if(amount > this.AvailableCoins) return [false, 0, 0];

        this.AvailableCoins -= amount;

        const newPrice = this.adjustPrice(this.InitialPrice, this.TotalSupply, this.AvailableCoins, this.AdjustmentPerCoin);
        return [true, newPrice, newPrice * this.TotalSupply];
    }

    /**
    * 
    * @param {Number} amount sold amount
    * @returns {Array} [
            success - fail,
            new price,
            market cap
        ]
    */
    sell(amount){
        if(amount > (this.TotalSupply - this.AvailableCoins)) return [false, 0, 0];

        this.AvailableCoins += amount;

        const newPrice = this.adjustPrice(this.InitialPrice, this.TotalSupply, this.AvailableCoins, this.AdjustmentPerCoin);
        return [true, newPrice, newPrice * this.TotalSupply];
    }

    getCurrentPrice(){
        return this.adjustPrice(this.InitialPrice, this.TotalSupply, this.AvailableCoins, this.AdjustmentPerCoin);
    }

    getMarketCapital(){
        return this.getCurrentPrice() * this.TotalSupply;
    }

    adjustPrice(initialPrice, totalSupply, availableCoins, adjustmentPerCoin){
        let coinsSold = totalSupply = availableCoins;
        let adjustmentFactor = adjustmentPerCoin * coinsSold;

        let newPrice = initialPrice * (1 + adjustmentFactor);

        const minPrice = 0.01;

        return newPrice < minPrice ? minPrice : newPrice;
    }

    save(override = false){
        if(!this.dataExist() || override){
            localStorage.setItem("crypto-market", JSON.stringify(this));
        }
    }

    dataExist(){
        return localStorage.getItem("crypto-market")
    }

    load(){
        if(!this.dataExist()) return;
        const market = JSON.parse(localStorage.getItem("crypto-market"));

        if(!market) this.save(true);

        this.InitialPrice = market.InitialPrice;
        this.TotalSupply = market.TotalSupply;
        this.AvailableCoins = market.AvailableCoins;
        this.AdjustmentPerCoin = market.AdjustmentPerCoin;
    }
}