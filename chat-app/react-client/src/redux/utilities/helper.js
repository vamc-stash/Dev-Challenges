export function errorObject(res) {
    var error = new Error('Error ' + res.status + ':' + res.statusText)
    error.response = res
    return error
}

export function parseJwt(token) {
    if (!token) {
        return null
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64))
}