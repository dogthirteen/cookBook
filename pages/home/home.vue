<template>
	<view class="home-wrap">
		<cu-custom bgColor="bg-white">
			<block slot="content">首页</block>
		</cu-custom>
		<swiper class="swiper">
			<swiper-item class="swiper-item flex align-center justify-center">
				<image src="https://i.imgtg.com/2023/06/28/OkZkPq.png" class="banner">
				</image>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<navigator hover-class='none' :url="'/pagesBook/' + item.name+'/' + item.name" class="nav-li" navigateTo
				:class="'bg-'+item.color" :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
				v-for="(item,index) in elements" :key="index">
				<view class="nav-title">{{item.title}}</view>
				<view class="nav-name">{{item.name}}</view>
				<text :class="'cuIcon-' + item.cuIcon"></text>
			</navigator>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				photos: [],
				elements: [{
						title: '随机菜品',
						name: 'random',
						color: 'purple',
						cuIcon: 'vipcard'
					},
					{
						title: '翻牌选菜',
						name: 'draw',
						color: 'mauve',
						cuIcon: 'formfill'
					}
				],
			};
		},
		created() {
			uni.showShareMenu()
		}
	}
</script>

<style>
	.swiper {
		width: 750rpx;
		height: 300rpx;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
	}

	.banner {
		width: 702rpx !important;
		height: 220rpx !important;
		border-radius: 10rpx;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.6);
	}

	.nav-list {}

	.nav-li {
		padding: 30rpx;
		border-radius: 12rpx;
		width: 100%%;
		margin: 0 24rpx 40rpx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10rpx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4rpx 4rpx 6rpx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32rpx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40rpx;
		margin-right: 4rpx;
	}

	.nav-name {
		font-size: 28rpx;
		text-transform: Capitalize;
		margin-top: 40rpx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40rpx;
		height: 6rpx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100rpx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40rpx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36rpx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		font-size: 52rpx;
		width: 60rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.text-light {
		font-weight: 300;
	}
</style>