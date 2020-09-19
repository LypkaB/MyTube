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
    const myTuber = () => {
        const myTuberItems = document.querySelectorAll('[data-mytuber]'),
              myTuberModal = document.querySelector('.myTuberModal'),
              myTuberContainer = document.getElementById('myTuberContainer'),
              qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256],
              qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

        const sizeVideo = () => {
            const ww = document.documentElement.clientWidth,
                  wh = document.documentElement.clientHeight;

            for (let i = 0; i < qw.length; i++) {
                if (ww > qw[i]) {
                    myTuberContainer.querySelector('iframe').style.cssText =
                        `width: ${qw[i]}px;
                         height: ${qh[i]}px;`;

                    myTuberContainer.style.cssText =
                        `width: ${qw[i]}px;
                         height: ${qh[i]}px;
                         top: ${(wh - qh[i]) / 2}px;
                         left: ${(ww - qw[i]) / 2}px;`;
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
        });
    };

    {
        document.body.insertAdjacentHTML('beforeend',
            `<div class="myTuberModal">
                     <div id="myTuberClose">&#215;</div>
                     <div id="myTuberContainer"></div>
                  </div>`);
        myTuber();
    }

    /*<!----- MyTube API ----->*/
    // to use this feature need own 'API_KEY' & 'CLIENT_ID'
    /*{
        const API_KEY = 'AIzaSyDzY4uOeDqBfEGX_81XxBIJDAGRQhlQorc';
        const CLIENT_ID = '881641790927-hpoej0agpa11b6vrc4dm9j4f44mmo0g.apps.googleusercontent.com';

        // authorization
        const authBlock = document.querySelector('.auth_wrap'),
              authBtn = document.getElementById('authorize');

        gapi.load("client:auth2", () => gapi.auth2.init({client_id: CLIENT_ID}));

        const authenticate = () => gapi.auth2.getAuthInstance()
                .signIn({scope: "https://www.googleapis.com/auth/youtube/readonly"})
                .then(() => console.log('Sign-in successful'))
                .catch(errorAuth);

        const loadClient = () => {
            gapi.client.setApiKey(API_KEY);
            return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                .then(() => console.log('GAPI client loaded for API'))
                .then(() => authBlock.style.display = 'none')
                .catch(errorAuth)
        };

        const errorAuth = err => {
            console.error(err);
            authBlock.style.display = ''
        };

        authBtn.addEventListener('click', () => {
            authenticate().then(loadClient);
        });

        // request
        {
            const myTube = document.querySelector('.yt-thumbnail__img');

            const request = options => gapi.client.youtube.search.list(options)
                .then(response => response.result.items)
                .then(render)
                .then(myTuber)
                .catch(err => console.error('Error' + err));

            const render = data => {
                const mtWrapper = document.getElementById('yt-wrapper');

                mtWrapper.textContent = '';
                data.forEach(item => {
                    const {id:{videoId}, snippet:{channelTitle, title, thumbnails:{high:{url}}}} = item;

                    mtWrapper.innerHTML +=
                    `<div class="yt" data-mytuber="${videoId}">
                        <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                            <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
                        </div>
                        <div class="yt-title">${title}</div>
                        <div class="yt-channel">${channelTitle}</div>
                    </div>`
                })
            };

            myTube.addEventListener('click', () => {
                request({
                    part: 'snippet',
                    channelId: 'UCVswRUcKC-M35RzgPRv8qUg',
                    order: 'date',
                    maxResults: 6
                })
            })
        }
    }*/
});
