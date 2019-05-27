const bannerText = document.querySelector('#bannerText');
const onePage_section = document.querySelectorAll('.onePage-section');
const animationDuration = 1000;
const idlePeriod = 100;
let pageArray = [];
let lastAnimation = 0;
let index = 0;

const main = document.querySelector('main');
let pageY1, pageY2;

document.addEventListener('DOMContentLoaded', function() {
  onePage_section.forEach((v,i)=>{
    pageArray[i] = {
      index : i
    }
  });
  /* Mouse Wheel Event Handler */
  main.addEventListener('wheel', event => {
    var delta = event.wheelDelta;
    var timeNow = new Date().getTime();

    if(timeNow - lastAnimation < idlePeriod + animationDuration) {
      console.log('animation delayed...');
      return;
    }
    if (delta < 0) {
      downScroll();
    } else {
      upScroll();
    }
    lastAnimation = timeNow;
  });
  /* Touch on Screen Event Handler */
  main.addEventListener('touchstart', function(e) {
    pageY1 = e.targetTouches[0].pageY;
  });
  main.addEventListener('touchmove', function(e) {
    pageY2 = e.targetTouches[0].pageY;
  })
  main.addEventListener('touchend', function(e) {
    var timeNow = new Date().getTime();

    if(timeNow - lastAnimation < idlePeriod + animationDuration) {
      console.log('animation delayed...');
      return;
    } else {
      touchScrollMove(e);
    }
    lastAnimation = timeNow;
  });
});

function downScroll() {
  if(document.querySelector('.modal-overlay') !== null) return;
  if(index === onePage_section.length - 1) return;
  //if(index < 5 && index >= 0) index++;
  
  onePage_section.forEach((section, i) => {
    if (i === index) {
      section.style.transform = 'translateY(-100%)';
      /*
      section.scrollIntoView({behavior: "smooth"});
      setTimeout(function() {
        section.style.animation = 'fadeIn 1.5s forwards';
      }, 500);
      */
    }
  });
  if(index < 5 && index >= 0) index++;
}
function upScroll() {
  //if(index < 1) return;
  if(document.querySelector('.modal-overlay') !== null) return;
  
  onePage_section.forEach((section, i) => {
    if (i === index) {
      if(section.previousElementSibling === null) return;
      section.previousElementSibling.style.transform = 'translateY(0px)';
      /*
      section.scrollIntoView({behavior: "smooth"});
      setTimeout(function() {
        section.style.animation = 'fadeIn 1.5s forwards';
      }, 800);
      */
    }
  });
  if(index <= 5 && index > 0) index--;
}

function touchScrollMove(event) {
  var point = event.target.closest('.onePage-section');
  if(pageY1 === 0 || pageY2 === 0) {
    pageY1 = 0;
    pageY2 = 0;
    return;
  }

  if(pageY1 > pageY2 && index !== onePage_section.length - 1) {                                   
    point.style.transform = 'translateY(-100%)';                          //
    if(index < 5 && index >= 0) index++;                                  //  onePage-section 클래스 간에
  } else if(pageY2 > pageY1 && point.previousElementSibling !== null) {   //  divider 등과 같은 다른 클래스 및
    point.previousElementSibling.style.transform = 'translateY(0px)';     //  태그요소가 존재하지 않을 경우 작동
    if(index <= 5 && index > 0) index--;                                  //  
  } else return;                                            
                                                          
  pageY1 = 0;
  pageY2 = 0;
}

function preventScrollOnModal() {

}
/*
function checkOnePage_scrollDown(section) {
  if(section.nextElementSibling.className === 'onePage-section') {
    section = section.nextElementSibling;
    return section;
  } else {
    checkOnePage_scrollDown(section.nextElementSibling);
  }
}
function checkOnePage_scrollUp(section) {
  if(section.previousElementSibling.className === 'onePage-section') {
    section = section.previousElementSibling;
    return section;
  } else {
    checkOnePage_scrollUp(section.previousElementSibling);
  }
}

window.onscroll = function() {
  var currentScrollY = window.pageYOffset;
  if(currentScrollY >= 10) {
    bannerText.classList.remove('hidden');
  } else {
    bannerText.classList.add('hidden');
  }
}
*/
