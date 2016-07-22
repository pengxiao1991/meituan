/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	$(function(){
		//返回顶部
		
		
		$("#top").on("tap",function(e){
			
			var start = $(window).scrollTop();
			var timer = setInterval(function(){
				
				var speed = (0-start)/5;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				if (speed==0) {
					
					clearInterval(timer);
					
					return;
					
				} else{
					start = start+speed;
					$(window).scrollTop(start);
					
				}
			},20);
			
		});
		
		//滚动一段距离后显示回到顶部按钮
		$(window).scroll(function(){
			if ($(this).scrollTop()>=1) {
				$("#top").show();
			} else{
				$("#top").hide();
			}
		});
		$(window).scroll();
		//点击后切换分类tab
		$("nav ul li").tap(function(e){
			//如果已经是被点击状态就将覆盖层隐藏
			if ($(this).hasClass("on")) {
				$(this).removeClass("on");
				$("#cover").hide();
				
			}
			else{
				//选中当前的点击项，同时取消其他项的选中
				$(this).addClass("on").siblings().removeClass("on");
				//显示覆盖层
				$("#cover").show();
				//显示覆盖层对应分类tab的内容
				$("#cover>div").eq($(this).index()).addClass("on").siblings().removeClass("on");
			
			}
			
			
		});
		
		//判断是否是swipe事件
		var flag_isSwipe = false;
		//注册touchend事件，同时阻止默认行为可阻止click事件
		$("#cover").on("touchend",function(e){
			var that = this;
			
			setTimeout(function(){
				//e.preventDefault(); 
				if (!flag_isSwipe&&e.target==that) {
					$(that).hide();
					$("nav ul li").removeClass("on");

				}
				flag_isSwipe = false;
			
			},10);
			
		});
		$("#cover").on("touchmove",function(e){
			flag_isSwipe = true;
		});
		
		
	});


/***/ }
/******/ ]);