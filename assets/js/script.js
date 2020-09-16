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

    /*<!----- Burger menu ----->*/
    const burgerMenu = document.querySelector('.spinner'),
          sidebarMenu = document.querySelector('.sidebarMenu');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        sidebarMenu.classList.toggle('rollUp');
    });

    sidebarMenu.addEventListener('click', (e) => {
        let target = e.target;

        target = target.closest('a[href="#"');

        if (target) {
            const parentTarget = target.parentElement;

            sidebarMenu.querySelectorAll('li').forEach(elem => {
                if (elem === parentTarget) {
                    elem.classList.add('active');
                } else {
                    elem.classList.remove('active');
                }
            })
        }
    });

    /*<!----- Modal window ----->*/
    document.body.insertAdjacentHTML('beforeend', `
        <div class="myTuberModal">
            <div id="myTuberClose">&#215;</div>
            <div id="myTuberContainer"></div>
        </div>
    `);

    const myTuberItems = document.querySelectorAll('[data-mytuber]'),
          myTuberModal = document.querySelector('.myTuberModal'),
          myTuberContainer = document.getElementById('myTuberContainer'),
          qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256],
          qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

    const sizeVideo = () => {
        let ww = document.documentElement.clientWidth,
            wh = document.documentElement.clientHeight;

        for (let i = 0; i < qw.length; i++) {
            if (ww > qw[i]) {
                myTuberContainer.querySelector('iframe').style.cssText = `
                    width: ${qw[i]}px;
                    height: ${qh[i]}px;
                `;

                myTuberContainer.style.cssText = `
                    width: ${qw[i]}px;
                    height: ${qh[i]}px;
                    top: ${(wh - qh[i]) / 2}px;
                    left: ${(ww - qw[i]) / 2}px;
                `;
                break;
            }
        }
    };

    myTuberItems.forEach(elem => {
        elem.addEventListener('click', () => {
            const idVideo = elem.dataset.mytuber;

            myTuberModal.style.display = 'block';

            const myTuberFrame = document.createElement('iframe');

            myTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
            myTuberContainer.insertAdjacentElement('beforeend', myTuberFrame);

            window.addEventListener('resize', sizeVideo);
            sizeVideo();
        })
    });

    myTuberModal.addEventListener('click', () => {
        myTuberModal.style.display = '';
        myTuberContainer.textContent = '';
        window.removeEventListener('resize', sizeVideo);
    })
});
