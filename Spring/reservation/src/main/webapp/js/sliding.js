/*
function slide() {
	var el =document.querySelector(".promotion ul"); 
		setTimeout(() => {
	    if(el.style.marginLeft === "") {
	    	el.style.marginLeft = 0;
	    }
	    el.style.marginLeft = parseInt(el.style.marginLeft) - 600;
	   	if(parseInt(el.style.marginLeft) === -6600) { 
	   		el.style.marginLeft = 0; 
	   	}
	    slide();
	}, 3000);
}
*/
/*
function go(i) { 
    var el = document.querySelector(".promotion ul");
    el.style.marginLeft = -600 * i;	// [수정요망] 무한슬라이딩 자연스럽게 다듬어야 함
    el.classList.add('animated');
}
document.addEventListener("DOMContentLoaded",function() {
	var index = 0;
	var count = document.querySelectorAll(".slide").length;
	setInterval(function() {
	    var currentIndex = (index + 1) % count;
	    go(currentIndex);
	    index = currentIndex;
	}, 4000);
});
*/
//////////////////////////////////////////////////////////////////////////////////
/*
document.addEventListener("DOMContentLoaded", () => {
	var el = document.querySelector('.promotion ul');
	var slides = document.querySelectorAll('.promotion .slide');
	var len = slides.length;
	
	for(var i = 0; i < len; i++) {
		slides[i].style.width = 600 + 'px';
		slides[i].style.height = 300 + 'px';
	}
	el.style.width = 600 * len + 'px';
																	// Javascript 로 무한 이미지 슬라이더 구현
	el.addEventListener('transitionend', () => {
		el.appendChild(el.firstElementChild);
		el.style.transition = 'none';
		el.style.marginLeft = 0;
		
		setTimeout(()=> {
			el.style.transition = 'all 1.5s ease-out';
		})
	});
	
	setInterval(() => {
		el.style.marginLeft = -600;
	}, 4000);
});
*///////////////////////////////////////////////////////////////////////////////////

$(function() {
	var len = $('.promotion .slide').length;
	var width = 600;
	var height = 300;

	$('.promotion ul').css({ width : width * len });
	$('.promotion .slide').css({ width : width, height : height });

    $('.promotion ul').on('transitionend', function() {
        $('.promotion ul').append($('.promotion ul').children().eq(0));
        $('.promotion ul').css({ transition : 'none' });
        $('.promotion ul').css({ marginLeft : 0 });
																	// Jquery 로 무한 이미지 슬라이더 구현
        setTimeout(() => {
            $('.promotion ul').css({ transition : 'all 1.5s ease-out' });
        });
    });

    setInterval(() => {
        $('.promotion ul').css({ marginLeft : -(width) });
    }, 4000);
});