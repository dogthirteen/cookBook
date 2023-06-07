<template>
	<view class="mine-wrap">
		<cu-custom></cu-custom>
		<view class="user-info flex justify-between">
			<view class="name">
				今天干饭了吗<br>
				<text class="text-bold">{{ userInfo.nickName || '加大婷' }}</text>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<xk-user-info @getUserInfo="handleGetUserInfo">
				<view class="cover">
					<image :src="userInfo.avatarUrl ? userInfo.avatarUrl : '../../static/mine/cover.jpg'" class="img"></image>
				</view>
			</xk-user-info>
			<!-- #endif -->

			<!-- #ifndef MP-WEIXIN -->
			<view class="cover">
				<image src="../../static/mine/cover.jpg" class="img"></image>
			</view>
			<!-- #endif -->
		</view>
		<view class="card">
			<view class="list">
				<navigator url="../../pagesBook/random/random" class="list-item flex align-center justify-between"
					hover-class="none">
					随机菜品 <text class="cuIcon-right icon"></text>
				</navigator>
				<navigator url="../../pagesBook/draw/draw" class="list-item flex align-center justify-between"
					hover-class="none">
					翻牌选菜 <text class="cuIcon-right icon"></text>
				</navigator>
				<navigator url="../../pagesBook/photo/photo" class="list-item flex align-center justify-between"
					hover-class="none"> 
					图册 <text class="cuIcon-right icon"></text>
				</navigator>
			</view>
		</view>
		<tabbar pageCur="mine"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
			}
		},
		methods: {
			handleGetUserInfo(e) {
				console.log(e);
				this.userInfo = e.userInfo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine-wrap {
		position: absolute;
		width: 100%;
		min-height: 100vh;
		background-size: contain;
		background: linear-gradient(122.66deg, rgba(108, 91, 222, 1) 0%, rgba(54, 39, 152, 1) 100%);

		.user-info {
			padding: 60rpx 48rpx 0;


			.name {
				font-size: 52rpx;
				line-height: 70rpx;
				color: #fff;
			}

			.cover {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				border: 4rpx solid rgba(255, 255, 255, 1);
				overflow: hidden;

				.img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.card {
			position: absolute;
			left: 0rpx;
			bottom: 0;
			width: 750rpx;
			height: calc(100vh - 440rpx);
			background: rgba(245, 247, 249, 1);
			border-radius: 30rpx 30rpx 0 0;


			.list {
				padding: 36rpx 56rpx;
			}

			.list-item {
				width: 100%;
				height: 100rpx;
				font-size: 28rpx;
				border-radius: 8rpx;
				padding: 0 32rpx;
				background-color: #fff;
				margin-bottom: 32rpx;
			}

			.icon {
				font-size: 32rpx;
			}
		}
	}
</style>