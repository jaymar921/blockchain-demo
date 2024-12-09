import { useEffect, useState } from "react";
import { loadBlockchain } from "../utilities/datahandler";
import { BlockChain } from "../objects/BlockChain";
import { IsMobile } from "../utilities/utility";

const useBlockchain = () => {
    const [blockchain, setBlockchain] = useState(new BlockChain());
    
    useEffect(()=>{
        const intervalId = setInterval(async ()=> {
            const blockchaindata = await loadBlockchain(IsMobile()?2:3, 5, false, true);
            if(blockchaindata)
                setBlockchain(blockchaindata)
        }, 1000)
        return () => {clearInterval(intervalId)};
    }, [])

    return blockchain;
}

export default useBlockchain;