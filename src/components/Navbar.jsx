import { NavLink } from "react-router-dom"
import { jh_logo } from "../assets"
import useAccount from "../hooks/useAccount"
import { useEffect } from "react";
import { InitializeBlockChain } from "../utilities/cryptocurrency";

const Navbar = () => {
    const LoggedInAccount = useAccount();
    
    useEffect(()=> {
        (async()=>{
            setTimeout(async ()=>{
                console.log("loading")
                await InitializeBlockChain()
            }, 300)
        })();
    }, [])
    return (
        <header className="flex justify-between items-center sm:px-16 px-8 py-4 max-w-5xl mx-auto absolute top-0 bg-transparent z-10 right-0 left-0">
            <NavLink to="/" className="w-12 h-12 bg-transparent flex items-center justify-center flex-bold shadow-md border-[1px] p-1 rounded-lg border-cyan-500"><img src={jh_logo}/></NavLink>
            <nav className="flex text-lg gap-7 font-medium">
                <NavLink to="/buy" className={({ isActive }) => isActive ? "text-green-500" : "text-white"}><i className="fa-solid fa-coins"></i><p className="ml-2 hidden sm:inline-flex">Buy JHC</p></NavLink>
                <NavLink to="/blockchain" className={({ isActive }) => isActive ? "text-green-500" : "text-white"}><i className="fa-solid fa-cubes"></i><p className="ml-2 hidden sm:inline-flex">Blockchain</p></NavLink>
                
                {LoggedInAccount?
                <NavLink to="/account" className={({ isActive }) => isActive ? "text-green-500" : "text-white"}>{LoggedInAccount.Username}</NavLink>:
                <NavLink to="/login" className={({ isActive }) => isActive ? "text-green-500" : "text-white"}>Login</NavLink>}
            </nav>
        </header>
    )
    }

export default Navbar