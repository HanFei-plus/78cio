<template>
	<div class="share">
		<div class="header">
			<div class="header-img" >
				<img :src="header.headerImg" />
			</div>
			<div class="header-center">
				<span class="name">{{header.name}}</span>
				<span class="small-font">{{header.job}}</span>
			</div>
			<div class="header-right">{{header.time}}</div>
		</div>
		<div class="content">
			<p>{{header.content.text}}</p>
			<ul>
				<v-touch tag="li" :key="index" v-on:tap="imgShowPan(index)" v-if="header.content.img.length>0" v-for="(item,index) in header.content.img" 
				:style="{backgroundImage:'url('+item.imgSrc+')',maxWidth:style['max-width'],maxHeight:style['max-height']}">	
				</v-touch>
			</ul>
		</div>
		<div class="operation">
			<div class="browse-number">浏览{{header.browseNumber}}次</div>
			<div class="operation-right">
				<v-touch :class="fabClass" tag="span" v-on:tap="onFab">{{header.fotNumber}}</v-touch>
				<v-touch class="com" tag="span" v-on:tap="onCom">{{header.comNumber}}</v-touch>
			</div>
		</div>
		<ul class="comlist">
			<li v-for="item in header.com" :key="item.userId">
				<div class="header-img">
					<img :src="item.headerImg" />
				</div>
				<div class="comlist-right">
					<div class="comlist-right-top">
						<span class="username">{{item.userName}}</span>
					</div>
					<p>{{item.comtext}}</p>
					<div>
						<span class="small-font">{{item.time}}</span>
					</div>
				</div>
			</li>
		</ul>
		<div class="msg">登录app查看更多评论<a href="###">立即下载app</a></div>
		<div class="app-down">
			<v-touch v-if="userId==null" tag="div" class="btn"
				v-on:tap="onLogin">请登录参与评论</v-touch>
			<v-touch v-if="userId!=null" tag="div" class="btn"
				v-on:tap="onCom">马上参与评论</v-touch>
		</div>
		<transition name="fade">
			<img-show v-on:imgShow-say="imgShowHidden" v-if="imgShow" :images="header.content.img" :index="showImgIndex"></img-show>
		</transition>
		<transition name="updown">
			<login v-on:login="login" v-on:login-say="loginHidden" v-if="loginShow"></login>
		</transition>
		<transition name="updown">
			<bind-phone v-on:bind-say="bindHidden" v-if="bindShow"></bind-phone>
		</transition>
		<transition name="updown">
			<comment v-on:com-say="commentHidden" v-if="comShow"
				:userId = "userId"
				userName="Master Yi" 
				headerImg="http://img.jsqq.net/uploads/allimg/150310/1_150310062956_6.jpg"
				v-on:comment="cmoment"></comment>
		</transition>
	</div>
</template>

