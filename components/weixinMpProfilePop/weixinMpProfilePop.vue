<template>
	<view>
		<view class="address-window" :class="value === true ? 'on' : ''">
			<view class="title">
				<image class="title-logo"
					src="data:image/png;base64,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"
					mode=""></image>
				<view class="title-txt">
					小程序 申请
				</view>
			</view>
			<view class="notes">
				<view class="notes-top">
					完善你的昵称、头像
				</view>
				<view class="notes-bot">
					注册、登录小程序
				</view>
			</view>
			<view class="userbox">
				<button class="mydata-arrow-right" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<view class="userbox-item">
						<image class="userbox-item-img" :src="avatarUrl?avatarUrl:headimg" mode=""></image>
						<view class="userbox-item-txt">
							点击选择头像
						</view>
					</view>
				</button>
				<view class="userbox-item">
					<view class="userbox-item-nicheng">
						昵称
					</view>
					<input class="userbox-item-input" type="nickname" v-model="nickName" @blur="getNickname" placeholder="请填写昵称">
				</view>
			</view>
			<view class="task-btn">
				<view class="left" @click="closeStudent">
					取消
				</view>
				<view class="left right" @click="authorize">
					授权
				</view>
			</view>
		</view>
		<view class="mask" @touchmove.prevent :hidden="value === false" @click="closeStudent"></view>
	</view>
</template>
<script>
	const avatar_default =
		'data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz/wAALCACEAIQBAREA/8QAGwABAAIDAQEAAAAAAAAAAAAAAAMFAgQGAQj/xAAuEAEAAgECAggGAgMAAAAAAAAAAQIDBBEFIRIVMUFRZKLhEyJhcYHBFFIjkdH/2gAIAQEAAD8A+gSIAIgAAIgAAAAAAACIAAAAAAAAAAAAQ6vVU0mH4l+c90eMqDPrtRqLb2vaI8I5QhrkvjtvS9on6WWnD+KWm8YtRbfflF/+rcAAABz/ABbPOXXTXux/JH7aIOl4dnnPoqWtzmOU/lsgAAA5jWxMa7NE/wB5QAvuDRMaKZ8bz+lgAAACk4zpZrmjUV7L8p+ysGVa2yXila7zPKHTaXDGn01MX9Y5/dMAAADHLirmxTjvXekuXzY/g5r4+3ozMf6Rrjgunr0Z1E8532p9FsAAAA09ZxLFp6zWtunk8I7vu5+1pyXm9uczO8sW/wAO4h/EmaXrvjnn9pXmLLjzU6eO1bx9GYAACHUavFpadLJbn3R3ypdXxTNqN60/x08I7Z/DRASYc+TBfp4rWpK40nGKZdq5/knx7vdY9vOHoAA5TLlvmyTkvbeYYAALrguW9seTHa29a7bfndaAACptwKs3ma59o8Ojv+3nUXmPR7nUXmPR7nUXmPR7nUXmPR7nUXmPR7HUXmPR7nUXmPR7t3Q6KuipeIv05t2z2djaAAAAAAAAAAAAAAAAAAAAAAAB/9k='
	export default {
		name: 'weixinMpProfilePop',
		props: {
			value: Boolean,
			mydate: Object
		},
		data: function() {
			return {
				headimg: avatar_default,
				avatarUrl: '',
				nickName: '',
				openid: '',

			};
		},
		mounted: function() {},
		methods: {
			async authorize() {
				let that = this;
				if (!that.avatarUrl) {
					uni.showToast({
						title: '请选择头像',
						icon: "none",
						duration: 1500
					})
					return
				}
				that.nickName = that.nickName.trim();
				if (!that.nickName) {
					uni.showToast({
						title: '请填写昵称',
						icon: "none",
						duration: 1500
					})
					return
				}
				uni.showLoading({
					title: "资料上传中···"
				})
				let obj = {}
				obj.avatarUrl = this.avatarUrl
				obj.nickName = this.nickName
				console.log(obj)
				this.$emit("getProfile", obj)
				// const filePath = that.avatarUrl // 选择图片的临时路径
				// const name = that.avatarUrl.substring(that.avatarUrl.lastIndexOf(".") + 1); // 获取图片格式 png jpg 等

				// // 点击授权将本地头像路径上传至云服务器获取头像网址，以下为uni云服务，使用者可自行更改上传方式
				// await uniCloud.uploadFile({
				// 	filePath, // 临时路径
				// 	cloudPath: Date.now() + "." + name, // 图像名称
				// 	success: res => {
				// 		that.avatarUrl = res.fileID
				// 		let obj = {}
				// 		obj.avatarUrl = this.avatarUrl
				// 		obj.nickName = this.nickName
				// 		this.$emit("send", obj)
				// 		this.$emit('input', false);
				// 	},
				// 	fail(err) {
				// 		uni.showToast({
				// 			title: '资料上传失败' + err,
				// 			icon: 'none',
				// 			duration: 3000
				// 		})
				// 		return;
				// 	},
				// 	complete() {
				// 		uni.hideLoading()
				// 	}
				// })

			},
			getNickname(e) {
				this.nickName = e.detail.value
			},
			async uploadImg(url) {
				let that = this;
				that.avatarUrl = url;
			},
			onChooseAvatar(e) {
				this.uploadImg(e.detail.avatarUrl)
			},
			closeStudent() {
				this.$emit('input', false);
			},
		}
	};
