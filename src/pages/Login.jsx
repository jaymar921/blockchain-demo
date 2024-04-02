import { useState } from "react"
import { Footer } from "../components"
import { sha256HashObject } from "../objects/Cryptography"
import { getAccount } from "../utilities/datahandler"
import { LoginLocal } from "../utilities/accounthandler"

const Login = () => {
    const [inputFields, setInputFields] = useState({username: "", password: ""})

    const updateField = (field, value) => {
        inputFields[field] = value;
        setInputFields({...inputFields});
    }

    const handleLogin = async () => {
        // validate
        if(inputFields.username.length < 5){
            alert("Username must not be less than 5 in length")
            return;
        }

        if(inputFields.password.length < 5){
            alert("Password must not be less than 5 in length")
            return;
        }

        const {username, password} = inputFields;

        const passwordHash = await sha256HashObject(password);
        const account = getAccount(username, passwordHash);

        if(account === undefined){
            alert("Invalid Credentials")
            return;
        }

        LoginLocal(account);
        window.location.href = "/"
    }

    const RedirectToRegister = () => {
        window.location.href = "/register"
    }
  return (
    <section className="relative flex w-[100%] max-container h-[100lvh]">
        <div className="relative left-[50%] translate-x-[-50%]">
            
            <div className="border p-4 rounded-lg w-[300px] relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-minecraft">
                <form>
                    <h2 className="text-center text-[30px] font-bold mb-4">Login</h2>
                    <label className="w-[100%]">Username</label>
                    <input className="w-[100%] p-2 rounded-md outline-none bg-transparent border border-slate-500 my-2" autoComplete="username" type="text" placeholder="Username" value={inputFields.username} onInput={(e) => updateField("username", e.target.value)}/>
                    <label className="w-[100%]">Password</label>
                    <input className="w-[100%] p-2 rounded-md outline-none bg-transparent border border-slate-500 my-2" autoComplete="current-password" type="password" placeholder="Password" value={inputFields.password} onInput={(e) => updateField("password", e.target.value)}/>
                    <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="border w-100 p-1 rounded-lg col-span-1 hover:bg-slate-800" onClick={handleLogin}>Login</button>
                    <button type="button" className="border w-100 p-1 rounded-lg col-span-1 hover:bg-slate-800" onClick={RedirectToRegister}>Signup</button>
                    </div>
                </form>
            </div>
        </div>
        <Footer className="absolute bottom-0 text-center" />
    </section>
  )
}

export default Login