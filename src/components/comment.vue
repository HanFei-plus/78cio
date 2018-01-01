<template>
	<div class="comment fixed-full">
		<v-touch class="close" v-on:tap="close">
			取消
		</v-touch>
		<div class="textarea-box">
			<textarea ref="text" placeholder="我有话说" v-model="comtext"></textarea>
		</div>
		<v-touch tag="div" class="btn" v-on:tap="comment">
			发表评论
		</v-touch>
	</div>
</template>

<script>
	export default {
		props : {
			userId : {
				type:String,
				default:""
			},
			userName : {
				type : String,
				default : ""
			},
			headerImg : {
				type : String,
				default : ""
			}
		},
		data () {
			return {
				comtext : ""
			}
		},
		methods : {
			inputBlur () {
				this.$refs.text.blur()
			},
			close () {
				this.inputBlur()
				this.$emit('com-say',false)
			},
			comment () {
				this.inputBlur()
				var callObj = {
					userId : this.userId,
					userName: this.userName,
					headerImg: this.headerImg,
					comtext : this.comtext,
					time : "刚刚"
				}
				this.$emit('comment',callObj)
			}
		}
	}
</script>

<style lang="less" scoped>
	.comment{
		background-color: #FFF;
		overflow: hidden;
		.btn{
			margin: 20px 0.2rem 0;
			background-color: #4d89e9;
		}
	}
	.textarea-box{
		padding: 5px;
		margin: 60px 0.2rem 0;	
		height: 1.3rem; 
		border-radius: 4px;
		border:1px solid #CACACA;
		textarea{
			width: 100%;
			height: 100%;
			border: none;
			resize: none;
		}
	}
</style>