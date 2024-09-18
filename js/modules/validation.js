// export default function validation() {
//     const nameInput = document.querySelectorAll('.input-name');
//     const nameError = document.querySelectorAll('.error__name');


//     nameInput.forEach((input, indexInput, arrInput) => {
//         nameError.forEach((span, indexSpan, arrSpan) => {
//             if (indexInput === indexSpan) {

//                 validationName(input, indexInput)
                
//                 input.addEventListener('input', () => {
//                     validationName(input, indexInput)
//                 });
//             }
//         })
//     })

//     function validationName(name, index) {
//         if (name.value === '') {
//             nameError[index].textContent = 'Поле имени обязательно';
//         } else if (name.value.length < 2) {
//             nameError[index].textContent = 'Имя должно быть не менее 2 символов';
//         } else {
//             nameError[index].textContent = '';
//         }
//     }

// }