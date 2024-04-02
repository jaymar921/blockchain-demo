import { useEffect } from "react"
import useAccount from "../hooks/useAccount"

const Transact = () => {
    const LoggedInUser = useAccount();
    useEffect(()=> {
        if(!LoggedInUser){
            window.location.href = "/login"
        }
    })
    return (
        <div>Transact</div>
    )
}

export default Transact