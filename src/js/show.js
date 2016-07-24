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
	//
	//上下切换滑动

	//当前所在li的之前li的索引
	
	
	var pre_index = 0;
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'vertical',
	    
	    effect: 'flip',
	    
	    onTransitionEnd: function(swiper){
	    	if (swiper.activeIndex!=pre_index) {
	    		
	    		$("li").eq(swiper.activeIndex).find(".animated").removeClass("flag");
	    		$("li").eq(pre_index).find(".animated").addClass("flag");
	    		

	    		
	    		
	    		pre_index = swiper.activeIndex;
	    	}
	      

	    },
	    flip: {
            slideShadows : false,
            limitRotation : true,
        }


	    
	  }); 
	      
	//最后一个li的点击事件
	// $("li:last-child").tap(function(e){
	// 	if (e.target==) {}
	// });
});





























