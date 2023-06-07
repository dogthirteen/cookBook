<template>
	<view class="wrap">
		<cu-custom bgColor="bg-white " isBack>
			<block slot="content">翻牌选菜</block>
		</cu-custom>
		<view class="container flex flex-direction align-center justify-center">
			<SelectModel :step.sync="step" :cookType="cookType" @_type="handleCheck" />
			<mycard :step.sync="step" ref="mycard" :ready.sync="ready" :cardImg="cardBg" :card="cookList" @open="openCard">
			</mycard>
		</view>
	</view>
</template>

<script>
	import SelectModel from './components/SelectModel.vue'
	import mycard from '../../components/hxr-card/hxr-card.vue';
	import cook from '../../json/cook.json'
	import cookType from '../../json/cookType.json'
	export default {
		components: {
			mycard,
			SelectModel
		},
		data() {
			return {
				step: 1,
				imgs: [],
				cookType: [],
				cookList: [],
				cardBg: 'https://s2.loli.net/2023/06/06/JAb2gn93FTWpXY1.jpg',
				ready: false // 是否点击开始抽奖
			};
		},
		onLoad() {
			let photos = getApp().globalData.photos
			let randoms = this.GenerateRandomNumbers(0, photos.length - 1, 4)
			for (let i = 0; i < randoms.length; i++) {
				this.imgs.push(photos[randoms[i]])
			}
			this.cookType = cookType.map((item, index) => ({ ...item, bgImg: this.imgs[index] }))
		},
		methods: {
			// 选择类型
			handleCheck(e) {
				console.log(e);
				this.cardBg = this.imgs[e - 1]
				let arr = cook.filter(item => item.type.includes(Number(e))).map(item => ({ ...item, status: 0 }))
				let randoms = this.GenerateRandomNumbers(0, arr.length - 1, 9)
				console.log(randoms);
				for (let i = 0; i < randoms.length; i++) {
					this.cookList.push(arr[randoms[i]])
				}
			},
			/**
			 * @description: 生成随机数
			 * @param {Number} min 起始值
			 * @param {Number} max 最大值
			 * @param {Number} count 个数限制
			 * @return: 生成的随机数组
			 */
			GenerateRandomNumbers(min, max, count) {
				if (count > max - min + 1) {
					throw new Error('生成的随机数个数超过范围');
				}

				let numbers = [];
				for (let i = min; i <= max; i++) {
					numbers.push(i);
				}

				let randomNumbers = [];
				while (count > 0) {
					const randomIndex = Math.floor(Math.random() * numbers.length);
					const randomNumber = numbers.splice(randomIndex, 1)[0];
					randomNumbers.push(randomNumber);
					count--;
				}

				return randomNumbers;
			},
			/**
			 * 点击开始抽奖
			 */
			// start() {
			// 	if (this.ready) {
			// 		uni.showToast({
			// 			title: `已经开启抽奖`,
			// 			icon: 'none'
			// 		});
			// 		return;
			// 	} // 触发组件开始方法

			// 	this.$refs.mycard.start(() => {
			// 		// 动画结束后可以点击
			// 		this.ready = true;
			// 	});
			// },

			// 子组件触发，点击打开单个卡片奖品
			openCard(e) {
				const { item, index } = e.detail; // 动画没有结束，或已经点开

				if (!this.ready || item.status == 1) {
					return;
				}
				var obj = this.cookList[index];
				obj.status = 1;
				this.cookList[index] = obj;
				// uni.showToast({
				// 	title: `你点击了第${index + 1}个`,
				// 	icon: 'none'
				// });
			}
		}
	};
</script>
<style>
	.wrap {
		overflow: hidden;
	}

	.container {
		height: 100%;
	}

	.grid-card {
		padding: 10px;
	}

	.sol-button {
		margin: 0 auto;
	}
</style>