<script>
	import imgShow from '@/components/imgShow'
	import login from '@/components/login'
	import bindPhone from '@/components/bindPhone'
	import comment from '@/components/comment'
	export default {
		components : {
			imgShow,
			login,
			bindPhone,
			comment
		},
		data () {
			return {
				userId:null,
				loginShow:false,
				comShow:false,
				imgShow:false,
				bindShow:false,
				showImgIndex:0,
				fabClass:"fab",
				style:{
					'max-width':0,
					'max-height':0,
				},
				header:{
					headerImg : "http://img.jsqq.net/uploads/allimg/150310/1_150310062956_6.jpg",
					name : "Master Yi",
					job : "web前端工程师",
					browseNumber : 168,
					time : "三天前",
					fotNumber:15,
					comNumber:10,
					content:{
						text:"北方的冬日即使是晴天，也是清寒的。草木没有了过多的装点，清晰的线条在空旷里显得简单而骨感。风从远山吹过，大地在眼中一览无余，风，也变成了可视的寒流，所到之处是那种风卷沉雪的迷蒙。有人说冬过于简单了，简单得有些苍白。也有人说冬天是别样的美，那千里冰封，万里雪飘的一望无垠，是冬天的豪迈与壮观。",
						img:[
							{
								imgSrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514554765266&di=f2fdb5a8405fc46f5b388a1968166e4c&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141105%2F0034034839422524_b.jpg"
							},
							{
								imgSrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514554765266&di=78e5806a4d9b87dbce0e036bce5c7fbc&imgtype=0&src=http%3A%2F%2Fpic30.nipic.com%2F20130608%2F11918471_112159614194_2.jpg"
							},
							{
								imgSrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514554765266&di=deb3649ad3cb958604e9e4c5885e19a3&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140622%2F318760-14062221513012.jpg"
							},
							{
								imgSrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514554765265&di=ea6976fbad1a0592f9b7b1d85645eb2b&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110920%2F0020032825361672_b.jpg"
							}
						]
					},
					com:[
						{
							userName : "YaSuo",
							headerImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514717031881&di=fe8a0a6fe285e33f1ac4235e6e886381&imgtype=0&src=http%3A%2F%2Fnanxingyao.com%2Fuploads%2Fallimg%2Fc160725%2F14E4095502A0-1WO9.jpg",
							comtext:"有些人血里有风，注定要一生漂泊...",
							time:"刚刚",
							userId:"78cio_1"
						},
						{
							userName : "盖伦",
							headerImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514717031873&di=7fa08efdf0cdaed4f2f6301375297a4c&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201411%2F02%2F20141102090411_kVLR3.jpeg",
							comtext:"天地有正气，杂然赋流形。下则为河岳，上则为日星。於人曰浩然，沛乎塞苍冥。皇路当清夷，含和吐明庭。时穷节乃见，一一垂丹青。在齐太史简，在晋董狐笔。",
							time:"3小时前",
							userId:"78cio_2"
						},
						{
							userName : "亚瑟王",
							headerImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514717031872&di=5e562acdc3d05456e3dc45f4a134d2ba&imgtype=0&src=http%3A%2F%2Fp4.qqgexing.com%2Ftouxiang%2F20120811%2F1435%2F5025fd3e3f064.jpg",
							comtext:"我有一个小目标",
							time : "昨天",
							userId:"78cio_3"
						},
						{
							userName : "童年的纸飞机",
							headerImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514717031871&di=dbce2855c9e9eba46dd89bbb3b6792fd&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201506%2F17%2F20150617003607_vVFMs.thumb.224_0.jpeg",
							comtext:"所谓人生就是要有一些遗憾的",
							time :"前天",
							userId:"78cio_4"
						},
						{
							userName : "天若有情",
							headerImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514717031867&di=c7515ea8cd87d845c81d01c140805298&imgtype=0&src=http%3A%2F%2Fimg0w.pconline.com.cn%2Fpconline%2F1312%2F09%2F3969358_rbace1kfzgetbbunaaaawi5qvyu678_200x200_3.jpg",
							comtext:"我们只是一群偏执的孩子",
							time : "2017-12-31",
							userId:"78cio_5"
						}
					]
				}
				
			}
		},
		methods : {
			imgShowPan (index) {
				//显示当前点击图片
				this.imgShow = true
				this.showImgIndex = index
			},
			imgShowHidden (listen) {
				//图片组件传值，关闭图片组件
				this.imgShow = listen
			},
			loginHidden(listen){
				//login组建传值，关闭登录组件
				this.loginShow = listen
			},
			login(userId){
				this.userId = userId
				this.loginShow =false
			},
			bindHidden (listen) {
				this.bindShow = listen
			},
			commentHidden (listen) {
				this.comShow = listen
			},
			cmoment (callObj) {
				this.comShow=false
				this.header.com.unshift(callObj)
			},
			checkImgNumber () {
				//检测图片数量
				var imgNumber =this.header.content.img.length
				switch(imgNumber){
					case 1:
						//发帖人只有一张图片时，图片宽度及高度设定
						this.style={
							'max-width':"100%",
							'max-height':"2rem"
						}
					break;
					case 2:
						//发帖人只有两张图片时，图片宽度及高度设定
						this.style={
							'max-width':"1.775rem",
							'max-height':"1.775rem"
						}
					break;
					default:
						//发帖人图片大于2张时，图片宽度及高度设定
						this.style={
							'max-width': "1.183rem",
							'max-height':"1.183rem"
						}
					break;
				}
			},
			onLogin () {
				//登录触发
				this.loginShow = true
			},
			onFab () {
				//点赞,判断用户是否已经点赞
				if(this.fabClass=="fabon"){
					return false
				}else if(this.userId){
					this.header.fotNumber++
					this.fabClass="fabon"
				}else {
					//用户未登录
					this.onLogin()
				}
			},
			//评论
			onCom () {
				if(this.userId){
					this.comShow = true
				}else{
					//用户未登录
					this.onLogin()
				}
			}
		},
		created () {
			this.checkImgNumber () 
		}
	}
