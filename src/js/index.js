//导入zepto部分
var $ = Zepto = require("./framework/zepto.js");
//导入swipe部分
var Swiper = require("./framework/swiper.jquery.js");
//导入基于jquery或zepto的懒加载插件
require("./plugins/jquery-jdLoad.js");

//导入iscroll部分
var IScroll = require("./framework/iscroll.js");











//注入微信的config
$.post("http://pxdanwei.applinzi.com/php/getsign.php",{"url":location.href},function(data){
        var start = data.indexOf("{");
        var end  = data.indexOf("}");
        var objData = data.slice(start,end+1);
        objData = JSON.parse(objData);
        console.log(objData);
      	wx.config({
            debug: true,
            appId: objData.appId,
            timestamp: objData.timestamp,
            nonceStr: objData.nonceStr,
            signature: objData.signature,
            jsApiList: [
              // 所有要调用的 API 都要加到这个列表中
              "chooseImage","scanQRCode"
            ]
        });
      	
        
 });

$(function(){
	
	
	//微信接口调用，选择图片接口和二维码扫描接口
	wx.ready(function(){
		//头像按钮点击后调用微信接口
		$(".header-r").tap(function(){
			wx.chooseImage({
			    count: 1, // 默认9
			    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			    success: function (res) {
			        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			    	//图片处理代码
			    }
			});
		});
	});
	$.ajax({
		"type":"get",
		"url":"../mock/goods.json",
		"dataType":"json",
		"async":true,
		"success":function(data){
			//给需要懒加载的列表内容注册事件
			$("#like li").each(function(index){
				
				var that = this;
				$(this).jdLoad(function(){
					if (data["goods"+(index+1)].nobespeak) {
						$(that).find("div.fl").addClass("no");
					}
					$(that).find("div.fl img")[0].src = "img/"+data["goods"+(index+1)].src;
					$(that).find("h3").html(data["goods"+(index+1)].title);
					$(that).find("div.fl").next().next("span").html(data["goods"+(index+1)].description);
					$(that).find("p>b").html(data["goods"+(index+1)].price);
					$(that).find("p>span").html(data["goods"+(index+1)].oldprice);
					$(that).find("p>i>span").html(data["goods"+(index+1)].sales);
				});	

			});
		
		$(window).scroll();

		},
		"complete":function(data){console.log(data);}
	
	});
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
