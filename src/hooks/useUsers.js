import { useEffect, useState } from "react"
import { LoadUsers } from "../utilities/datahandler";

const useUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        const intervalId = setInterval(() => {
            setUsers(LoadUsers())
        },500);

        return () => {clearInterval(intervalId)};
    }, [])
    return users;
}

export default useUsers;