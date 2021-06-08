const sliderBox = document.querySelector('.sliderBox');
const profileBox = document.querySelector('.profile-box');
const allProfiles = document.querySelectorAll('.profile-box .col');
const sliding_btnLeft = document.querySelector('.fas.fa-angle-left');
const sliding_btnRight = document.querySelector('.fas.fa-angle-right');
const sibling = profileBox.cloneNode(true);
var direction;

document.addEventListener('DOMContentLoaded', function() {
    infiniteSlider(allProfiles.length);

    sliding_btnLeft.addEventListener('click', function() {
        profileBox.style.animation = 'slidingToLeft .6s forwards';
        direction = -1;
    });
    sliding_btnRight.addEventListener('click', function() {
        profileBox.style.animation = 'slidingToRight .6s forwards';
        direction = 1;
    });
    profileBox.addEventListener('animationend', function() {
        if(direction === 1) {
            profileBox.appendChild(profileBox.firstElementChild);
            profileBox.style.animation = 'none';
        } else {
            profileBox.prepend(profileBox.lastElementChild);
            profileBox.style.animation = 'none';
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
/* Infinitize the Slider */
function infiniteSlider(amount) {
    if(amount < 3) {
        sliding_btnLeft.style.display = 'none';
        sliding_btnRight.style.display = 'none';
        sliderBox.style.justifyContent = 'center';
    } else if(amount < 5) {
        for(let i = 0; i < allProfiles.length; i++) {
            profileBox.appendChild(sibling.children[0]);
        }
        arrangeSlider(allProfiles[0]);
    } else {
        arrangeSlider(allProfiles[0]);
    }
}
/* Arrange the Slider On Screen Size */
function arrangeSlider(curWidth) {
    profileBox.style.transform = 'translateX('+ -(curWidth.offsetWidth) +'px)';
    insertStyleSheetRule("@keyframes slidingToRight { 0% { transform: translateX("+ -(curWidth.offsetWidth) +"px); } 100% { transform: translateX("+ -(curWidth.offsetWidth * 2) +"px); } }");
    insertStyleSheetRule("@keyframes slidingToLeft { 0% { transform: translateX("+ -(curWidth.offsetWidth) +"px); } 100% { transform: translateX(0); } }");      
}