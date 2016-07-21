//导入zepto部分
var $ = Zepto = require("./framework/zepto.js");
//导入swipe部分
var Swiper = require("./framework/swiper.jquery.js");
//导入iscroll部分
var IScroll = require("./framework/iscroll.js");
$(function(){
	//屏幕滑动
	var mySwiper = new Swiper('.swiper-container', {
		//autoplay: 3000,//可选选项，自动滑动
		pagination : '.swiper-pagination',
		paginationClickable:true
	});
	//返回顶部
	
	$("#top").tap(function(e){
		
		var speed,start = $(window).scrollTop();
		var timer = setInterval(function(){
			
			speed = (0-start)/5;
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
		if ($(this).scrollTop()>=40) {
			$("#top").show();
		} else{
			$("#top").hide();
		}
	});
	$(window).scroll();
	
		
});
