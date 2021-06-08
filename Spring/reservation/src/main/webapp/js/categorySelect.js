/*
function clicking() {
	var el = document.querySelector(".category ul");
	var list = document.querySelectorAll(".category ul li");
	var len = list.length;

	el.addEventListener('click', function(e) {	
		if(e.target.tagName === "LI") {
			for(var i = 0; i < len; i++) {						// Javascript 로 작성한 코드
				list[i].classList.remove('on');
			} 
			e.target.classList.add('on');
		}		
	});
}
document.addEventListener('DOMContentLoaded', clicking());
*/

$(() => {
	$('.category ul li').on('click', function() {				// Jquery 로 작성한 코드
		$('.category ul li').removeClass('on')					// Event delegation 개념 없이, 해당하는 항목에 바로 이벤트를 걸어주고,
	    $(this).addClass('on');									// 별도의 tagName 검사과정도 불필요
	});
})
