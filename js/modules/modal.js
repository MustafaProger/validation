export default function modal(btnOpenSelector, btnCloseSelector, modalSelector) {
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