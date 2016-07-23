var $ = Zepto = require("./framework/zepto.js");
var Swiper = require("./framework/swiper.jquery.js");


$(function(){
	//音乐开始和暂停
	$("header img").tap(function(){
		if ($("audio")[0].paused) {
			$("audio")[0].play();
			this.style.animationPlayState = "running";
		}
		else{
			$("audio")[0].pause();
			this.style.animationPlayState = "paused";
		}
		
	});
	//上下切换滑动
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'vertical',
	    watchSlidesProgress : true,
		watchSlidesVisibility : true,
	    effect: 'flip',
	    onTouchStart: function(swiper,even){
	      console.log(swiper.slides[0].progress);
	    }
	    
	    
	  }); 
	  mySwiper.progress;
		mySwiper.slides[2].progress;      
	console.log(mySwiper.slides[0].progress);
});





























