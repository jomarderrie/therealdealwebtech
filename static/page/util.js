// JWT token string with header, payload and signature
let sessionToken;

// send HTTP request, possibly with JSON body, and invoke callback when JSON response body arrives
export function sendJSON({ method, url, body }, callback) {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', () => {
		if (xhr.status === 200) {
			callback(undefined, JSON.parse(xhr.responseText));
		} else {
			callback(new Error(xhr.statusText));
		}
	});
	xhr.open(method, url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	let token2 = localStorage.getItem('token');
	if ( token2!== undefined) {
		xhr.setRequestHeader('Authorization', `Bearer ${token2}`);
	}
	xhr.send(body !== undefined ? JSON.stringify(body) : undefined);
}

export function saveToken(token) {
	sessionToken = token;
	localStorage.setItem('token', token);
}

export function resetToken() {
	// clear token when users logs out
	window.location.href = 'login.html';
	sessionToken = undefined;
	localStorage.removeItem('token');
}

export function getTokenPayload() {
	let jsonLocalStorageToken = localStorage.getItem('token').split('.')[1];
	if (jsonLocalStorageToken) {
		// extract JSON payload from token string
		return JSON.parse(atob(jsonLocalStorageToken));
	}
	return undefined;
}

// utility functions adds/removes CSS class 'bad' upon validation
export function validateInputControl(element, ok) {
	if (ok) {
		element.classList.remove('bad');
	} else {
		element.classList.add('bad');
	}
}

//extractpayloadfromtoken

// export function search(){

// }


export function redirect(url, method) {
	var form = document.createElement('form');
	form.method = method;
	form.action = url;
	form.submit();
}

function handleNavigation(query) {
	console.log('DOM has loaded');
	//create
}

window.onload = function() {
	getTokenPayload();
	console.log('DOM has loaded');
};


document.querySelector('nav').querySelectorAll('a')[4].addEventListener('click', resetToken);



