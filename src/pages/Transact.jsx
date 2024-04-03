import { useEffect, useState } from "react"
import useAccount from "../hooks/useAccount"
import useUsers from "../hooks/useUsers";
import { formatNumberToCurrency } from "../utilities/utility";
import { SendRealCryptoCurrency } from "../utilities/cryptocurrency";
import { Footer } from "../components";
import { useNavigate } from "react-router-dom";

const Transact = () => {
    const navigate = useNavigate();
    const LoggedInUser = useAccount();
    const AllUsers = useUsers();
    const [active, setActive] = useState("send");
    const [selectedUser, setSelectedUser] = useState("");
    const [amount, setAmount] = useState(0);

    const handleAmountChange = (value, send = false) => {
        if(LoggedInUser.User.WalletBalance < value && send){
            setAmount(value)
            setTimeout(()=>{
                alert("Amount should not be greater than Wallet Balance");
                setAmount(LoggedInUser.User.WalletBalance)
            }, 200)
            return;
        }
        setAmount(value)
    }

    const handleSendCrypto = async () => {
        if(selectedUser === "") return;
        if(amount <= 0){
            alert("Send amount should be greater than 0")
            return;
        }

        await SendRealCryptoCurrency(LoggedInUser.WalletAddress, selectedUser, amount);
        setAmount(0)
        setSelectedUser("")
    }

    const handleRequestCrypto = async () => {
        if(selectedUser === "") return;
        if(amount <= 0){
            alert("Request amount should be greater than 0")
            return;
        }

        const totalCirculation = 10000;
        if(amount+parseFloat(LoggedInUser?.User?.WalletBalance) > totalCirculation){
            setAmount(totalCirculation - parseFloat(LoggedInUser?.User?.WalletBalance));
            alert("Request amount coudn't be more than 10,000 JHC (Total Tokens in Circulation)")
            return;
        }

        await SendRealCryptoCurrency(selectedUser, LoggedInUser.WalletAddress, amount);
        setAmount(0)
        setSelectedUser("")
    }


    useEffect(()=> {
        if(!LoggedInUser){
            navigate("/login")
        }
    })
    return (
        <div className="h-[100lvh] w-[100%]">
            <div className="w-[70%] md:w-[50%] relative left-[50%] translate-x-[-50%] top-[10vh] font-minecraft">
                <h1 className="text-center text-[1.2rem] md:text-[2rem] font-bold">Send or Receive Crypto</h1>
                <div className="grid grid-cols-2">
                    <button className={`w-100 p-2 text-center bg-blue-500 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:bg-slate-300 hover:text-blue-700 ${active==="send"&&"bg-gradient-to-r from-[#49FAAC] to-[#1A704C] "}`} onClick={()=>{setActive("send")}}>Send</button>
                    <button className={`w-100 p-2 text-center bg-blue-500 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:bg-slate-300 hover:text-blue-700 ${active==="receive"&&"bg-gradient-to-r from-[#49FAAC] to-[#1A704C] "}`} onClick={()=>{setActive("receive")}}>Receive</button>
                </div>
                <div className="border p-2 md:p-4">
                    <h2 className="text-center text-[1rem] md:text-[1.5rem]">{active==="send"?"Send Crypto":"Receive Crypto"}</h2>
                    <form>
                        {active==="send" && 
                            <>
                                <div className="w-100">
                                    <label>Send to</label>
                                    <select className="relative w-[100%] p-2 bg-slate-900 border-2 outline-none border-slate-600" value={selectedUser} onChange={(e)=> {setSelectedUser(e.target.value)}}>
                                        {
                                            AllUsers.map((user) => {
                                                if(user.WalletAddress !== LoggedInUser.WalletAddress)
                                                    return <option key={user.WalletAddress} value={user.WalletAddress}>{user.Username}</option>
                                            })
                                        }
                                        <option value={""} disabled>-</option>
                                    </select>
                                </div>
                                <div className="w-100">
                                    <label>Amount <a className="text-yellow-400">(Balance: &#8369; {formatNumberToCurrency(LoggedInUser?.User?.WalletBalance)})</a></label>
                                    <input className="relative w-[100%] p-2 bg-transparent border-2 outline-none border-slate-600" type="number" value={amount} onInput={(e)=> handleAmountChange(e.target.value, true)}/>
                                </div>
                                <div className="w-100 text-center place-items-center">
                                    <button className="w-1/2 border-2 mt-4" type="button" onClick={handleSendCrypto}>Send</button>
                                </div>
                            </>
                        }
                        {active==="receive" && 
                            <>
                                <div className="w-100">
                                    <label>Request from</label>
                                    <select className="relative w-[100%] p-2 bg-slate-900 border-2 outline-none border-slate-600" value={selectedUser} onChange={(e)=> {setSelectedUser(e.target.value)}}>
                                        {
                                            AllUsers.map((user) => {
                                                if(user.WalletAddress !== LoggedInUser.WalletAddress)
                                                    return <option key={user.WalletAddress} value={user.WalletAddress}>{user.Username}</option>
                                            })
                                        }
                                        <option value={"anyone"}>Anyone</option>
                                        <option value={""} disabled>-</option>
                                    </select>
                                </div>
                                <div className="w-100">
                                    <label>Amount <a className="text-yellow-400">(Balance: &#8369; {formatNumberToCurrency(LoggedInUser?.User?.WalletBalance)})</a></label>
                                    <input className="relative w-[100%] p-2 bg-transparent border-2 outline-none border-slate-600" type="number" value={amount} onInput={(e)=> handleAmountChange(e.target.value, false)}/>
                                </div>
                                <div className="w-100 text-center place-items-center">
                                    <button className="w-1/2 border-2 mt-4" type="button" onClick={handleRequestCrypto}>Request</button>
                                </div>
                            </>
                        }
                    </form>
                </div>
            </div>
            <Footer className="absolute bottom-0 text-center"/>
        </div>
    )
}

export default Transact