const useAccount = () => {
    const account = localStorage.getItem("_account_loggedIn");

    if(!account) return undefined;
    return JSON.parse(account)
}

export default useAccount;