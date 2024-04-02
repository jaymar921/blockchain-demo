import { useState } from "react"
import { Footer } from "../components"
import { User } from "../objects/User";
import { Account } from "../classes/Account";
import { sha256HashObject } from "../objects/Cryptography";
import { saveAccount } from "../utilities/datahandler";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate()
    const [inputFields, setInputFields] = useState({fullname: "", username: "", password: ""});
    const [submitting, setSubmitting] = useState(false);


    const RedirectToLogin = () => {
        navigate("/login")
    }

    const updateField = (field, value) => {
        inputFields[field] = value;
        setInputFields({...inputFields})
    }

    const handleRegistration = async () => {
        // validate all fields
        if(inputFields.fullname.length < 3){
            alert("Fullname must not be less than 3 in length")
            return;
        }

        if(inputFields.username.length < 5){
            alert("Username must not be less than 5 in length")
            return;
        }

        if(inputFields.password.length < 5){
            alert("Password must not be less than 5 in length")
            return;
        }
        
        setSubmitting(true)
        const {fullname, username, password} = inputFields;
        const _userData = new User(fullname);
        await _userData.GenerateKeys();

        const account = new Account()
        account.construct(_userData, username, await sha256HashObject(password));

        saveAccount(account)
        setSubmitting(false)
        navigate("/login")
    }
    return (
        <section className="relative flex w-[100%] max-container h-[100lvh]">
            <div className="relative left-[50%] translate-x-[-50%]">
                
                <div className="border p-4 rounded-lg w-[300px] relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-minecraft">
                    <form>
                        <h2 className="text-center text-[30px] font-bold mb-4">Login</h2>
                        <label className="w-[100%]">Fullname</label>
                        <input className="w-[100%] p-2 rounded-md outline-none bg-transparent border border-slate-500 my-2" type="text" placeholder="Fullname" value={inputFields.fullname} onInput={(e) => updateField("fullname", e.target.value)}/>
                        <label className="w-[100%]">Username</label>
                        <input className="w-[100%] p-2 rounded-md outline-none bg-transparent border border-slate-500 my-2" type="text" placeholder="Username" value={inputFields.username} onInput={(e) => updateField("username", e.target.value)}/>
                        <label className="w-[100%]">Password</label>
                        <input className="w-[100%] p-2 rounded-md outline-none bg-transparent border border-slate-500 my-2" type="password" placeholder="Password" value={inputFields.password} onInput={(e) => updateField("password", e.target.value)}/>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                            <button type="button" className={`border w-100 p-1 rounded-lg col-span-1 hover:bg-slate-800 ${submitting?"bg-slate-800":""}`} onClick={handleRegistration} disabled={submitting}>Register</button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-2">
                            <button type="button" className="w-100 p-1 rounded-lg col-span-1 hover:text-gray-300" onClick={RedirectToLogin}>Already have an account?</button>
                        </div>
                        
                    </form>
                </div>
            </div>
            <Footer className="absolute bottom-0 text-center" />
        </section>
    )
}

export default Register