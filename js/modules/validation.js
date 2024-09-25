export default function validation(form) {
    const nameInput = form.querySelector('.input-name');
    const phoneInput = form.querySelector('.input-phone');
    const passwordInput = form.querySelector('.input-password');
    const emailInput = form.querySelector('.input-email'); 

    let isValid = true;

    let message = {
        name: {
            required: 'Введите имя пользователя',
            minLength: 'Введите не менее 2 символов',
            correct: 'Имя не должно содержать цифр'
        },
        phone: {
            required: 'Введите номер телефона',
            minLength: 'Введите не менее 11 символов',
            correct: 'Номер не должен содержать буквы',
        },
        email: {
            required: 'Введите электронную почту',
            correct: 'Введите корректный email'
        }
    }

    let { name, phone, email } = message;

    errorWork(nameInput, 'name', 2, /\d/, name);
    errorWork(phoneInput, 'phone', 11, /\D/, phone);
    emailErrorWork();
    passwordErrorWork();

    return isValid;


    function errorWork(input, classError, length, regex, message) {
        let error = form.querySelector(`.${classError}__error`);
        createError(error, input, `${classError}`);
        error = form.querySelector(`.${classError}__error`);
        input.addEventListener('input', () => {
            validationNamePhone(input, error, length, regex, message);
        });
        validationNamePhone(input, error, length, regex, message);
    }

    function emailErrorWork() {
        let emailError = form.querySelector('.email__error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        createError(emailError, emailInput, 'email');
        emailError = form.querySelector('.email__error');
        
        emailInput.addEventListener('input', () => {
            validationEmail(emailInput, emailError, emailRegex, email);
        });
        validationEmail(emailInput, emailError, emailRegex, email);
    }

    function passwordErrorWork() {
        const passwordErrors = form.querySelectorAll('.password__error');

        passwordInput.addEventListener('input', () => validatePassword(passwordInput, passwordErrors));
        validatePassword(passwordInput, passwordErrors);
    }

    function validationNamePhone(input, error, length, regex, message) {
        if (input.value.trim() === '') {
            error.innerHTML = message.required;
            error.style.display = 'block';
            isValid = false;
        } else if (regex.test(input.value)) {
            error.innerHTML = message.correct;
            error.style.display = 'block';
            isValid = false;
        } else if (input.value.length < length) {
            error.innerHTML = message.minLength;
            error.style.display = 'block';
            isValid = false;
        } else {
            error.style.display = 'none';
        }
    }

    function validationEmail(input, error, regex, message) {
        if (input.value.trim() === '') {
            error.innerHTML = message.required;
            error.style.display = 'block';
            isValid = false;
        } else if (!regex.test(input.value)) {
            error.innerHTML = message.correct;
            error.style.display = 'block';
            isValid = false;
        } else {
            error.style.display = 'none';
        }
    }

    function validatePassword(input, errors) {
        const validations = [{
                regex: /.{8,}/,
                element: errors[0]
            },
            {
                regex: /[A-Z]/,
                element: errors[1]
            },
            {
                regex: /[a-z]/,
                element: errors[2]
            },
            {
                regex: /[0-9]/,
                element: errors[3]
            },
            {
                regex: /[!@#$%^&*(),.?":{}|<>]/,
                element: errors[4]
            }
        ];

        validations.forEach(({ regex, element }) => {
            
            if (regex.test(input.value)) {
                element.style.color = 'green'
            } else {
                isValid = false;
                element.style.color = 'rgba(255, 60, 0, 1)';
            }
        });
    }

    function createError(error, input, name) {
        if (!error) {
            error = document.createElement('span');
            error.classList.add(`error`);
            error.classList.add(`${name}__error`);
            error.style.display = 'none';
            input.insertAdjacentElement('afterend', error);
        }
    }
}