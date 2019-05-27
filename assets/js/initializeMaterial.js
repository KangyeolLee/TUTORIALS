const elemsDropdown = document.querySelectorAll(".dropdown-trigger");
const instanceDropdown = M.Dropdown.init(elemsDropdown);

const elemsFixedAction = document.querySelectorAll(".fixed-action-btn");
const instanceFixedAction = M.FloatingActionButton.init(elemsFixedAction);

const elemsParallax = document.querySelectorAll('.parallax');
const instanceParallax = M.Parallax.init(elemsParallax);

const elemsPushpin = document.querySelectorAll('.pushpin');
const instancePushpin = M.Pushpin.init(elemsPushpin);

const elemsMaterialboxed = document.querySelectorAll('.materialboxed');
const instanceMaterialboxed = M.Materialbox.init(elemsMaterialboxed);

const elemsTabs = document.querySelectorAll('.tabs');
const instacneTabs = M.Tabs.init(elemsTabs);

const elemsDatepicker = document.querySelectorAll('.datepicker');
const instanceDatepicker = M.Datepicker.init(elemsDatepicker);

const elemsScrollspy = document.querySelectorAll('.scrollspy');
const instanceScrollspy = M.ScrollSpy.init(elemsScrollspy, {
  scrollOffset: 0,
});

const elemsTooltips = document.querySelectorAll('.tooltipped');
const instanceTooltips = M.Tooltip.init(elemsTooltips);

const elemsModals = document.querySelectorAll('.modal');
const instanceModal = M.Modal.init(elemsModals);

const elemsSidenav = document.querySelectorAll('.sidenav');
const instanceSidenav = M.Sidenav.init(elemsSidenav);
const pluginSidenav = M.Sidenav.getInstance(elemsSidenav[0]);

const sideNavbarBtns = document.querySelectorAll('#slide-out li a');

document.addEventListener('DOMContentLoaded', function() {
  /* Close the Sidebar on Click */
  sideNavbarBtns.forEach((v, i)=> {
    v.addEventListener('click', function() {
      if(i > index) {
        for(let count = index; count < i; count++) {
          onePage_section[count].style.transform = 'translateY(-100%)';
        }
      } else {
        for(let count = index; count >= i; count--) {
          onePage_section[count].style.transform = 'translateY(0px)';
        }
      }
      var scrollSpyId = v.getAttribute('name');
      var scrollPoint = document.querySelector(scrollSpyId);
      scrollPoint.scrollIntoView({behavior:'smooth'});
      index = i;
      
      setTimeout(function() {
        scrollPoint.style.animation = 'fadeIn 1.5s forwards';
      }, 500);
      pluginSidenav.close();  
    });
  });
});

/*
$(function() {
  var text = $(".bannerText");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 60) {
      text.removeClass("hidden");
    } else {
      text.addClass("hidden");
    }
  });
});
*/
