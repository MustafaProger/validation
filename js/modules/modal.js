export default function modal(btnOpenSelector, btnCloseSelector, modalSelector, showHidePasswordSelector) {
    const btnOpen = document.querySelectorAll(btnOpenSelector),
        btnClose = document.querySelector(btnCloseSelector),
        modal = document.querySelector(modalSelector),
        showHidePassword = document.querySelector(showHidePasswordSelector);


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

    showHidePassword.addEventListener('click', function (event) {

        event.preventDefault();

        if (event.target.classList.contains('password-control')) {
            const passwordInput = document.querySelector('.input-password');

            if (passwordInput.type === 'password') {
                event.target.classList.add('view');
                passwordInput.type = 'text';
            } else {
                event.target.classList.remove('view');
                passwordInput.type = 'password';
            }
       }
    });

    // function showModalByScroll() {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         openModal();
    //         window.removeEventListener('scroll', showModalByScroll);
    //     }
    // }

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

    // window.addEventListener('scroll', showModalByScroll);
    handleFloatingLabel();
}