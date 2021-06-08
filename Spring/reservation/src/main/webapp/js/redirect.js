document.addEventListener('DOMContentLoaded', function() {
	var redirecting = {
			el : document.querySelector("#naverImg"),
			click : function() {
				this.el.addEventListener('click', () => {
					location.replace('/reservationservice');
				});
			}
	}
	
	redirecting.click();
});