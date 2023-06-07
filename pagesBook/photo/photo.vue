<template>
	<view class="wrap photo-wrap">
		<cu-custom bgColor="bg-white " isBack>
			<block slot="content">图册</block>
		</cu-custom>
		<view class="photo-list flex align-center justify-between flex-wrap">
			<image class="photo-item" v-for="(item,index) in photos" :key="index" :src="item" mode="widthFix"
				@click="handlePreView(item)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photos: []
			};
		},
		onLoad() {
			this.photos = getApp().globalData.photos
		},
		methods: {
			handlePreView(src) {
				uni.previewImage({
					urls: [src],
					showmenu: true
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.photo-wrap {
		.photo-list {
			padding: 24rpx;
		}

		.photo-item {
			width: 340rpx;
			height: 574rpx;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.4);
		}
	}
</style>