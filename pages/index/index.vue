<template>
	<view class="wrap index-wrap">
		<home v-if="PageCur=='home'"></home>
		<book v-if="PageCur=='book'"></book>
		<mine v-if="PageCur=='mine'"></mine>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home' + [PageCur == 'home'?'-active':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-black':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="book">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/book' + [PageCur == 'book'?'-active':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='book'?'text-black':'text-gray'">菜单</view>
			</view>
			<view class="action" @click="NavChange" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/mine' + [PageCur == 'mine'?'-active':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='mine'?'text-black':'text-gray'">我的</view>
			</view>
		</view>
		<image src="https://s2.loli.net/2023/06/06/JAb2gn93FTWpXY1.jpg" class="hide"></image>
		<image src="https://s2.loli.net/2023/06/06/zQexClDjtSiFmbZ.jpg" class="hide"></image>
		<image src="https://s2.loli.net/2023/06/06/AIfBxnrS3KsQ4vm.jpg" class="hide"></image>
		<image src="https://s2.loli.net/2023/06/06/zHdDmtnRXY9AGZM.jpg" class="hide"></image>
	</view>
</template>

<script>
	import home from '../home/home.vue'
	import mine from '../mine/mine.vue'
	import book from '../book/book.vue'
	export default {
		components: {
			home,
			mine,
			book
		},
		data() {
			return {
				PageCur: 'home'
			}
		},
		onLoad() {
			console.log('PageCur', this.PageCur);
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>
	.index-wrap {
		min-height: calc(100vh - 100rpx);
	}
</style>