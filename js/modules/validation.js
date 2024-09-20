export default function validation(form) {
    const nameInput = form.querySelector('.input-name');
    const phoneInput = form.querySelector('.input-phone');

    let isValid = true;

    let message = {
        name: {
            required: 'Введите имя пользователя',
            minLength: 'Введите не менее 2 символов'
        },
        phone: {
            required: 'Введите номер телефона',
            minLength: 'Введите номер корректно',
        }
    }

    let { name, phone } = message;

    nameErrorWork();
    phoneErrorWork();

    return isValid;


    function nameErrorWork() {
        let nameError = form.querySelector('.name__error');
        createError(nameError, nameInput, 'name');
        nameError = form.querySelector('.name__error');
        nameInput.addEventListener('input', () => {
            validationNamePhone(nameInput, nameError, 2, name.required, name.minLength);
        });
        validationNamePhone(nameInput, nameError, 2, name.required, name.minLength);
    }

    function phoneErrorWork() {
        let phoneError = form.querySelector('.phone__error');
        createError(phoneError, phoneInput, 'phone');
        phoneError = form.querySelector('.phone__error');
        phoneInput.addEventListener('input', () => {
            validationNamePhone(phoneInput, phoneError, 11, phone.required, phone.minLength);
        });
        validationNamePhone(phoneInput, phoneError, 11, phone.required, phone.minLength);
    }

    function validationNamePhone(input, error, length, required, minLength) {
        if (input.value.trim() === '') {
            error.innerHTML = required;
            error.style.display = 'block';
            isValid = false;
        } else if (input.value.length < length) {
            error.innerHTML = minLength;
            error.style.display = 'block';
            isValid = false;
        } else {
            error.style.display = 'none';
        }
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