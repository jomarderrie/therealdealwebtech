import { sendJSON, saveToken, validateInputControl } from './util.js';

let loginForm = document.querySelector('main form'),
	usernameField = loginForm.querySelector('input[name="username"]'),
	eMail = loginForm.querySelector('input[name="username"]'),
	password = loginForm.querySelector('input[name="username"]'),
	password2 = loginForm.querySelector('input[name="username"]');
