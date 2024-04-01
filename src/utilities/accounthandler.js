export const LoginLocal = (account) => {
    localStorage.setItem("_account_loggedIn", JSON.stringify(account));
}

export const LogoutLocal = () => {
    localStorage.removeItem("_account_loggedIn");
    window.location.href = "/"
}