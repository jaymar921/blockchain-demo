import { useNavigate } from "react-router-dom";
import { Footer } from "../components";
import useAccount from "../hooks/useAccount"
import { LogoutLocal } from "../utilities/accounthandler";
import { formatNumberToCurrency } from "../utilities/utility";

const Account = () => {
    const navigate = useNavigate();
    const LoggedInAccount = useAccount()

    const HandleLogout = () => {
        LogoutLocal()
        navigate("/")
    }

    const TransactionPage = () => {
        navigate("/transact");
    }

    if(!LoggedInAccount){
        HandleLogout();
        return;
    }

    const Clipboard = async (item) => {
        let text_data = LoggedInAccount[item];
        if(item === "PrivateKey"){
            text_data = LoggedInAccount.User.PrivateKey; 
        }
        if(item === "PublicKey"){
            text_data = LoggedInAccount.User.PublicKey; 
        }
        var data = [new ClipboardItem({ "text/plain": Promise.resolve(new Blob([text_data], { type: "text/plain" }))})];
        navigator.clipboard.write(data).then(function() {
            console.log("Copied to clipboard successfully!");
            alert("Wallet Address copied to clipboard")
        }, function() {
            console.error("Unable to write to clipboard. :-(");
        });
    }
    return (
        <div className="relative w-[100lvw] h-[100lvh]">
            <div className="border w-[350px] md:w-[450px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-minecraft">
                <h1 className="text-center text-[2rem] mt-8">Account</h1>
                <div className="px-8 m-2">
                    <p className="text-[0.7rem] sm:text-[1rem]">Balance</p>
                    <p className="text-[0.7rem] sm:text-[1rem] border p-2 rounded-md text-center text-slate-400 relative">&#8369; {formatNumberToCurrency(LoggedInAccount.User.WalletBalance)} <a className="absolute right-2 text-[#Ffad00] text-[0.8rem] sm:text-[1.2rem] hover:cursor-pointer" onClick={TransactionPage} title="Request"><i className="fa-regular fa-square-plus"></i></a></p>
                </div>
                <div className="px-8 m-2">
                    <p className="text-[0.7rem] sm:text-[1rem]">Fullname</p>
                    <p className="text-[0.7rem] sm:text-[1rem] border p-2 rounded-md text-center text-slate-400">{LoggedInAccount.Fullname}</p>
                </div>
                <div className="px-8 m-2">
                    <p className="text-[0.7rem] sm:text-[1rem]">Username</p>
                    <p className="text-[0.7rem] sm:text-[1rem] border p-2 rounded-md text-center text-slate-400">{LoggedInAccount.Username}</p>
                </div>
                <div className="px-8 m-2">
                    <p className="text-[0.7rem] sm:text-[1rem]">Wallet Address <a className="hover:cursor-pointer" onClick={() => Clipboard("WalletAddress")}><i className="fa-solid fa-copy"></i></a></p>
                    <div className="">
                        <p className="text-[0.7rem] sm:text-[1rem] border p-2 rounded-md text-center text-slate-400 truncate " title={LoggedInAccount.WalletAddress}>{LoggedInAccount.WalletAddress}</p>
                    </div>
                </div>
                <div className="px-8 m-2">
                    <p className="text-[0.7rem] sm:text-[1rem]">Private Key <a className="hover:cursor-pointer" onClick={() => Clipboard("PrivateKey")}><i className="fa-solid fa-copy"></i></a></p>
                    <div className="">
                        <p className="text-[0.7rem] sm:text-[1rem] border p-2 rounded-md text-center text-slate-400 truncate " title={LoggedInAccount.User.PrivateKey}>{LoggedInAccount.User.PrivateKey}</p>
                    </div>
                </div>
                <div className="px-8 m-2">
                    <p className="text-[0.7rem] sm:text-[1rem]">Public Key <a className="hover:cursor-pointer" onClick={() => Clipboard("PublicKey")}><i className="fa-solid fa-copy"></i></a></p>
                    <div className="">
                        <p className="text-[0.7rem] sm:text-[1rem] border p-2 rounded-md text-center text-slate-400 truncate " title={LoggedInAccount.User.PublicKey}>{LoggedInAccount.User.PublicKey}</p>
                    </div>
                </div>
                <div className="px-8 m-8 text-center">
                    <button className="border w-1/2 p-1 rounded-lg hover:bg-slate-800" onClick={HandleLogout}>Logout</button>
                </div>
            </div>
            <Footer className="absolute text-center bottom-0" />
        </div>
    )
}

export default Account