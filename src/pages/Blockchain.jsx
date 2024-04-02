import { Footer } from "../components";
import useBlockchain from "../hooks/useBlockchain"
import { Block } from "../objects/Block";
import { getAccountByWalletAddress } from "../utilities/datahandler";

const Blockchain = () => {
    const blockchain = useBlockchain();

    /**
     * 
     * @param {Block} block 
     */
    const ValidBlock = (block) => {
        if(!new String(block.GetHash()).startsWith("00"))
            return false;
        if(!new String(block.GetPreviousHash()).startsWith("00"))
            return false;
        if((!blockchain.GetBlock(block.GetPreviousHash()) && !block.ID === 1))
            return false;
        return true;
    }
  return (
    <div className="relative flex lg:flex-row flex-col max-container h-[100%]">
        <div className="relative left-[50%] translate-x-[-50%] h-[100%] w-[95%] md:w-[550px] mt-[10lvh] font-minecraft overflow-hidden">
            
            <div className="h-[100%] p-2">
                <div className="px-2 mb-2">
                    <h1 className="text-center text-[1.2rem] md:text-[2rem] mt-2">Temporary Transactions</h1>
                    <p className="text-center text-blue-200">These transactions aren&apos;t stored in a block yet.</p>
                    <div className="h-[158px]">
                        <table className="table-fixed w-[100%] border">
                            <thead className="text-[0.8rem] md:text-[1rem]">
                                <th>Amount</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Timestamp</th>
                                <th>-</th>
                            </thead>
                            <tbody>
                            {blockchain.tempTransactions.map((tr) => 
                                <tr key={tr.timestamp + new String(Math.random()*999999)} className="text-center text-[0.8rem] md:text-[1rem]">
                                    <td>{tr.amount} JHC</td>
                                    <td className="truncate" title={tr.from}>{getAccountByWalletAddress(tr.from)?.Username ?? "System"}</td>
                                    <td className="truncate" title={tr.to}>{getAccountByWalletAddress(tr.to)?.Username ?? "System"}</td>
                                    <td title={new Date(tr.timestamp).toLocaleTimeString()}>{new Date(tr.timestamp).toLocaleDateString()}</td>
                                    <td title={`Signature: ${tr.signature}`}><i className="fa-solid fa-lock text-green-400"></i></td>
                                </tr>)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <h1 className="text-center text-[1.2rem] md:text-[2rem] mt-2">Blockchain <span title="Total number of blocks in the blockchain">[{blockchain.blocks.length}]</span></h1>
                <p className="text-center text-blue-200">Each block contains 5 transactions except for the <a className="text-yellow-400">Genesis Block</a>. To verify the block, the hash should start with three zeros &quot;000&quot; which means it&apos;s already been mined.</p>
                <hr className="mt-2" />
                <div className="overflow-y-scroll h-[500px]">
                    {
                        blockchain.blocks.map((block) =>  
                            <div key={block.GetHash() + new String(Math.random()*999999)} className="border border-dashed my-8">
                                <div className="p-2">
                                    <p>Block# {block.ID} {ValidBlock(block) ? <i title="This block is valid" className="fa-solid fa-check text-green-400"></i> : <i title="Mining Block... this will take sometime" className="fa-solid fa-list-check text-orange-400 fa-fade"></i>}</p>
                                    <p className="truncate" title={block.GetPreviousHash()}>Previous Hash: {block.GetPreviousHash()}</p>
                                    <p className="truncate" title={block.GetHash()}>Current Hash: {block.GetHash()}</p>
                                </div>
                                <div className="px-2 mb-2">
                                    <p className="text-center">Transactions</p>
                                    <table className="table-fixed w-[100%] border">
                                        <thead className="text-[0.8rem] md:text-[1rem]">
                                            <th>Amount</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Timestamp</th>
                                            <th>-</th>
                                        </thead>
                                        <tbody>
                                            {block.GetTransactions().map((tr) => 
                                                <tr key={tr.timestamp + new String(Math.random()*999999)} className="text-center text-[0.8rem] md:text-[1rem]">
                                                    <td>{tr.amount} JHC</td>
                                                    <td className="truncate" title={tr.from}>{getAccountByWalletAddress(tr.from)?.Username ?? "System"}</td>
                                                    <td className="truncate" title={tr.to}>{getAccountByWalletAddress(tr.to)?.Username ?? "System"}</td>
                                                    <td title={new Date(tr.timestamp).toLocaleTimeString()}>{new Date(tr.timestamp).toLocaleDateString()}</td>
                                                    <td title={`Signature: ${tr.signature}`}><i className="fa-solid fa-lock text-green-400"></i></td>
                                                </tr>    
                                            )}
                                            {block.GetTransactions().length === 0 ? <tr><td className="text-center" colSpan={5}>No transaction</td></tr>: ""}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                </div>
                <p className="text-center border-2 border-dashed border-red-200 p-2 rounded-lg mb-8">Data will be cleared once you refresh the page</p>
            </div>
            <Footer className="absolute text-center bottom-0" />
        </div>
        {/* {blockchain.blocks.map((b, index) => { return <div key={index}>
            <p>{b.GetHash()}</p>
        </div>})} */}
    </div>
  )
}

export default Blockchain