</script>

<style lang="less">
	*{margin: 0; padding: 0;}
	ol,ul,li{ list-style: none;}
	h1,h2,h3,h4,h5,h6{
	    font-weight: normal;
	}
	img{ border: 0;}
	input,textarea{
		outline: none;
		-webkit-appearance: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	body{
	    font: 14px/150% Arial, "Microsoft Yahei", sans-serif;
	    background-color: #FFF;
	}
	.height(@rem:0.4rem,@px:40px){
	    height: @rem;
	    max-height: @px;
	}
	.share{
		width: 100%;
		padding-bottom: 50px;
	}
	.header,.content,.comlist{
		 padding-left: 0.1rem;
		 padding-right: 0.1rem;
	}
	.header{
		padding-top: 0.1rem;
		height: 40px;;
	}
	.header-img{
		 float: left;
		 height: 40px;
		 width: 40px;
		 border-radius: 50%;
		 margin-right:7px;
		 overflow: hidden;
		 img{
		 	border-radius: 50%;
		 	width: 100%;
		 	height: 100%;
		 }
	}
	.header-center{
		float: left;
		overflow: hidden;
		height: 40px;
		span{
			display: block;
			white-space: nowrap;
		}
		span.name{
			line-height: 24px;
		}
	}
	.small-font{
			color:#666;
			font-size: 12px;
			line-height: 16px;
		}
	.header-right{
		float: right;
		line-height: 40px;
		color: #666;
	}
	.content{
		padding-top:0.05rem ;
		p{
			line-height: 20px;
		}
		ul{
			padding-top: 0.05rem;
			overflow: hidden;
		}
		li{
			background-position: center;
			background-size: cover;
			width: 100%;
			height: 10rem;
			float: left;
			box-sizing: border-box;
			border: 1px solid #FFF;
		}
	}
	.operation{
		 margin:0.05rem 0.1rem 0;
		 border-bottom: 1px solid #CACACA;
		 height: 40px;
	}
	.browse-number{
		font-size: 12px;
		color: #666;
		line-height: 40px;
		float: left;
		white-space: nowrap;
	}
	.operation-right{
		overflow: hidden;
		height: 40px;
		text-align: right;
		font-size: 0;
	}
	span.fab,span.com,span.fabon{
		display: inline-block;
		vertical-align: middle;
		font-size: 12px;
		background-size: 20px 20px;
		padding-left: 24px;
		height: 40px;
		background-repeat: no-repeat;
		margin-left: 20px;
		margin-right: 0.05rem;
		line-height: 40px; color: #333;
		text-align: left;
		overflow: hidden;
		background-position: left 7px;
	}
	span.fab{
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABQCAYAAACdxrJZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjZDQTI3RkZFQ0EzMTFFNzkxODRCNjFGOThBNjc0QTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjZDQTI4MDBFQ0EzMTFFNzkxODRCNjFGOThBNjc0QTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNkNBMjdGREVDQTMxMUU3OTE4NEI2MUY5OEE2NzRBMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNkNBMjdGRUVDQTMxMUU3OTE4NEI2MUY5OEE2NzRBMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhT/v/AAAAeYSURBVHja7F1rbBRV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");
	}
	span.fabon{
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABQCAYAAACdxrJZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI5QTRGNERFQ0E0MTFFNzlEOUZCRUQ5RUNBRTg1OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDI5QTRGNEVFQ0E0MTFFNzlEOUZCRUQ5RUNBRTg1OTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMjlBNEY0QkVDQTQxMUU3OUQ5RkJFRDlFQ0FFODU5MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMjlBNEY0Q0VDQTQxMUU3OUQ5RkJFRDlFQ0FFODU5MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlcovAMAAAeYSURBVHja7F1rbBRV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");
	}
	span.com{
		background-position: left 10px;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABNCAYAAAAxWePoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTkxNkQzQkVFQ0E1MTFFN0E0ODZCNUJFRjI3MEYwRjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTkxNkQzQkZFQ0E1MTFFN0E0ODZCNUJFRjI3MEYwRjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5OTE2RDNCQ0VDQTUxMUU3QTQ4NkI1QkVGMjcwRjBGMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5OTE2RDNCREVDQTUxMUU3QTQ4NkI1QkVGMjcwRjBGMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuA8p18AAAjySURBVHja7FxrbBVF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");
	}
	.fixed-full{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.fixed-full-position{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
	.comlist{
		 overflow: hidden;
		 li{
		 	margin-top: 10px;
		 	width: 100%;
		 	overflow: inherit;
		 	&:last-child .comlist-right{
		 		border-bottom: none;
		 	}
		 }
		 span.fab,span.fabon{
		 	float: right;
		 	height: 26px;
		 	line-height: 26px;
		 	background-size: 15px 15px;
		 	background-position: left 4px;
		 	padding-left: 19px;
		 }
	}
	.comlist-right{
		overflow: inherit;
		border-bottom:1px solid #CACACA; padding-bottom: 5px;
		.username{ line-height: 26px;}
		p{
			font-size: 12px;
		}
		.comlist-right-top{ height: 26px;}
	}
	.app-down{
		height: 50px;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fafafa;
		box-shadow: 0 0 4px #CACACA;
		.btn{
			 margin-top: 5px;
			 margin-left: 0.1rem;
			 margin-right: 0.1rem;
			 background-color:#4d89e9;
		}
	}
	.btn{
		height: 40px;
		border-radius: 5px;
		box-sizing: border-box;
		color: #FFF;
		line-height: 40px;
		text-align: center;
		background-color: #45c01a;
	}
	.close{
		height: 30px;
		position: absolute;
		right: 0px;
		top: 0px;
		white-space: nowrap;
		min-width: 40px;
		padding-right: 5px;
		padding-top: 5px;
		color:#999;
		line-height: 30px;
		font-size: 14px;
		z-index:3;
	}
	.msg{
		height: 40px;
		line-height: 40px;
		color: #999;
		text-align: center;
		a{ 
			margin-left: 15px;
			color: #4d89e9;
			text-decoration: none;
		}
	}
	/***动画****/
	.fade-enter-active{
		transition: all .5s;
		opacity: 1;
	}
	.fade-enter {
		opacity: 0;
	}
	.fade-leave-active{
		transition: all .5s;
		opacity: 0;
	}
	.updown-enter-active{
		transition: all .3s;
		transform: translate3d(0,0,0) 
	}
	.updown-enter{
		transform: translate3d(0,100%,0) ;
	}
	.updown-leave-active{
		transition: all .3s;
		transform: translate3d(0,100%,0) ;
	}
	.icon{
		background-repeat: no-repeat;
		background-position: center;
	}
</style>