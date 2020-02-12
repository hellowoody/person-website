var app = new Vue({
	el:"#app",
	data:{
	}
});

;(function(window,undefined){
	var dialogTriggle = document.querySelector('[data-dialog]');
	var awesomeDialog = document.getElementById(dialogTriggle.getAttribute('data-dialog'));
	var dialog = new DialogFx(awesomeDialog);
	dialogTriggle.addEventListener('click',dialog.toggle.bind(dialog));
})(window);

function jump(url){
	window.open(url) 
}