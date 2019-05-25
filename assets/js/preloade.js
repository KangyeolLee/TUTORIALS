const preLoader = document.querySelector('.loading-page');
const fixedNavbar = document.querySelector('#navbar');
const firstPage = document.querySelector('.onePage-section');

window.addEventListener('load', function() {
    setTimeout(fadeOut, 3000);
});

function fadeOut() {
    preLoader.classList.add('hidden');
    preLoader.addEventListener('animationend', function() {
        this.style.display = 'none';
        fadeIn(fixedNavbar);
        fadeIn(firstPage);
    })
}

function fadeIn(element) {
    element.style.animation = 'fadeIn 1.5s forwards';
}