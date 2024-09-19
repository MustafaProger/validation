export default function validation(form) {
    const nameInput = form.querySelector('.input-name');

    let message = {
        name: {
            required: 'Поле имени обязательно',
            minLength: 'Имя должно быть не менее 2 символов'
        }
    }

    let { name } = message;

    let isValid = true; 
    
    if (!nameInput) {
        return false;
    }

    let nameError = form.querySelector('.error');
    if (!nameError) {
        nameError = document.createElement('span');
        nameError.classList.add('error');
        nameError.style.display = 'none';
        nameInput.insertAdjacentElement('afterend', nameError);
    }

    nameInput.addEventListener('input', () => {
        validationName(name.required, name.minLength);
    })

    validationName(name.required, name.minLength);

    return isValid;


    function validationName(nameTrue, nameLength) {
        if (nameInput.value.trim() === '') {
            nameError.innerHTML = nameTrue;
            nameError.style.display = 'block';
            isValid = false; 
        } else if (nameInput.value.length < 2) {
            nameError.innerHTML = nameLength;
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
    }
}