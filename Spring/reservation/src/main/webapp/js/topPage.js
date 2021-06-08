/*
function moveTop() {
	var topPage = document.querySelector('.topPage');
	topPage.addEventListener('click', function() {				// Javascript 코딩
		window.scrollTo(0,0);
	});
}
document.addEventListener('DOMContentLoaded', moveTop());
*/

$(function() {
	$('.topPage').on('click', () => {
		$('body').animate({ scrollTop : 0 });					// Jquery 코딩 + 애니메이션 추가
	})
});