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
const instanceScrollspy = M.ScrollSpy.init(elemsScrollspy);

const elemsTooltips = document.querySelectorAll('.tooltipped');
const instanceTooltips = M.Tooltip.init(elemsTooltips);

const elemsModals = document.querySelectorAll('.modal');
const instacneModal = M.Modal.init(elemsModals);

var countCard = document.querySelectorAll('.card-wrapper').length;
var container = document.querySelector('.row');
var btnRight = document.querySelector('.fa-angle-right');
var btnLeft = document.querySelector('.fa-angle-left');

const bannerText = document.querySelector('#bannerText');

document.addEventListener('DOMContentLoaded', function() {
  window.onscroll = function() {
    var scroll = window.scrollY;
    if(scroll >= 30) {
      bannerText.classList.remove('hidden');
    } else {
      bannerText.classList.add('hidden');
    }
  }
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