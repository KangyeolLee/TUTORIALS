completeTemplate= (saveFileName, description, placeName, content) => {				
	return `
		<li>
			<div class = "productListwrapper">
				<img class = "productList" src = "${saveFileName}">
				<span class = "description"> ${description} </span>			
				<span class = "placeName"> ${placeName} </span>
				<span class = "content"> ${content} </span>
			</div>	
		</li>
	`
}

$(function() {
	var startIndex = 4;
	var $morePages = $('.morePages');
	
	$.ajax({
		type: 'GET',
		url: 'api/products',
		dataType: 'json',
		success: function(data) {
			var resultHTMLleft = "";
			var resultHTMLright = "";
			let len = data.items.length;
			
			for(let i = 0; i < len; i++) {
				if(i%2===0) {
					resultHTMLleft += completeTemplate(data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);	
				}
				else {
					resultHTMLright += completeTemplate(data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);
				}
			}
			$('#totalCount').html(data.totalCount + '개');
			$('.products .left ul').html(resultHTMLleft);
			$('.products .right ul').html(resultHTMLright);
		}
	})
	
	$('.category ul li').on('click', function() {	// 람다 표현식으로 사용하는 경우, $(this)에 window 객체가 담기게 되므로 주의!
		var current = $(this).attr('id') || 0;		// e.target.id 의 경우엔 id 값이 없을 때, 0이 들어오는 반면
		$.ajax({									// $(this).attr('id') 의 경우엔, undefined 가 입력되므로 이를 0으로 초기화
			type: 'GET',
			url: 'api/products?categoryId=' + current,
			dataType: 'json',
			success: function(data) {
				startIndex = data.items.length;
				
				if($('.morePages').length === 0) {			// [수정요망] null 값으로는 검사할 수 없는지?
					$morePages.insertBefore('.topPage');
				}
				var resultHTMLleft = "";
				var resultHTMLright = "";
				let len = data.items.length;

				for(let i = 0; i < len; i++) {
					if(i%2===0) {
						resultHTMLleft += completeTemplate(data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);	
					}
					else {
						resultHTMLright += completeTemplate(data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);
					}
				}
				$('#totalCount').html(data.totalCount + '개');
				$('.products .left ul').html(resultHTMLleft);
				$('.products .right ul').html(resultHTMLright);
        	}
    	});
	});
	
	$('.morePages').on('click', function() {
		var current = $('.category ul li.on').attr('id') || 0;
		$.ajax({
			type: 'GET',
			url: 'api/products?categoryId=' + current + '&start=' + startIndex,
			dataType: 'json',
			success: function(data) {
				startIndex += data.items.length;
				
				var resultHTMLleft = "";
				var resultHTMLright = "";
				let len = data.items.length;

				for(let i = 0; i < len; i++) {
					if(i%2===0) {
						resultHTMLleft += completeTemplate(data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);	
					}
					else {
						resultHTMLright += completeTemplate(data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);
					}
				}
				$('.products .left ul').append(resultHTMLleft);
				$('.products .right ul').append(resultHTMLright);
				
				if(startIndex >= data.totalCount) {
					$morePages.detach();
					startIndex = data.items.length;
				}
			}
		})
	})
})