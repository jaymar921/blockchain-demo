import { NavLink } from "react-router-dom"
import { jh_logo } from "../assets"
import useAccount from "../hooks/useAccount"
import { useEffect, useState } from "react";
import { InitializeBlockChain } from "../utilities/cryptocurrency";
import { LockBlockchain } from "../utilities/datahandler";

const Navbar = ({showNotifications}) => {
    const LoggedInAccount = useAccount();
    const [loaded, setLoaded] = useState(true);
    const [notifChecked, setNotifChecked] = useState(true);

    const toggleNotif = (e) => {
        setNotifChecked(e);
        if(showNotifications){
            showNotifications(e);
        }
    }
    
    useEffect(()=> {
        LockBlockchain(true);
        InitializeBlockChain(loaded)
        setLoaded(false);
    }, [])
    return (
        <header className="flex justify-between items-center sm:px-16 px-8 py-4 max-w-5xl mx-auto absolute top-0 bg-transparent z-10 right-0 left-0">
            <NavLink to="/" className="w-12 h-12 bg-transparent flex items-center justify-center flex-bold shadow-md border-[1px] p-1 rounded-lg border-cyan-500"><img src={jh_logo}/></NavLink>
            <nav className="flex text-lg gap-7 font-medium">
                <NavLink to="/transact" className={({ isActive }) => isActive ? "text-green-500" : "text-white"}><i className="fa-solid fa-coins"></i><p className="ml-2 hidden sm:inline-flex">Transact</p></NavLink>
                <NavLink to="/blockchain" className={({ isActive }) => isActive ? "text-green-500" : "text-white"}><i className="fa-solid fa-cubes"></i><p className="ml-2 hidden sm:inline-flex">Blockchain</p></NavLink>
                
                {LoggedInAccount?
                <NavLink to="/account" className={({ isActive }) => isActive ? "text-green-500" : "text-white"}>{LoggedInAccount.Username}</NavLink>:
                <NavLink to="/login" className={({ isActive }) => isActive ? "text-green-500" : "text-white"}>Login</NavLink>}
                <div className="flex flex-row items-center justify-center bg-transparent">
                    <i className="fa-solid fa-bell mr-2 hidden md:block"></i>
                    <div className="flex flex-col items-center justify-center bg-transparent">
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input id="switch-3" type="checkbox" className="peer sr-only" checked={notifChecked} onChange={(e)=>toggleNotif(e.target.checked)}/>
                            <label htmlFor="switch-3" className="hidden"></label>
                            <div className="peer h-2 w-8 rounded border bg-slate-500 after:absolute after:-top-1 after:left-0 after:h-4 after:w-4 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
                            
                        </label>
                    </div>
                </div>
            </nav>
        </header>
    )
    }

export default Navbar