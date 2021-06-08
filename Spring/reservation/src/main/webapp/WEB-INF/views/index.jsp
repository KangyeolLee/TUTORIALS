<%@ page language = "java" contentType = "text/html; charset = UTF-8" pageEncoding = "UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel = "stylesheet" href = "css/index.css" type = "text/css" />
	<title>네이버예약</title>
	<script src="https://code.jquery.com/jquery-3.3.1.js" ></script>
</head>

<body>
	<div class = wrapping>
		<div class = "header">
			<div id = "naverImg"></div>
			<span id = "userName">login@naver.com</span>
		</div>
		<div class = "promotion">
			<ul> <!--  style = "width: ${countPromotion * 600}px"--> <!-- [수정요망] width 값 자동으로 구해줘야 함 -->
				<!-- 프로모션 영역 사진은 thumbnail 사용 -->
				<c:forEach items = "${promotion }" var = "item">
					<li><img class = "slide" src = "${item.saveFileName}"></li>
				</c:forEach>
				<!--  
				<li><img class = "slide" src = "img/1_th_1.png"></li>
				<li><img class = "slide" src = "img/5_th_13.png"></li>
				<li><img class = "slide" src = "img/6_th_18.png"></li>
				<li><img class = "slide" src = "img/9_th_24.png"></li>
				<li><img class = "slide" src = "img/11_th_30.png"></li>
				<li><img class = "slide" src = "img/12_th_32.png"></li>
				<li><img class = "slide" src = "img/18_th_46.png"></li>
				<li><img class = "slide" src = "img/22_th_55.png"></li>
				<li><img class = "slide" src = "img/34_th_85.png"></li>
				<li><img class = "slide" src = "img/41_th_105.png"></li>
				<li><img class = "slide" src = "img/44_th_112.png"></li>
				-->
			</ul>
		</div>
		<div class = "category">
			<ul>
				<li class = "on">전체리스트</li>				
				<c:forEach items = "${categoryList }" var = "item">
					<li id = "${item.categoryId }">${item.name }</li>
				</c:forEach>				
				
				<!--  
				<li id = "show">전시</li>
				<li id = "musical">뮤지컬</li>
				<li id = "concert">콘서트</li>
				<li id = "classic">클래식</li>
				<li id = "theater">연극</li>
				-->
			</ul>
			<span>바로 예매 가능한 행사가 <font color = "red" id = "totalCount"></font> 있습니다</span>
		</div>
		
		<div class = "products">
			<div class = "left">
				<ul><!-- HTMLTemplate 으로 구현 --></ul>
			</div>
			<div class = "right">
				<ul><!-- HTMLTemplate 으로 구현 --></ul>
			</div>
		</div>
		<div class = "morePages">
			<div>더보기</div>
		</div>
		<div class = "topPage">
			↑ TOP
		</div>
		
		<footer>
			<p>네이버(주)는 통신판매의 당사자가 아니며, 상품의정보, 거래조건, 이용 및 환불 등과 관련한 의무와 책임은 각 회원에게 있습니다.</p>
			<span>© NAVER Corp.</span>
		</footer>
	</div>
		
	<script src = "js/sliding.js"></script>
	<script src = "js/categorySelect.js"></script>
	<script src = "js/htmlTemplate.js"></script>
	<script src = "js/topPage.js"></script>
	<script src = "js/redirect.js"></script>
	
	<!-- Template 자료 저장 부분 : Template Literal 을 활용 시 JSP EL 과 충돌나는 부분 때문에 정적인 데이터 보관을 떼어내기 어려움
	<script id = "template" type = "text/template">		
		<li>
			<div class = "productListwrapper">
				<img class = "productList" src = ${ '${saveFileName}' }">
				<span class = "description"> ${ '${description}' } </span>			
				<span class = "placeName"> ${ '${placeName}' } </span>
				<span class = "content"> ${ '${content}' } </span>
			</div>	
		</li>
	</script>
	-->
</body>

</html>
