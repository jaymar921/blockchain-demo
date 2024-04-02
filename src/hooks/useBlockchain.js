import { useEffect, useState } from "react";
import { loadBlockchain } from "../utilities/datahandler";
import { BlockChain } from "../objects/BlockChain";

const useBlockchain = () => {
    const [blockchain, setBlockchain] = useState(new BlockChain());
    
    useEffect(()=>{
        const intervalId = setInterval(async ()=> {
            const blockchaindata = await loadBlockchain(4, 5, false, true);
            if(blockchaindata)
                setBlockchain(blockchaindata)
        }, 500)
        return () => {clearInterval(intervalId)};
    }, [])

    return blockchain;
}

export default useBlockchain;