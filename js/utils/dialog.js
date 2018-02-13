/**
* woody
* date 20180212
* 弹出对话框 动画效果
*/
;(function(window,undefined){
	"use strict"; //启用js的严格模式
	var support = {animations:Modernizr.cssanimations}; //引用modernizr库的css模块
	//不同浏览器的动画结束事件
	var animEndEventNames = {
		'WebkitAnimation':'webkitAnimationEnd',
		'OAnimation':'oAnimationEnd',
		'msAnimation':'MSAnimationEnd',
		'animation':'animationend'
	};
	var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')]; //对于不同浏览器怎么判断如何选取相应的事件名称
	var onEndAnimation = function(el,callback){
		var onEndCallbackFn = function(event){
			//防止冒泡事件,event.target是不变的，this是变的
			if(support.animations){
				if(event.target != this)
				{
					return false;
				}
				this.removeEventListener(animEndEventName,onEndCallbackFn);
			}
			if(callback && typeof callback === 'function'){
				callback.call();
			}
		};
		if(support.animations)
		{
			el.addEventListener(animEndEventName,onEndCallbackFn);
		}else
		{
			onEndCallbackFn();
		}
	};
	function extend(a,b){
		for(var key in b){
			//Javascript中Object对象原型上的hasOwnProperty()用来判断一个属性是定义在对象本身而不是继承自原型链。
			if(b.hasOwnProperty(key))
			{
				a[key] = b[key];
			}
		}
		return a;
	}
	function DialogFx(el,options)
	{
		this.el = el;
		this.options = extend({},this.options);
		extend(this.options,options);
		this.ctrlClose = this.el.querySelector('[data-dialog-close]');
		this.isOpen = false;
		this._initEvents();
	}
	DialogFx.prototype.options = {
		//callback
		onOpenDialog:function(){return false},
		onCloseDialog:function(){return false}
	};
	DialogFx.prototype._initEvents = function(){
		var self = this;
		//close action
		this.ctrlClose.addEventListener('click',this.toggle.bind(this));

		//esc key close dialog
		document.addEventListener('keydown',function(event){
			var keyCode = event.keyCode || event.which; // 使用 which 或 keyCode, 这样可支持不同浏览器
			if(keyCode === 27 && self.isOpen)
			{
				self.toggle();
			}
		});
	};
	DialogFx.prototype.toggle = function(){
		var self = this;
		if(this.isOpen)
		{
			classie.remove(this.el,'dialog--open');
			classie.add(self.el,'dialog--close');
			onEndAnimation(this.el.querySelector('.dialog__content'),function(){
				classie.remove(self.el,'dialog--close');
			});
			//callback on close
			this.options.onCloseDialog(this);
		}
		else
		{
			classie.add(this.el,'dialog--open');
			//callback on open
			this.options.onOpenDialog(this);
		}
		this.isOpen = !this.isOpen;
	};
	//add to global namespace  将对象加到全局变量中
	window.DialogFx = DialogFx;
})(window);