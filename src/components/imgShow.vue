<template>
	<v-touch tag="div" class="imgShow fixed-full"
		v-on:swipeleft = "goto(nextImg)" v-on:swiperight="goto(prevImg)"
		v-on:tap="imgShowHidden">
		<keep-alive>
			<transition :name="transName">
				<div class="img-slider" v-if="isShow">
					<img :src="images[nowIndex].imgSrc"/>
				</div>
			</transition>
		</keep-alive>
		<keep-alive>
			<transition :name="transNameOld">
				<div class="img-slider" v-if="!isShow">
					<img :src="images[nowIndex].imgSrc"/>
				</div>
			</transition>
		</keep-alive>
		<div class="img-length">{{nowIndex+1}}/{{this.images.length}}</div>
	</v-touch>
</template>

<script>
	export default {
		props : {
			//组件接收参数
			images : {
				type:Array,
				default:[]
			},
			index : {
				type:Number||String,
				default:0
			}
		},
		data () {
			return{
				nowIndex:this.index,
				isShow:true,
				transName:"slider-trans-next",
				transNameOld:"slider-trans-next-old"
			}
		},
		computed : {
			prevImg(){
				return {
					index:this.nowIndex==0?this.images.length-1:this.nowIndex-1,
					transName:"slider-trans-prev",
					transNameOld:"slider-trans-prev-old"
				}
			},
			nextImg(){
				return {
					index:this.nowIndex==this.images.length-1?0:this.nowIndex+1,
					transName:"slider-trans-next",
					transNameOld:"slider-trans-next-old"
				};
			}
		},
		methods :{
			goto (sliderA){
				//显示图片
				this.isShow=false
				this.transName=sliderA.transName
				this.transNameOld=sliderA.transNameOld
				setTimeout(()=>{
					this.isShow=true
					this.nowIndex=sliderA.index
				},10)
			},
			imgShowHidden () {
				//子组建向父组件传值
				this.$emit('imgShow-say',false);
			}
		}
	}
</script>

<style scoped lang="less">
	.imgShow{
		background-color: #333;
	}
	.img-length{
		position:absolute;
		top: 0;
		left: 0;
		width:100%;
		height: 50px;
		line-height: 50px;
		font-size: 16px; color: #FFF;
		text-align: center;
	}
	.img-slider{
		position: absolute; width: 100%;
		height: 100%;
		left: 0; top: 0;
		font-size: 0;
		text-align: center; 
		&:before{
			content: "";
			display: inline-block;
			vertical-align: middle;
			height: 100%;
		}
		img{
			max-width: 100%;
			max-height: 100%;
			vertical-align: middle;
			user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		}
	}
	.slider-trans-next-enter-active{
		transition: all .5s;
	}
	.slider-trans-next-enter{
		transform: translateX(100%);
	}
	.slider-trans-next-old-leave-active{
		transition: all .5s;
		transform: translateX(-100%);
	}	
	.slider-trans-prev-enter-active{
		transition: all .5s;
	}
	.slider-trans-prev-enter{
		transform: translateX(-100%);
	}
	.slider-trans-prev-old-leave-active{
		transition: all .5s;
		transform: translateX(100%);
	}	
</style>