</script>
<style lang="scss" scoped>
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	button {
		padding: 0upx;
		margin: 0upx;
		border: none;
		border-radius: 0upx;
		box-sizing: border-box;
		background-color: transparent;
	}

	button.button-hover {
		transform: translate(3rpx, 3rpx);
		background-color: transparent;
	}

	button::after {
		border: none
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000;
		opacity: 0.5;
		z-index: 99;
	}

	.address-window {
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 6666;
		padding: 32rpx 40rpx 200rpx;
		transform: translate3d(0, 100%, 0);
		-webkit-transform: translate3d(0, 100%, 0);
		-ms-transform: translate3d(0, 100%, 0);
		-moz-transform: translate3d(0, 100%, 0);
		-o-transform: translate3d(0, 100%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
		-webkit-transition: all .3s cubic-bezier(.25, .5, .5, .9);
		-moz-transition: all .3s cubic-bezier(.25, .5, .5, .9);
		-o-transition: all .3s cubic-bezier(.25, .5, .5, .9);
		border-radius: 24rpx 24rpx 0 0;
		box-shadow: 0px 0px 30rpx 30rpx rgba(107, 127, 153, 0.30);
		box-sizing: border-box;

		&.on {
			transform: translate3d(0, 0, 0);
			-webkit-transform: translate3d(0, 0, 0);
			-ms-transform: translate3d(0, 0, 0);
			-moz-transform: translate3d(0, 0, 0);
			-o-transform: translate3d(0, 0, 0);
		}

		.title {
			width: 100%;
			padding: 36rpx 10rpx 40rpx;
			box-sizing: border-box;
			overflow: auto;

			.title-logo {
				float: left;
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}

			.title-txt {
				float: left;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Semibold;
				font-weight: 600;
				text-align: left;
				color: #000;
			}
		}

		.notes {
			width: 100%;

			.notes-top {
				width: 100%;
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC-Semibold;
				font-weight: 600;
				text-align: left;
				color: #000;
			}

			.notes-bot {
				width: 100%;
				font-size: 26rpx;
				font-family: PingFang SC, PingFang SC-Semibold;
				font-weight: 400;
				text-align: left;
				color: #666;
				margin-top: 10rpx;
			}
		}

		.userbox {
			width: 100%;
			border-top: 2rpx solid #ededed;
			margin-top: 30rpx;

			.mydata-arrow-right {
				border-color: #fff;
				padding: 0rpx !important;
				margin: 0rpx !important;
				border: none !important;
				border-radius: 0rpx !important;
				box-sizing: border-box !important;
				background-color: transparent !important;

			}

			.userbox-item {
				width: 100%;
				height: 112rpx;
				border-bottom: 2rpx solid #ededed;
				overflow: auto;

				.userbox-item-img {
					float: left;
					width: 70rpx;
					height: 70rpx;
					border-radius: 8rpx;
					margin-top: 20rpx;
					margin-right: 20rpx;
				}

				.userbox-item-txt {
					float: left;
					font-size: 26rpx;
					font-family: PingFang SC, PingFang SC-Semibold;
					font-weight: 400;
					line-height: 112rpx;
					text-align: left;
					color: #666;
				}

				.userbox-item-nicheng {
					float: left;
					font-size: 26rpx;
					font-family: PingFang SC, PingFang SC-Semibold;
					font-weight: 400;
					line-height: 112rpx;
					text-align: left;
					color: #000;
				}

				.userbox-item-input {
					float: left;
					font-size: 26rpx;
					font-family: PingFang SC, PingFang SC-Semibold;
					font-weight: 400;
					line-height: 112rpx;
					text-align: left;
					color: #000;
					margin-top: 34rpx;
					margin-left: 36rpx;
				}
			}
		}

		.task-btn {
			width: 80%;
			padding: 0 30rpx;
			box-sizing: border-box;
			margin: 44rpx auto 0;

			.left {
				float: left;
				width: 210rpx;
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				background: #F2F2F2;
				border-radius: 8rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #5DBC6F;

				&.right {
					float: right;
					background: #5DBC6F;
					color: #ffffff;
				}
			}
		}

	}
</style>