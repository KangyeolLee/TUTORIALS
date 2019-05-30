const preLoader = document.querySelector('.loading-page');
const fixedNavbar = document.querySelector('#navbar');
const firstPage = document.querySelector('.onePage-section');

window.addEventListener('load', function() {
    console.log('completed load');
    afterPreload();
});

function afterPreload() {
    preLoader.classList.add('hidden');
    fadeOut(preLoader);
}

function fadeOut(element) {
    element.addEventListener('animationend', function() {
        this.style.display = 'none';
        fadeIn(fixedNavbar);
        presentBanner();
    });
}

function fadeIn(element) {
    element.style.animation = 'fadeIn 1.5s forwards';
}

function presentBanner() {
    firstPage.querySelector('#bannerText').classList.remove('hidden');
}