<template>
	<div class="login fixed-full">
		<v-touch tag="div" v-on:tap="close" class="close">取消</v-touch>
		<div class="login-m">
			<ul class="login-list">
				<li>
					<label>
						<span class="icon phone-icon"></span>
						<div class="inputbox">
							<input ref="tel" type="tel" placeholder="请输入手机号"/>
						</div>
					</label>
				</li>
				<li>
					<label>
						<span class="icon lock-icon"></span>
						<div class="inputbox">
							<input ref="pwd" type="password" placeholder="设置密码" />
						</div>
					</label>
				</li>
				<li>
					<label>
						<span class="icon lock-icon"></span>
						<div class="inputbox">
							<input ref="pwdagain" type="password" placeholder="确认密码" />
						</div>
					</label>
				</li>
			</ul>
			<v-touch tag="div" class="btn">完成绑定</v-touch>
		</div>
	</div>
</template>

<script>
	export default {
		methods : {
			inputBlur () {
				this.$refs.tel.blur();
				this.$refs.pwd.blur();
				this.$refs.pwdagain.blur();
			},
			close () {
				this.inputBlur()
				this.$emit('bind-say',false)
			}
		}
	}
</script>

<style>
</style>