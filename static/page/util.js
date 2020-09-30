// JWT token string with header, payload and signature
let sessionToken

// send HTTP request, possibly with JSON body, and invoke callback when JSON response body arrives
export function sendJSON({ method, url, body }, callback) {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            callback(undefined, JSON.parse(xhr.responseText))
        } else {
            callback(new Error(xhr.statusText))
        }
    })
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    if (sessionToken !== undefined) {
        xhr.setRequestHeader('Authorization', `Bearer ${sessionToken}`)
    }
    xhr.send(body !== undefined ? JSON.stringify(body) : undefined)
}

export function saveToken(token) {
    // TODO: A token does not survive a page refresh!
    // use a better mechanism to store tokens more permanently
    sessionToken = token
}

function resetToken() {
    // clear token when users logs out
    sessionToken = undefined
}

export function getTokenPayload() {
    if (sessionToken) {

        // extract JSON payload from token string
        return JSON.parse(atob(sessionToken.split('.')[1]))
    }
    return undefined
}

// utility functions adds/removes CSS class 'bad' upon validation
export function validateInputControl(element, ok) {
    if (ok) {
        element.classList.remove('bad')
    } else {
        element.classList.add('bad')
    }
}
