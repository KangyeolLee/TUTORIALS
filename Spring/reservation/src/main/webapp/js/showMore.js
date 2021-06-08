$(function() {
	$('.descript_content').addClass('hidden');
	var checked = 0;
	$('.showMore').on('click', function() {
		if(checked === 0) {
			$(this).text("접기");
			checked = 1;
		} else {
			$(this).text("펼쳐보기");
			checked = 0;
		}
		$('.descript_content').toggleClass('hidden');
	})	
})