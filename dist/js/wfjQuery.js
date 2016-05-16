$(window).on('load',function(){
	waterfall();
	$(window).on('scroll',function(){
		if(checkIsLoad()){
			//可以加载图片
			var dataList={"img":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'}]};
			var $boxs=$('#main>div');
			$.each(dataList.img,function(key,value){
				var oBox=$('<div>').addClass('box').appendTo($('#main'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				$('<img>').attr('src','../images/'+value.src).appendTo($(oPic));

			});
			waterfall();
		}
	})
});
function waterfall(){
	var $boxs=$('#main>div');
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	//设置main的宽度
	$('#main').width(w*cols).css('margin','0 auto');
	var colArr=[];//存放每一列的高度信息
	$boxs.each(function(index,value){
		var height=$boxs.eq(index).outerHeight();
		if(index<cols){
			colArr.push(height);
		}else{
			//进行第二行元素的排列
			var minH=Math.min.apply(null,colArr);
			//设置第二行以后的每一张图片的坐标
			var minIndex = $.inArray(minH,colArr);
			$(value).css({
				'position':'absolute',
				'left':minIndex*w+'px',
				'top':minH+'px'
			});
			//更新colArr中的高度信息
			colArr[minIndex] += height; 
		}
	});
}
//检查是否加载图片
function　checkIsLoad(){
	var lastBox=$('#main>div').last();
	//获取最后一个图片的距离
	var lastBoxH=lastBox.offset().top+Math.floor(lastBox.outerHeight()/2);

	var scrollTop=$(window).scrollTop();
	var height=$(window).height();
	return lastBoxH<scrollTop+height;
}