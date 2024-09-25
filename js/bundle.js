/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation */ "./js/modules/validation.js");



function forms(formSelector, modalSelector, messageSelector, btnCloseSelector) {
    const forms = document.querySelectorAll(formSelector),
        modal = document.querySelector(modalSelector),
        message = document.querySelector(messageSelector),
        btnClose = document.querySelectorAll(btnCloseSelector);

    btnClose.forEach(closer => {
        closer.addEventListener('click', () => {
            message.classList.remove('success');
            message.classList.remove('failure');
            document.body.classList.remove('fixed');
        })
    })

    forms.forEach(item => {
        bindPostData(item);
    })

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const isValid = (0,_validation__WEBPACK_IMPORTED_MODULE_1__["default"])(form)

            if (isValid) {
                document.body.classList.add('sending');

                const formData = new FormData(form);

                const json = JSON.stringify(Object.fromEntries(formData.entries()));

                (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/request', json)
                    .then(() => {
                        closeModal();
                        message.classList.add('success');
                    }).catch(() => {
                        closeModal();
                        message.classList.add('failure');
                    }).finally(() => {
                        form.reset();
                    })
            } else {
                console.log('Ошибка валидации формы');
            }
        })
    }

    function closeModal() {
        document.body.classList.remove('sending');
        modal.classList.remove('modal-open');
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ modal)
/* harmony export */ });
function modal(btnOpenSelector, btnCloseSelector, modalSelector) {
    const btnOpen = document.querySelectorAll(btnOpenSelector),
        btnClose = document.querySelector(btnCloseSelector),
        modal = document.querySelector(modalSelector);


    function closeModal() {
        modal.classList.remove('modal-open');
        document.body.classList.remove('fixed');
    }

    function openModal() {
        modal.classList.add('modal-open');
        document.body.classList.add('fixed');
    }

    /**
     * handleFloatingLabel — функция для управления состоянием "плавающей метки".
     * Она уменьшает и перемещает метку вверх, когда поле ввода содержит текст,
     * и возвращает метку в исходное положение, если поле ввода пустое.
     *
     * Функция работает с набором инпутов и соответствующими метками.
     */


    function handleFloatingLabel() {
        const labels = document.querySelectorAll('.label');
        const inputs = document.querySelectorAll('.modal input');

        inputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                const label = labels[index]; // Связываем конкретный инпут с его лейблом
                if (input.value !== '') {
                    label.style.cssText = 'font-size: 0.8rem; top: 10px; transform: translateY(-150%);';
                } else {
                    label.style.cssText = ''; // Возвращаем лейбл в исходное положение, если инпут пустой
                }
            });
        });
    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    btnOpen.forEach((item) => {
        item.addEventListener('click', () => openModal())
    })

    btnClose.addEventListener('click', () => closeModal())

    modal.addEventListener('click', (event) => {
        if (event.target.className == 'modal modal-open') closeModal()
    })

    document.addEventListener('keydown', function (event) {
        if (event.code == 'Escape' && modal.classList.contains('modal-open')) closeModal()
    })

    window.addEventListener('scroll', showModalByScroll);
    handleFloatingLabel();
}

/***/ }),

/***/ "./js/modules/phoneinput.js":
/*!**********************************!*\
  !*** ./js/modules/phoneinput.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ phoneInput)
/* harmony export */ });
function phoneInput() {

    let phoneInputs = document.querySelectorAll('input[data-tel-input]');

    let getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    let onPhonePaste = function (e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        let pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            let pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    let onPhoneInput = function (e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    let onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        let inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (let phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
}

/***/ }),

/***/ "./js/modules/validation.js":
/*!**********************************!*\
  !*** ./js/modules/validation.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validation)
/* harmony export */ });
function validation(form) {
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

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: data
    });

    if (!result.ok) {
        throw new Error(`Could not post ${url}, status: ${result.status}`);
    }

    return await result.json();
};

const getResource = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`)
    }

    return await result.json()
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_phoneinput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/phoneinput */ "./js/modules/phoneinput.js");
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';





window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_0__["default"])('form', '.modal', '.message', '[data-close]');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '[data-close]', '.modal');
    // phoneInput();
})
/******/ })()
;
//# sourceMappingURL=bundle.js.map