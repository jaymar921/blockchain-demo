import { useEffect, useState } from "react";
import useBlockchain from "./useBlockchain";

const useAccount = () => {
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("_account_loggedIn")));
    const blockchain = useBlockchain();

    useEffect(()=>{
        if(!account) return;

        account.User.WalletBalance = blockchain.getBalance(account.WalletAddress);
        setAccount(account);
        
    }, [account, blockchain])
    if(!account) return undefined;

    return account;
}

export default useAccount;