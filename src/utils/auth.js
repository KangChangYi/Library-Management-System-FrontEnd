import Cookies from 'js-cookie';

const TokenKey = 'x-token';

export function setToken(token, day = 0) {
    if (day) {
        return Cookies.set(TokenKey, token, { expires: day });
    }
    return Cookies.set(TokenKey, token);
}

export function getToken() {
    return Cookies.get(TokenKey);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}
