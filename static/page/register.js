import {
    sendJSON,
    saveToken,
     resetToken
} from './util.js';


const loginForm = document.querySelector('main form'),
    usernameField = loginForm.querySelector('input[name="username"]'),
    eMail = loginForm.querySelector('input[name="email"]'),
    password = loginForm.querySelector('input[name="password"]'),
    password2 = loginForm.querySelector('input[name="password_repeat"]'),
    registerButton = loginForm.querySelector('input[type="submit"]');
let notOk = false;
registerButton.addEventListener('click', (event) => {
    event.preventDefault();
    const body = {
        username: usernameField.value,
        password: password.value,
        password2: password2.value,
        email: eMail.value
    };

    sendJSON({
                 method: 'POST',
                 url: '/register',
                 body
             }, (err, resp) => {
        // if err is undefined, the send operation was a
        // success
        if (!err) {
            window.location.href = 'index.html';
            resetToken();
            saveToken(resp.token);
            let tag = document.createElement('div');
            let text = document.createTextNode(' register succesfull ');
            tag.setAttribute('class', 'registerSucces');
            tag.style.background = 'green';
            tag.style.display = 'relative';
            tag.append(text);
            tag.style.width = '100px';
            tag.style.height = '100px';
            tag.appendChild(text);
            let element = document.getElementsByClassName('row')[0];
            element.append(tag);

        } else {
            if (!notOk) {
                let tag = document.createElement('div');
                let text = document.createTextNode(err + ' try' +
                                                       ' to register again ');
                tag.setAttribute('class', 'myclass');
                tag.style.color = 'red';
                tag.append(text);
                tag.style.paddingTop = '15px';
                tag.appendChild(text);
                let element = document.getElementsByClassName('register_form')[0];
                element.append(tag);
                notOk = true;
            }
        }
    });
});

function validateRegister() {
    let email = validateEmail(eMail);
    let passCheck = validatePassword(password);
    let passwordRepeatCheck = password.value === password2.value && true;
    usernameField.value.length <= 0 ? usernameField.classList.add('bad') : usernameField.classList.remove('bad');
    let usernameFieldCheck = usernameField.value.length > 0;

    let booleanCheck = email && passCheck && passwordRepeatCheck && usernameFieldCheck;

    registerButton.disabled = !booleanCheck;
}

function validatePassword(element) {
    let regex = RegExp(`^(?=.*?[0-9])(?=.*[A-Z]).{6,18}$`, 'gm');
    if (regex.test(element.value)) {
        element.classList.remove('bad');
        return true;
    } else {
        element.classList.add('bad');
        return false;
    }
}

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
