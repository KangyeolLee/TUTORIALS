const bannerText = document.querySelector('#bannerText');
const onePage_section = document.querySelectorAll('.onePage-section');

const animationDuration = 1000;
const idlePeriod = 100;
let lastAnimation = 0;
let index = 0;

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('wheel', event => {
    var delta = event.wheelDelta;
    var timeNow = new Date().getTime();

    if(timeNow - lastAnimation < idlePeriod + animationDuration) {
      console.log('animation delayed...');
      return;
    }
    if (delta < 0) {
      upScroll();
    } else {
      downScroll();
    }
    lastAnimation = timeNow;
  }) 

});

function upScroll() {
  if(index > 10) {
    return;
  }
  index++;
  onePage_section.forEach((section, i) => {
    if (i === index) {
      section.scrollIntoView({behavior: "smooth"});
    }
  })
}
function downScroll() {
  if (index < 1) return;
  index--;
  onePage_section.forEach((section, i) => {
    if (i === index) {
      section.scrollIntoView({behavior: "smooth"});
    }
  });
}

/*
window.onscroll = function() {
  var currentScrollY = window.pageYOffset;
  if(currentScrollY >= 10) {
    bannerText.classList.remove('hidden');
  } else {
    bannerText.classList.add('hidden');
  }
}
*/
