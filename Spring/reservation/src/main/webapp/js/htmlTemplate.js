// 람다 표현식으로 선언된 function
completeTemplate= (displayInfoId, saveFileName, description, placeName, content) => {			
	/*																			// [수정불가] 정적인 템플릿은 다른 곳에 보관하는 것이 좋음
	var html = document.querySelector('#template').innerText;					// Template Literal 을 활용 시 JSP EL 과 충돌나는 부분 때문에 
	return `html : ${description} ${html}`;										// 정적인 데이터 보관을 떼어내기 어려움
	*/
	
	return `
		<li>
			<div class = "productListwrapper">
				<a href = "http://localhost:8080/reservationservice/detail?id=${displayInfoId}">
					<img class = "productList" src = "${saveFileName}">
					<span class = "description"> ${description} </span>			
					<span class = "placeName"> ${placeName} </span>
					<span class = "content"> ${content} </span>
				</a>
			</div>	
		</li>
	`
}

/*
function callingAjax() {
	xhr.open('GET', 'api/products');
	xhr.onreadystatechange = doingAjax();
	xhr.send();
}
function doingAjax() {
	if(xhr.status === 200 && xhr.readyState === 4) {
		var data = JSON.parse(this.responseText);
		var checkMorePages = document.querySelector(".morePages");
			
		if(checkMorePages === null) {
			document.querySelector('.topPage').insertAdjacentElement("beforeBegin", morePages);
		}
			
		var resultHTMLleft = "";
		var resultHTMLright = "";
		let len = data.items.length;
			
		for(let i = 0; i < len; i++) {
			if(i%2===0) {
				resultHTMLleft += completeTemplate(data.item[i].id, data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);	
			}
			else {
				resultHTMLright += completeTemplate(data.item[i].id, data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);
			}
		}
		document.querySelector("#totalCount").innerHTML = data.totalCount + "개";
		document.querySelector(".products > .left > ul").innerHTML= resultHTMLleft;
		document.querySelector(".products > .right > ul").innerHTML = resultHTMLright;
	}
}
*/		// XMLHttpRequest() 부분을 독립적으로 함수로 만들어 구현해 볼 것

/*		//////////////////////////////////////////////////////////////// 자바스크립트 부분 (정상작동 함)
document.addEventListener('DOMContentLoaded', function() {
	var el = document.querySelector(".category ul");
	var morePages = document.querySelector(".morePages");
	var startIndex = 4;		// [ 수정요망 ] 자동으로 값을 구해볼 수 있도록 변경해야함
	var xhr = new XMLHttpRequest();
	
	if(document.querySelector('.category ul li.on') !== null) {		// 첫 실행 시 전체리스트를 기본값으로 출력하는 부분
		xhr.onreadystatechange = function() {
			if(xhr.status === 200 && xhr.readyState === 4) {
				var data = JSON.parse(this.responseText);
				
				var checkMorePages = document.querySelector(".morePages");					
				if(checkMorePages === null) {
					document.querySelector('.topPage').insertAdjacentElement("beforeBegin", morePages);
				}
				
				var resultHTMLleft = "";
				var resultHTMLright = "";
				let len = data.items.length;
				
				for(let i = 0; i < len; i++) {
					if(i%2===0) {
						resultHTMLleft += completeTemplate(data.item[i].id, data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);	
					}
					else {
						resultHTMLright += completeTemplate(data.item[i].id, data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);
					}
				}
				document.querySelector("#totalCount").innerHTML = data.totalCount + "개";
				document.querySelector(".products > .left > ul").innerHTML= resultHTMLleft;
				document.querySelector(".products > .right > ul").innerHTML = resultHTMLright;
			}
		}
		xhr.open('GET', 'api/products');
		xhr.send();
	}
	
	el.addEventListener('click', function(e) {
		if(e.target.tagName === 'LI') {		
			xhr.onreadystatechange = function() {
				if(xhr.status === 200 && xhr.readyState === 4) {
					var data = JSON.parse(this.responseText);
					startIndex = data.items.length;		// 도중에 다른 버튼 클릭 시 startIndex 값이 초기화되어 정상 작동하도록 설정
					
					var checkMorePages = document.querySelector(".morePages");					
					if(checkMorePages === null) {
						document.querySelector('.topPage').insertAdjacentElement("beforeBegin", morePages);
					}
					
					var resultHTMLleft = "";
					var resultHTMLright = "";
					let len = data.items.length;
					
					for(let i = 0; i < len; i++) {
						if(i%2===0) {
							resultHTMLleft += completeTemplate(data.item[i].id, data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);	
						}
						else {
							resultHTMLright += completeTemplate(data.item[i].id, data.items[i].saveFileName, data.items[i].description, data.items[i].placeName, data.items[i].content);
						}
					}
					document.querySelector("#totalCount").innerHTML = data.totalCount + "개";
					document.querySelector(".products > .left > ul").innerHTML = resultHTMLleft;
					document.querySelector(".products > .right > ul").innerHTML = resultHTMLright;
				}
			}
			xhr.open('GET', 'api/products?categoryId=' + e.target.id);
			xhr.send();
		}
		
	});
	
	morePages.addEventListener('click', function(e) {
		var currentCategoryId = document.querySelector(".category ul li.on").id;
		xhr.onreadystatechange = function() {
			if(xhr.status === 200 && xhr.readyState === 4) {
				var data = JSON.parse(this.responseText);
			
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
				document.querySelector(".products > .left > ul").innerHTML += resultHTMLleft;
				document.querySelector(".products > .right > ul").innerHTML += resultHTMLright;
				
				if(startIndex >= data.totalCount) {
					e.target.parentElement.remove();
					startIndex = data.items.length;
				}
			}
		}
		xhr.open('GET', 'api/products?categoryId='+currentCategoryId+'&start='+startIndex);
		xhr.send();
	});
});
*/

/////////////////////////////////////////////////////// 자바스크립트 부분을 JQuery 로 대체!
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
			// for 문이 아닌 forEach 를 이용해 구현 ==> for 문을 이용한 구현은 ajaxJquery.js 파일에 보존		
			data.items.forEach((element, index) => {
				if(index % 2 === 0) {
					resultHTMLleft += completeTemplate(element.id, element.saveFileName, element.description, element.placeName, element.content);
				} else {
					resultHTMLright += completeTemplate(element.id, element.saveFileName, element.description, element.placeName, element.content);		
				}
			});
			
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
				
				data.items.forEach((element, index) => {
					if(index % 2 === 0) {
						resultHTMLleft += completeTemplate(element.id, element.saveFileName, element.description, element.placeName, element.content);
					} else {
						resultHTMLright += completeTemplate(element.id, element.saveFileName, element.description, element.placeName, element.content);		
					}
				});
				
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
				
				data.items.forEach((element, index) => {
					if(index % 2 === 0) {
						resultHTMLleft += completeTemplate(element.id, element.saveFileName, element.description, element.placeName, element.content);
					} else {
						resultHTMLright += completeTemplate(element.id, element.saveFileName, element.description, element.placeName, element.content);		
					}
				});
				
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