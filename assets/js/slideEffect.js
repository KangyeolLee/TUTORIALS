const sliderOutline = document.querySelectorAll('.slider-outline');
const sliderBox = document.querySelectorAll('.slider-box');
const allSliders = document.querySelectorAll('.slider-box .col');
const sliding_btnLeft = document.querySelectorAll('.leftArrow');
const sliding_btnRight = document.querySelectorAll('.rightArrow');
const customTAB = document.querySelector('#custom-tabs');
//const sibling = sliderBox.cloneNode(true);
let direction;

document.addEventListener('DOMContentLoaded', function() {
    customTAB.addEventListener('click', (e)=> {
        if(e.target.tagName === 'A') {
            sliderBox.forEach(v=> {
                arrangeSlider(v);
            })
        }
    })

    sliderBox.forEach((v, i) => {
        var len = v.childElementCount;
        infiniteSlider(len, v, i);
    });

    window.addEventListener('resize', function() {
        sliderBox.forEach((v) => {
            arrangeSlider(v);
        });
    })

    sliding_btnLeft.forEach((v)=> {
        v.addEventListener('click', function() {
            var curSliderBox = v.parentElement.querySelector('.slider-box');
            curSliderBox.style.animation = 'slidingToLeft'+ curSliderBox.id +' .6s forwards';
            direction = -1;
        });
    });
    sliding_btnRight.forEach((v)=> {
        v.addEventListener('click', function() {
            var curSliderBox = v.parentElement.querySelector('.slider-box');
            curSliderBox.style.animation = 'slidingToRight'+ curSliderBox.id +' .6s forwards';
            direction = 1;
        });
    });
    sliderBox.forEach((v) => {
        v.addEventListener('animationend', function() {
            if(direction === 1) {
                v.appendChild(v.firstElementChild);
                v.style.animation = 'none';
            } else {
                v.prepend(v.lastElementChild);
                v.style.animation = 'none';
            }
        });
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
/* Infinitize the Slider */
function infiniteSlider(amount, parentElement, index) {
    if(amount < 3) {
        sliding_btnLeft[index].style.display = 'none';
        sliding_btnRight[index].style.display = 'none';
        sliderOutline[index].style.justifyContent = 'center';
    } else if(amount < 5) {
        for(let i = 0; i < amount; i++) {
            sliderBox.forEach((v) => {
                v.appendChild(v.cloneNode(true).children[i]);
            });
        }
        arrangeSlider(parentElement);
    } else {
        arrangeSlider(parentElement);
    }
}
/* Arrange the Slider On Screen Size */
function arrangeSlider(curSlider) {
    curSlider.style.transform = 'translateX('+ -(curSlider.firstElementChild.offsetWidth) +'px)';
    insertStyleSheetRule("@keyframes slidingToRight"+ curSlider.id +" { 0% { transform: translateX("+ -(curSlider.firstElementChild.offsetWidth) +"px); } 100% { transform: translateX("+ -(curSlider.firstElementChild.offsetWidth * 2) +"px); } }");
    insertStyleSheetRule("@keyframes slidingToLeft"+ curSlider.id +" { 0% { transform: translateX("+ -(curSlider.firstElementChild.offsetWidth) +"px); } 100% { transform: translateX(0); } }");      
}