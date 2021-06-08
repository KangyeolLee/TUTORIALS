<%@ page language = "java" contentType = "text/html; charset = UTF-8" pageEncoding = "UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel = "stylesheet" href = "css/index.css" type = "text/css" />
	<title>네이버예약</title>
	<script src="https://code.jquery.com/jquery-3.3.1.js" ></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.1.2/handlebars.min.js"></script>
	
	<script type = "template" id = "slideImage">
		<li value = {{index}}><img class = "slide" src = "{{saveFileName}}"></li>
	</script>
	<script type = 'template' id = "commentsTemplate">
		<h3> {{title}} </h3>
		<p> {{comment}} </p>
		<span id = "userScore"> {{score}} </span>
		<span id = "userName"> {{reservationEmail}} </span>
		<span id = "userDate"> {{reservationDate}} 방문 </span>
	</script>
	<script type = "template" id = "specInfoTemplate">
		<h3>[소개]</h3>
		<p class = "descript_content">{{content}}</p>
		<h3>[공지사항]</h3>
		<img id = "infoImage" src = "img/information.jpg">
	</script>
	<script type = "template" id = "navigationTemplate">
		<img id = "mapImage" src = "{{saveFileName}}">
		<h3>{{description}}</h3>
		<span>{{placeStreet}}</span>
		<span>{{placeLot}}</span>
		<span>{{placeName}}</span>
		<span>{{tel}}</span>
		<div class = "container">
			<div class = "rightDividing" style = "border-right: 1px solid gray;">길찾기</div>
			<div>내비게이션</div>
		</div>
	</script>
</head>
<body>
	<div class = "wrapping" id = "${displayInfoId}">
		<div class = "header">
			<div id = "naverImg"></div>
			<span id = "userName">login@naver.com</span>
		</div>
		<div class = "productImage">
			<ul class = "bannerImage"></ul>
			<span id = "product_counts"><font color = "white" id = "curCount">1</font> <font id = "slash">/</font> <font id = "counts"></font></span>
			<span id = "leftBtn"> &lt; </span>
			<span id = "rightBtn"> &gt; </span>
			<span id = "product_title"> title </span>
		</div>
		<div class = "productContent">
			<div id = "showContents"> <p class = 'descript_content'></p> </div>
			<div class = "showMore"> 펼쳐보기 </div>
		</div>
		<div class = "event">
			<div class = "LayerEffectAfter"> 이벤트 정보 </div>
			<div> 
				<span>[네이버예약 특별할인]</span>
				<span>R석 50%, S석 60% 할인</span>
			</div>
		</div>
		<div class = "reservation"> 예매하기 </div>
		<div class = "review">
			<div> 예매자 한줄평 </div>
			<div class = "LayerEffectAfter"> 
				<span> 4.2 / 5 </span> 
				<span> 52건 등록 </span> 
			</div>
			<div class = "reviewContainer"> 
				<span class = "afterSetting"> 아직 예매자 한줄평이 없습니다... </span>
		<%-- 	<h3> 뮤지컬 로미오와 줄리엣 </h3>
				<p> 2층이었는데 꽤잘보여서 좋았다 </p>
				<span id = "userScore"> 4.0 </span>
				<span id = "userName"> hhhh**** </span>
				<span id = "userDate"> 2017.04.27 </span>	--%>	
			</div>
			
			
			<span class ="bottomSetting"> 네이버 예약을 통해 실제 방문한 이용자가 남긴 평가입니다. </span>
			<div class = "moreReviews"> 예매자 한줄평 더보기 </div>
			
					
		</div>
		<div class = "moreInfos">
			<div class ="tabUI">
				<ul>
					<li id = "specInfo" class ="on"> </li>
					<li id = "navigation"> </li>
				</ul>
			</div>
			<div id = "printInfo">
				<h3>[소개]</h3>
				<p class = "descript_content"></p>
				<h3>[공지사항]</h3>
				<img id = "infoImage" src = "img/information.jpg">
			</div>
		</div>
		
		<div class = "topPage">
			↑ TOP
		</div>
		
		<footer>
			<p>네이버(주)는 통신판매의 당사자가 아니며, 상품의정보, 거래조건, 이용 및 환불 등과 관련한 의무와 책임은 각 회원에게 있습니다.</p>
			<span>© NAVER Corp.</span>
		</footer>
	</div>
	
	<script src = "js/topPage.js"></script>
	<script src = "js/detailTemplate.js"></script>
	<script src = "js/redirect.js"></script>
	<script src = "js/showMore.js"></script>
</body>
</html>