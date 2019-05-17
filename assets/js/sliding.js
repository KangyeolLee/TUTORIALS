const profile_wrapper = document.querySelector('.profile_wrapper');
const sliderBox = document.querySelector('.sliderBox');
const profile_box = document.querySelector('.profile_box');
const sliding_btnLeft = document.querySelector('.fas.fa-angle-left');
const sliding_btnRight = document.querySelector('.fas.fa-angle-right');
const amount = document.querySelectorAll('.profile-wrapper').length;
const children = profile_box.childElementCount;
const sibling = profile_box.cloneNode(true);
var direction;

document.addEventListener('DOMContentLoaded', function() {
    if(amount < 3) {
        sliding_btnLeft.style.display = 'none';
        sliding_btnRight.style.display = 'none';
        sliderBox.style.justifyContent = 'center';
    } else if(amount < 5) {
        profile_box.style.width = (amount * 2) * 426 + 'px';
        for(let i = 0; i < children; i++) {
            profile_box.appendChild(sibling.children[0]);
        }
    } else {
        profile_box.style.width = (amount) * 426 + 'px';
    }
    sliding_btnLeft.addEventListener('click', function() {
        profile_box.style.animation = 'slidingToLeft .4s forwards';
        direction = -1;
    })
    sliding_btnRight.addEventListener('click', function() {
        profile_box.style.animation = 'slidingToRight .4s forwards';
        direction = 1;
    })
    profile_box.addEventListener('animationend', function() {
        if(direction === 1) {
            profile_box.appendChild(profile_box.firstElementChild);
            profile_box.style.animation = 'none';
        } else {
            profile_box.prepend(profile_box.lastElementChild);
            profile_box.style.animation = 'none';
        }
    })
});

