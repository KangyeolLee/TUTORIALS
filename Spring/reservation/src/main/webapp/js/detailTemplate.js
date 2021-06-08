$(function() {
	var displayInfoId = $('.wrapping').attr('id');

	$.ajax({
		type: 'GET',
		url: 'api/products/' + displayInfoId + "",
		dataType: 'json',
		success: function(data) {
			console.log(data);
			
			var bannerImage = {
					bannerArray : data.productImages.filter(function(v) {
						return v.type === 'ma' || v.type === 'et';
					}).map((v, i) => {
						var obj = { 'saveFileName' : v.saveFileName, 'index' : (i + 1) }
						return obj;
					}), 
					templating : function() {
						var template = document.querySelector("#slideImage").innerText;
						var bindTemplate = Handlebars.compile(template);
						var result = '';

						this.bannerArray.forEach(function(e) {
							result += bindTemplate(e);							
						});			
						return result;
					},
					counts : function() {
						return this.bannerArray.length;
					}
			}
			document.querySelector('.bannerImage').innerHTML = bannerImage.templating();
			document.querySelector('#product_counts').setAttribute('value', bannerImage.counts());
			document.querySelector('#product_counts #counts').innerHTML = bannerImage.counts();

			var productImages = {
					len : document.querySelectorAll(".bannerImage .slide").length,
					width : 600,
					height : 600,
					style : function() {
						$(".bannerImage").css({ width : this.width * this.len });
						$(".bannerImage .slide").css({ width : this.width, height : this.height });
					}
			};
			productImages.style();
			
			var buttonSlide = {
					elementForDelegation : document.querySelector('.productImage'),
					image : document.querySelector('.bannerImage'),
					counts : document.querySelector('#product_counts'),
					curCount : document.querySelector('#product_counts #curCount'),
					click : function() {
						var direction = 1;

						if(document.querySelectorAll('.slide').length > 1) {
							this.elementForDelegation.addEventListener('click', (e) => {
								if(e.target.id === "leftBtn") {
									if(direction === 1) {
										this.image.appendChild(this.image.firstElementChild);
										this.elementForDelegation.style.justifyContent = 'flex-end';
									}
									
									
									this.image.style.marginRight = -600;
									direction = 0;
								} else if(e.target.id === "rightBtn") {									
									if(direction === 0) {
										this.image.prepend(this.image.lastElementChild);
										this.elementForDelegation.style.justifyContent = 'flex-start';
									}
									this.image.style.marginLeft = -600;
									direction = 1;
								}
								
							});
							this.image.addEventListener('transitionend', () => {
								var index;
								if(direction === 0) {
									this.image.prepend(this.image.lastElementChild);																
									this.image.style.marginRight = 0;
									index = this.image.lastElementChild.getAttribute('value')
								
								} else if(direction === 1) {
									this.image.append(this.image.firstElementChild);
									this.image.style.marginLeft = 0;
									index = this.image.firstElementChild.getAttribute('value')
								}	
								this.image.style.transition = 'none';
								this.curCount.innerHTML = index;
								setTimeout(() => {
									this.image.style.transition = 'all 1s ease-out';
								});
							});
						} else {
							document.querySelector('#leftBtn').remove();
							document.querySelector('#rightBtn').remove();
						}
					}	
			}
			buttonSlide.click();
			
			var review = {
					comments : data.comments.map((e) => {
						var obj = { 'title' : data.displayInfo.description, 
								'comment' : e.comment,
								'score' : e.score,
								'reservationEmail' : e.reservationEmail,
								'reservationDate' : e.reservationDate };
						return obj;													
					}),
					templating : function() {
						if(this.comments.length) {
							var template = document.querySelector("#commentsTemplate").innerText;
							var bindTemplate = Handlebars.compile(template);
							var result = '';

							this.comments.forEach(function(e, i) {
								if(i<3) {
									result += bindTemplate(e);		
								}												
							});			
							document.querySelector(".reviewContainer").innerHTML = result;
						}			
					}	
			}
			review.templating();
			
			var tabUI = {
					tab : document.querySelector('.tabUI'),
					onTabClick : function(e) {
						let activatedTab = document.querySelectorAll('.on');
						activatedTab.forEach((v) => {
							v.className = v.className.replace('on', '');
					    });

						if(e.target.tagName === "LI") {
							e.target.classList.add('on')
					    }
						
						//if(e.target.id === "specInfo") {
						//	console.log("hallo")
						//} else if(e.target.id === "navigation") {
						//	console.log(this.activatedTab);
						//	console.log(e);
						//}	
					},
					selected : function() {
						this.tab.addEventListener('click', this.onTabClick, false);
					}
			}
			tabUI.selected();
			
			var navigation = {
					tab : document.querySelector('.tabUI'),
					info : {
						'saveFileName' : data.displayInfoImages[0].saveFileName,
						'description' : data.displayInfo.description,
						'placeStreet' : data.displayInfo.placeStreet,
						'placeLot' : data.displayInfo.placeLot,
						'placeName' : data.displayInfo.placeName,
						'tel' : data.displayInfo.tel,
						'content' : data.displayInfo.content
					},
					templating : function(e) {					
						if(e.target.id === "navigation") {
							let template = document.querySelector("#navigationTemplate").innerText;
							let bindTemplate = Handlebars.compile(template);
							
							document.querySelector('#printInfo').innerHTML = bindTemplate(this.info);
						}
						else if(e.target.id === "specInfo") {
							let template = document.querySelector("#specInfoTemplate").innerText;
							let bindTemplate = Handlebars.compile(template);
							
							document.querySelector("#printInfo").innerHTML = bindTemplate(this.info);
						}
					},					
					selected : function() {					
						this.tab.addEventListener('click', function(e) {
							if(e.target.id === "specInfo") {
								console.log("A")
								navigation.templating(e);
								
							} else if(e.target.id === "navigation") {
								console.log("B")
								navigation.templating(e);
							}
						});
					}
			}
			navigation.selected();
			
			var productDescription = {
					title : document.querySelector('#product_title'),
					contents : document.querySelectorAll('.descript_content'),
					insertData : function() {
						this.title.innerHTML = data.displayInfo.description;
						this.contents.forEach((e) => {
							e.innerHTML = data.displayInfo.content;
						});
					}
			}
			productDescription.insertData();
		}
	});
});