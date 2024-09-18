// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import forms from './modules/forms';
import modal from './modules/modal';
import phoneInput from './modules/phoneinput';

window.addEventListener('DOMContentLoaded', () => {
    forms('form', '.modal', '.message', '[data-close]');
    modal('[data-modal]', '[data-close]', '.modal');
    phoneInput();
})