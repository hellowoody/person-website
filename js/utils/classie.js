/**
* date 20180212
* 工具
*/
;(function(window,undefined){
	'use strict';
	function classReg(className){
		// \是转义符 所以 \\s 相当于 \s
		//  ^|\s+ 代表开头或是至少有一个空格
		return new RegExp("(^|\\s+)"+className+"(\\s+|$)");  
	}
	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	// 虽然是公平的，因为它的API将不会接受多个class类在一次
	var hasClass,addClass,removeClass;
	if('classList' in document.documentElement)
	{
		hasClass = function(el,c){
			return el.classList.contains(c);
		};
		addClass = function(el,c){
			el.classList.add(c);
		};
		removeClass = function(el,c){
			el.classList.remove(c);
		};
	}
	else
	{
		hasClass = function(el,c){
			return classReg(c).test(el.className)
		};
		addClass = function(el,c){
			if(!hasClass(el,c))
			{
				el.className = el.className + ' ' + c;
			}
		};
		removeClass = function(el,c){
			el.className = el.className.replace(classReg(c),'');
		};
	}
	function toggleClass(el,c){
		var fn = hasClass(el,c) ? removeClass : addClass ;
		fn(el,c);
	};
	var classie = {
		//full name
		hasClass:hasClass,
		addClass:addClass,
		removeclass:removeClass,
		toggleClass:toggleClass,
		//short name
		has:hasClass,
		add:addClass,
		remove:removeClass,
		toggle:toggleClass
	};
	//umd
	if(typeof define === 'function' && define.amd)
	{
		//amd
		define(classie);
	}
	else{
		//browser global
		window.classie = classie;
	}
})(window);