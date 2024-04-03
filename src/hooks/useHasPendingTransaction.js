import { useEffect, useState } from "react";

const useHasPendingTransaction = () => {
    const [hasPendingTransaction, setHasPendingTransaction] = useState(false);

    useEffect(()=> {
        const intervalId = setInterval(()=>{
            const pendingTransaction = localStorage.getItem("_pendingTransaction");
            if(pendingTransaction) setHasPendingTransaction(true);
            else setHasPendingTransaction(false);
        }, 500)

        return () => {clearInterval(intervalId)};
    }, [])
    return hasPendingTransaction;
}

export default useHasPendingTransaction;