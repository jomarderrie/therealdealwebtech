import { sendJSON, saveToken, validateInputControl } from './util.js';

const loginForm = document.querySelector('main form'),
	usernameField = loginForm.querySelector('input[name="username"]'),
	eMail = loginForm.querySelector('input[name="email"]'),
	password = loginForm.querySelector('input[name="password"]'),
	password2 = loginForm.querySelector('input[name="password_repeat"]'),
	registerButton = loginForm.querySelector('input[type="submit"]');

registerButton.addEventListener('click', (event) => {
	event.preventDefault();
	const body = {
		user: usernameField.value,
		password: password.value,
		password: password2.value,
		email: eMail.value
	};

	sendJSON({ method: 'POST', url: '/user', body }, (err, resp) => {
		// if err is undefined, the send operation was a success
		if (!err) {
			window.location.href = 'auction.html';
		} else {
			var tag = document.createElement('div');

			var text = document.createTextNode(err + ' try to register again ');
			tag.setAttribute('class', 'myclass');
			tag.style.color = 'red';
			tag.append(text);
			tag.style.paddingTop = '15px';

			tag.appendChild(text);

			var element = document.getElementsByClassName('register_form')[0];

			element.append(tag);
		}
	});
});

function validateRegister() {
	let email = validateEmail(eMail);
	if (email == true) {
	}
	console.log(email);
	// const usernameOk = usernameField.value.length > 0,
	//     passwordOk = passwordField.value.length > 0,

	//     loginOk = usernameOk && passwordOk;
	//    let validateEmail = validateEmail();

	// // provide visual feedback for controls in a 'bad' state
	// validateInputControl(usernameField, usernameOk);
	// validateInputControl(passwordField, passwordOk);
	// validateInputControl(password, loginOk);

	// enable/disable click of login button
	// registerButton.disabled = !loginOk;
}

//DONT STOP DELETING MY REGEX
//^[^@]+@[^@]+\.(nl|com)[^@]+$
//sometimes auto save deletes it
function validateEmail(element) {
	let regex = RegExp(`^[^@]+@[^@]+\.(nl$|com$)`, 'gm');
	if (regex.test(element.value)) {
		element.classList.remove('bad');
		return true;
	} else {
		element.classList.add('bad');
		return false;
	}
}

loginForm.addEventListener('input', validateRegister);
