<template>
	<view class="mine-wrap  padding-lr">
		<cu-custom></cu-custom>
		<view class="user-info flex align-center">
			<view class="cover">
				<image src="../../static/mine/cover.jpg" mode="widthFix"></image>
			</view>
			<view class="info text-bold">
				加大婷天天开心
			</view>
		</view>
		<view class="card">
			<view class="card-item"></view>
			<view class="card-item"></view>
			<view class="card-item"></view>
		</view>
	</view>
</template>

<script>
	export default {

	}
</script>

<style lang="scss" scoped>
	.mine-wrap {
		width: 100%;
		min-height: 100vh;
		background: #fff url('../../static/mine/mine-bg.png') no-repeat fixed top;
		background-size: contain;
		.cover {
			width: 116rpx;
			height: 116rpx;
			border-radius: 50%;
			border: 8rpx solid rgba(255, 255, 255, 0.05);
			box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			font-size: 34rpx;
			color: #1D2541;
			padding-left: 32rpx;
		}

		.card {
			border-radius: 16rpx;
			box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
		}
	}
</style>