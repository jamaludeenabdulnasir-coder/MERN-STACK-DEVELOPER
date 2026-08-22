const TOKEN_KEY = "token"

export function saveToken(token, remember = true) {
    if (remember) {
        localStorage.setItem(TOKEN_KEY, token)
        sessionStorage.removeItem(TOKEN_KEY)
    } else {
        sessionStorage.setItem(TOKEN_KEY, token)
        localStorage.removeItem(TOKEN_KEY)
    }
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
}

export function isLoggedIn() {
    return Boolean(getToken())
}
