const sliderBox = document.querySelector('.sliderBox');
const profile_box = document.querySelector('.profile-box');
const profile_box_all = document.querySelectorAll('.profile-box .col');
const currentWidth = document.querySelector('.profile-box .col.m4');
const profile_wrapper = document.querySelector('.profile_wrapper');
const amount = document.querySelectorAll('.profile-wrapper').length;
const sliding_btnLeft = document.querySelector('.fas.fa-angle-left');
const sliding_btnRight = document.querySelector('.fas.fa-angle-right');
const children = profile_box.childElementCount;
const sibling = profile_box.cloneNode(true);
var direction;

document.addEventListener('DOMContentLoaded', function() {
    if(amount < 3) {
        sliding_btnLeft.style.display = 'none';
        sliding_btnRight.style.display = 'none';
        sliderBox.style.justifyContent = 'center';
    } else if(amount < 5) {
        profile_box.style.width = (amount * 2) * currentWidth.offsetWidth + 'px';
        for(let i = 0; i < children; i++) {
            profile_box.appendChild(sibling.children[0]);
        }
        profile_box.style.transform = 'translateX('+ -(currentWidth.offsetWidth) +'px)'
        insertStyleSheetRule("@keyframes slidingToRight { 0% { transform: translateX("+ -(currentWidth.offsetWidth) +"px); } 100% { transform: translateX("+ -(currentWidth.offsetWidth * 2) +"px); } }");
        insertStyleSheetRule("@keyframes slidingToLeft { 0% { transform: translateX("+ -(currentWidth.offsetWidth) +"px); } 100% { transform: translateX(0); } }");
    } else {
        profile_box.style.width = (amount) * currentWidth.offsetWidth + 'px';
        profile_box.style.transform = 'translateX('+ -(currentWidth.offsetWidth) +'px)'
        insertStyleSheetRule("@keyframes slidingToRight { 0% { transform: translateX("+ -(currentWidth.offsetWidth) +"px); } 100% { transform: translateX("+ -(currentWidth.offsetWidth * 2) +"px); } }");
        insertStyleSheetRule("@keyframes slidingToLeft { 0% { transform: translateX("+ -(currentWidth.offsetWidth) +"px); } 100% { transform: translateX(0); } }");
    }
    sliding_btnLeft.addEventListener('click', function() {
        profile_box.style.animation = 'slidingToLeft .6s forwards';
        direction = -1;
    })
    sliding_btnRight.addEventListener('click', function() {
        profile_box.style.animation = 'slidingToRight .6s forwards';
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
    /* 함수로 정리할 수 있음 좀 해볼 것! */
    window.addEventListener('resize', function() {
        var changingWidth = document.querySelector('.col.m4');
        if(sliderBox.offsetWidth < 1280 && sliderBox.offsetWidth > 665) {
            console.log('resized');
            optimizeSize(changingWidth);
        }
        if(window.innerWidth === window.screen.availWidth) {
            console.log('maximaized');
            optimizeSize(changingWidth);
        } else if(window.innerWidth <= 800 && window.innerWidth > 520) {
            console.log('normalize');
            /*
            profile_box_all.forEach((v) => {
                v.classList.remove('m4');
                v.classList.add('s6');
            })
            */
        } else if(window.innerWidth <= 520) {
            console.log('smallest');
        }
    });
});
/* Insert CSS Option with JS */
function insertStyleSheetRule(ruleText) {
    let sheets = document.styleSheets;
    
    if(sheets.length == 0)
    {
        let style = document.createElement('style');
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
    }
    
    let sheet = sheets[sheets.length - 1];
    sheet.insertRule(ruleText, sheet.rules ? sheet.rules.length : sheet.cssRules.length);
}
/* Optimize the Box Outline by resizing */
function optimizeSize(curWidth) {
    profile_box.style.width = (sliderBox.offsetWidth * 2) +'px';
    profile_box.style.transform = 'translateX('+ -(curWidth.offsetWidth) +'px)';
    insertStyleSheetRule("@keyframes slidingToRight { 0% { transform: translateX("+ -(curWidth.offsetWidth) +"px); } 100% { transform: translateX("+ -(curWidth.offsetWidth * 2) +"px); } }");
    insertStyleSheetRule("@keyframes slidingToLeft { 0% { transform: translateX("+ -(curWidth.offsetWidth) +"px); } 100% { transform: translateX(0); } }");      
}