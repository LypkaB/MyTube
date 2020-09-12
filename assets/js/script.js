'use strict';

document.addEventListener('DOMContentLoaded', () => {
    /*<!----- Screen keyboard ----->*/
    const keyboardBtn = document.querySelector('.search-form__keyboard'),
          keyboard = document.querySelector('.keyboard'),
          closeKeyboard = document.getElementById('close-keyboard'),
          searchInput = document.querySelector('.search-form__input');

    const toggleKeyboard = () => keyboard.style.top = keyboard.style.top ? '' : '50%';

    const typing = (e) => {
        const target = e.target;

        if (target.tagName === 'BUTTON') {
            if (target.textContent.trim() === '⬅') {
                searchInput.value = searchInput.value.slice(0, length - 1);
            } else if (!target.textContent.trim()) {
                searchInput.value += ' ';
            } else {
                searchInput.value += target.textContent.trim();
            }
        }
    };

    keyboardBtn.addEventListener('click', toggleKeyboard);
    closeKeyboard.addEventListener('click', toggleKeyboard);
    keyboard.addEventListener('click', typing);
});
