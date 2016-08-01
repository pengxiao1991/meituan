//导入zepto部分
var $ = Zepto = require("./framework/zepto.js");
//导入swipe部分
var Swiper = require("./framework/swiper.jquery.js");
//导入iscroll部分
var iScroll = require("./framework/iscroll-probe.js");

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
              "scanQRCode","openLocation","getLocation"
            ]
        });
      
});














$(function(){
	 var current_latitude,current_longitude,current_speed,current_accuracy;
	//微信的config注入完毕后
	wx.ready(function(){
		//微信接口调用，点击扫扫激活二维码扫描接口
		$("header b span:last-child").tap(function(){
			wx.scanQRCode({
			    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			    success: function (res) {
				    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					//扫描完毕后执行
				}
			});
		});
		wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    current_latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    current_longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    current_speed = res.speed; // 速度，以米/每秒计
                    current_accuracy = res.accuracy; // 位置精度
                    $("#thelist ul li p a").each(function(index){
                        var location = JSON.parse(this.lastChild.value);
                        this.innerHTML = GetDistance(location.latitude,location.longitude,current_latitude,current_longitude)+"千米/"+this.firstChild.data;
                        //GetDistance(data[pro].location.latitude,data[pro].location.longitude,current_latitude,current_longitude)+"千米/")+data[pro].region
                    	console.log(this.firstChild);
                        console.log(this.lastChild.value);
                    });
                }
        });
	});

	
	 //进行经纬度转换为距离的计算

    function Rad(d){
        
       return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
        
    }
    //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
    function GetDistance(lat1,lng1,lat2,lng2){
 
        var radLat1 = Rad(lat1);
        var radLat2 = Rad(lat2);
        var a = radLat1 - radLat2;
        var  b = Rad(lng1) - Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s *6378.137 ;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000; //输出为公里
        //s=s.toFixed(4);
        return s;
    }





	//上滑加载和下拉刷新部分
	var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset;
	//generatedCount = 0;
	//在顶部执行下拉后，执行刷新操作
	function pullDownAction() {
		console.log(9);
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			
			var el = document.getElementById('thelist');

			// for (i=0; i<3; i++) {
			// 	li = document.createElement('ul');
			// 	li.innerText = 'Generated row ' + (++generatedCount);
			// 	el.insertBefore(li, el.childNodes[0]);
			// }
			myScroll.scrollTo(0, -pullDownOffset, 1, iScroll.utils.ease.quadratic);
			
			$(el).prepend(getShopData());
			//alert(1);
			myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
			//myScroll.scrollTo(0, myScroll.maxScrollY+pullUpOffset, 1, iScroll.utils.ease.quadratic);
		}, 1);	// <-- Simulate network congestion, remove setTimeout from production!
	}

	//在底部执行上拉后，执行加载操作，实际上只是发送的请求不同或者是对请求返回的数据 处理不同
	function pullUpAction () {
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			
			var el = document.getElementById('thelist');

			// for (i=0; i<3; i++) {
			// 	li = document.createElement('ul');
			// 	li.innerText = 'Generated row ' + (++generatedCount);
			// 	el.appendChild(li, el.childNodes[0]);
			// }
			
			$(el).append(getShopData());
			//alert(2);
			myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
			//myScroll.scrollTo(0, myScroll.maxScrollY+pullUpOffset, 1, iScroll.utils.ease.quadratic);
		}, 1);	// <-- Simulate network congestion, remove setTimeout from production!
	}

	//页面加载完后执行的事件，主要是iscroll的初始化
	function loaded() {
		pullDownEl = document.getElementById('pullDown');
		pullDownOffset = pullDownEl.offsetHeight;
		pullUpEl = document.getElementById('pullUp');	
		pullUpOffset = pullUpEl.offsetHeight;
		//pullDownEl.style.marginTop = -pullDownOffset+"px";
		//pullUpEl.style.marginBottom = -pullUpOffset+"px";
		myScroll = new iScroll("#wrapper",{
			useTransition: true,
			topOffset: pullDownOffset,
			//vScrollbar:false,
			probeType:3
		});
		//隐藏顶部的刷新图片和文字
		console.log(-pullDownOffset);
		myScroll.scrollTo(0, -pullDownOffset, 1, iScroll.utils.ease.quadratic);
			//dom节点改变后，刷新iscroll的数据
			
			myScroll.on("refresh",function () {
				console.log(1);
				if (pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				} else if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				}
			});
			//滚动过程中发生的事件，主要是边界判断
			myScroll.on("scroll",function () {
				
				
				if (this.y > -pullDownOffset+5 && !pullDownEl.className.match('flip')) {
					console.log(3);
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
					
				} else if (this.y < -pullDownOffset-5 && pullDownEl.className.match('flip')) {
					console.log(4);
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
					
				} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
					
				} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
					
				}
				else{
					return;

				}
			});
			//滚动完毕后，判断执行上拉加载还是下拉刷新事件
			myScroll.on("scrollEnd",function () {
				console.log(5);
				if (pullDownEl.className.match('flip')) {
					
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
					pullDownAction();	// Execute custom function (ajax call?)
				} else if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
					pullUpAction();	// Execute custom function (ajax call?)
				}
			});
		
		
		//setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
	}


	loaded();
	//获取店铺信息，并将其拼接成html字符串
	function getShopData(){
		var html = "";
		var li_html = "";
		$.ajax({
			"type":"get",
			"url":"../mock/shop.json",
			"dataType":"json",
			"async":false,
			"error":function(data){console.log(data);console.log(1);},
			"success":function(data){
				html = "";
				for(var pro in data){
					$.ajax({
						"type":"get",
						"url":"../mock/goods.json",
						"dataType":"json",
						"async":false,
						"success":function(li_data){
							li_html = "";
							for (var i = 0; i < data[pro].goods.length; i++) {
								li_html+="<li>"
												+"<a class=\"clear\" href=\"\">"
												+"<div class=\"fl\">"
													+"<img src=\"img/"+li_data["goods"+data[pro].goods[i]].src+"\"/>"
													
												+"</div>"
												+"<h3>"+li_data["goods"+data[pro].goods[i]].title+"</h3>"
												+"<span>"+li_data["goods"+data[pro].goods[i]].description+"</span>"
												+"<p class=\"clear\"><b>"+li_data["goods"+data[pro].goods[i]].price+"</b>"
													+"门市价:<span>"+li_data["goods"+data[pro].goods[i]].oldprice+"</span>元<i class=\"fr\">已售<span>"+li_data["goods"+data[pro].goods[i]].sales+"</span></i></p>"
											+"</a>"
										+"</li>";
								
							}
						}
					});
					html+="<ul>"
								+"<li>"
									+"<h4>"+data[pro].name+""
									+(data[pro].quan?"<i>券</i>":"")
									+(data[pro].tuan?"<i>团</i>":"")
									+(data[pro].wai?"<i>外</i>":"")
									+"</h4>"
									+"<p class=\"clear\"><i class=\"iconfontl icon-xingxing\"></i>"
									+"<i class=\"iconfontl icon-xingxing\"></i>"
									+"<i class=\"iconfontl icon-xingxing\"></i>"
									+"<i class=\"iconfontl icon-xingxing\"></i>"
									+"<i class=\"iconfontl icon-banxing01\"></i><span>"+data[pro].level+"</span><a  class=\"fr\">"+(current_latitude==undefined?"":GetDistance(data[pro].location.latitude,data[pro].location.longitude,current_latitude,current_longitude)+"千米/")+data[pro].region+"<input type=hidden value='"+JSON.stringify(data[pro].location)+"'/></a></p>"
								+"</li>"
								+li_html
								+"<li>"
									+"<span>查看其他1条团购</span>"
								+"</li>"
							+"</ul>";
				}
				
			}
		});
		return html;
	}
	//店铺列表信息初始化
	$("#thelist").html(getShopData());
	myScroll.refresh();


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
	//动态获取覆盖层的高度
	$("#cover").css({
		"height":$("#wrapper").height()
	});
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
