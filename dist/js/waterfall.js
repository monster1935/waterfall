window.onload=function(){
	waterfall();
	//监听onscroll事件，实现随着滚动条的下拉不断加载从后台来的数据
	//模拟来自后台的数据
	var dataList={"img":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'}]};
	window.onscroll=function(){
		if(checkIsLoad()){
			//判断当前页面内容的最后一张图片是否已经进入窗口视图的一半，如果是的话进行加载
			var oParent = document.getElementById('main');
			for(var i=0;i<dataList.img.length;i++){
				var oBox = document.createElement('div')
				oBox.className = 'box';
				oParent.appendChild(oBox);

				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);

				var oImg=document.createElement('img');
				oImg.src="../images/"+dataList.img[i].src;
				oPic.appendChild(oImg);

			}		
			waterfall();	
		}

	};
};

function waterfall(){
	console.log('start!');
	//首先取到所有的box的集合
	var boxArr=document.getElementsByClassName('box');

	//获取每一个box的宽度
	var boxW=boxArr[0].offsetWidth;
	//获取屏幕的视图宽度
	var clientW=document.documentElement.clientWidth;
	var cols=Math.floor(clientW/boxW);

	//设置div#main的宽度
	
	var oMain=document.getElementById('main');
	oMain.style.cssText='width:'+boxW*cols+'px;margin:0 auto';


	//定义一个数组用来存储每一列的高度
	var colArr=[];
	for(var i=0;i<boxArr.length;i++){
		if(i<cols){
			//将第一行的宽度存入数组
			colArr.push(boxArr[i].offsetHeight);

		}else{
			//计算最低的一列
			var colMinh=Math.min.apply(null,colArr);
			var index=getMinIndex(colArr,colMinh);
			//计算第二行第一个插入到哪一列
			boxArr[i].style.position='absolute';
			boxArr[i].style.top=colMinh+'px';
			boxArr[i].style.left=boxW*index+'px';
			colArr[index] += boxArr[i].offsetHeight;
		}
	}
}

//根据值返回索引值
function getMinIndex(arr,val){
	for(var i=0;i<arr.length;i++){
		if(arr[i]===val){
			return i;
		}
	}
}
//判断是否加载图片
function checkIsLoad(){
	var oMain=document.getElementById('main');
	var oBox=document.getElementsByClassName('box');
	var lastBoxH=oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	//浏览器视图窗口的高度
	//两种模式下获取浏览器视窗窗口大小的高度
	var height =document.documentElement.clientHeight || document.body.clientHeight;

	
	return (lastBoxH<scrollTop+height);

}