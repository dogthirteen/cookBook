<template>
	<view class="book-wrap">
		<cu-custom bgColor="bg-white">
			<block slot="content">菜谱</block>
		</cu-custom>
		<swiper class="swiper ">
			<swiper-item class="swiper-item flex align-center justify-center">
				<image src="https://s2.loli.net/2023/06/01/IGO56s4fBZ1zi9a.png" class="banner" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
				:style="{height:'calc(100vh - 300rpx - '+ CustomBar + ')' }">
				<view class="cu-item" :class="index==tabCur?' text-purple cur':''" v-for="(item,index) in cookTypeList"
					:key="index" @tap="TabSelect" :data-index="index" :data-id="item.id" :data-type="item.type">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation :scroll-top="mainTop"
				:style="{height:'calc(100vh - 300rpx - '+ CustomBar + ')' }">
				<view class="padding-top padding-lr" v-for="(item,index) in cookList" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-purple"></text> {{item.name}}
						</view>
					</view>
				</view>
				<view class="padding-top padding-lr">
					<view class="cu-bar"></view>
				</view>
				<view class="padding-top padding-lr">
					<view class="cu-bar"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import cookType from '../../json/cookType.json'
	import cook from '../../json/cook.json'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar + 'px',
				CustomBar: this.CustomBar + 'px',
				cookTypeList: cookType,
				cookType: 1, //1早餐  2中餐 3晚餐 4夜宵
				cookList: [],
				list: [],
				tabCur: 0,
				verticalNavTop: 0,
				load: true,
				mainTop: 0
			};
		},
		created() {
			uni.showShareMenu()
			this.cookList = cook.filter(item => item.type.includes(this.cookType))
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.index;
				this.cookType = Number(e.currentTarget.dataset.type);
				this.cookList = cook.filter(item => item.type.includes(this.cookType))
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50					
				this.mainTop = 1
				this.$nextTick(function() {
					this.mainTop = 0
				});
				console.log(this.cookList);
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.swiper {
		width: 750rpx;
		height: 300rpx;
		background-color: #fff;
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

	.VerticalNav {
		background-color: #fff;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>