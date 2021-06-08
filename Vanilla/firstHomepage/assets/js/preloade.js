const preLoader = document.querySelector('.loading-page');
const progressContainer = document.querySelector('.progress-container');
const progressbar = document.querySelector('.progress-bar');
const preLoaderFire = document.querySelector('.page-preloader-wrapper .fire');
const preLoaderFlame = document.querySelector('.page-preloader-wrapper .fire .flames .flame');
const preLoaderNav = document.querySelector('#nav-preloader');
const fixedNavbar = document.querySelector('#navbar');
const firstOnePageSection = document.querySelector('#banner');
const bannerTextElement = document.querySelector('#bannerText');

window.addEventListener('load', function() {
    console.log('completed load');
    //doneProgressbar() /* Preloader Funtion declared for Loading Speed improvement */
    bannerTextElement.classList.remove('hidden');
    fadeIn(fixedNavbar);
});

function doneProgressbar() {
    progressbar.addEventListener('animationend', function() {
        progressContainer.classList.add('hidden');
        progressContainer.addEventListener('animationend', function() {
            afterPreload();
        });
    });
}

function afterPreload() {
    progressContainer.addEventListener('animationend', function() {
        preLoader.classList.add('hidden');
        preLoaderFire.classList.add('hidden');
        preLoaderFlame.classList.add('hidden');
        preLoaderNav.classList.add('hidden');

        preLoader.addEventListener('animationend', function() {
            fadeOut(preLoader);
        });
    });
}

function fadeOut(element) {
    element.addEventListener('animationend', function() {
        fadeIn(fixedNavbar);
    });
}

function fadeIn(element) {
    element.style.animation = 'fadeIn 1.5s forwards';
}

function presentBanner() {
    bannerTextElement.classList.remove('hidden');
    setTimeout(function() {
        preLoader.style.display = 'none';
    }, 3000);
}