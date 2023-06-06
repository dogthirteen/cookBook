<template>
	<view class="wrap random-wrap">
		<cu-custom isBack fontColor="text-white">
			<block slot="content">随机菜品</block>
		</cu-custom>

		<view class="content flex flex-direction align-center" v-if="step > 2">
			<view class="sm">
				<HM-slotMachine ref="HMslotMachine"></HM-slotMachine>
			</view>
			<view class="start" @tap="start">
				<text>开 始</text>
			</view>
		</view>
		<view class="cu-modal" :class="dialogShow?'show':''">
			<view class="cu-dialog ">
				<text class="text" :class="step === 1 ?'animation-fade-in' : 'animation-fade-out'">{{showText}}</text>
				<view class="list flex flex-wrap align-center justify-center"
					:class="step > 1 ? step === 2 ?'animation-slide-bottom-in ' : 'animation-slide-bottom-out ':''">
					<view @click="handleCheckCook(item.type)" class="list-item" v-for="item in cookType" :key="item.id">
						<strong>{{item.name}}</strong>
						<!-- <div id="container-stars">
							<div id="stars"></div>
						</div> -->
						<div id="glow">
							<div class="circle"></div>
							<div class="circle"></div>
						</div>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cookType from '../../json/cookType.json'
	import cook from '../../json/cook.json'
	import speech from '../../json/speech.json'
	let timer = null
	let list = []
	let index = 0
	export default {
		data() {
			return {
				cookType,
				cookList: [],
				dialogShow: true,
				step: 1,
				showText: '',
				count: 0,
			}
		},
		onLoad() {
			let random = Math.ceil(Math.random() * 50)
			list = speech[random].split('')
			this.handleWriteText(list[0])
			// this.handleCheckCook(1)
		},

		onReady() {
			// init(options)初始化抽奖组件
			// options参数说明
			// cookList 奖品列表，结构看上面
			// defaultResults 默认显示奖品 初始化完成默认显示的奖品
			// duration 总抽奖时长 毫秒
			// direction 滚动方向 up|down

		},
		onUnload() {
			clearTimeout(timer)
			timer = null
			index = 0
			list = []
		},
		methods: {
			start() {
				// roll(options)开始摇奖
				// 参数说明
				// results 开奖结果，结构[value,value,value] value为奖品数据的value值
				// success 开奖回调 e={results} results为开奖结果数据
				this.count++
				if (this.count == 2) {
					uni.showToast({
						title: '输不起？',
						icon: 'none',
					})
				} else if (this.count == 3) {
					uni.showToast({
						title: '算了，再给你一次机会吧',
						icon: 'none',
					})
				} else if (this.count == 2) {
					uni.showToast({
						title: '算了，再给你一次机会吧',
						icon: 'none',
					})
				} else if (this.count == 5) {
					uni.showToast({
						title: '看来你已经知道自己想吃什么了，去吧，干饭人',
						icon: 'none',
						duration: 3000
					})
				} else if (this.count > 5) {
					uni.showToast({
						title: '再一再二不再三，干饭人好好干饭',
						icon: 'none',
						duration: 3000
					})
				} else if (this.count < 5) {
					this.$refs.HMslotMachine.roll({
						results: this.getResults(),
					})
				}

			},
			getResults() {
				// 生成随机的抽奖结果 实际应用应该ajax请求后台，让后台返回开奖结果
				let max = this.cookList.length - 1;
				let arr = [Math.floor(Math.random() * (max - 1 + 1) + 1), Math.floor(Math.random() * (max - 1 + 1) + 1),
					Math.floor(Math.random() * (max - 1 + 1) + 1)
				];
				return [
					this.cookList[arr[0]].name,

				]
				// this.cookList[arr[1]].name,
				// this.cookList[arr[2]].name
			},
			// 选择菜谱
			handleCheckCook(id) {
				if (this.step != 2) return
				this.step++
				this.cookList = cook.filter(item => item.type.includes(Number(id)))
				this.dialogShow = false
				this.$nextTick(() => {
					this.$refs.HMslotMachine.init({
						prizeList: this.cookList,
						defaultResults: [this.cookList[0].name, ],
						duration: 4000,
						direction: 'up'
					})
					// this.cookList[1].name, this.cookList[2].name
				})
			},
			// 输出文字
			handleWriteText(text) {
				index++
				if (timer) return false
				timer = setTimeout(() => {
					this.showText += text
					clearTimeout(timer)
					timer = null
					if (text !== list[list.length - 1] && list.length > 0) {
						console.log('list', list);
						this.handleWriteText(list[index])
					} else {
						setTimeout(() => {
							this.step++
						}, 800)
					}
				}, 200)
			}
		},
	}
</script>

<style lang="scss">
	.random-wrap {
		background-image: linear-gradient(to top, #8F1E70, #51279A);
		min-height: calc(100vh - var(--window-bottom) - var(--window-top));
	}

	.cu-dialog {
		position: relative;
		width: 700rpx;
		min-height: 750rpx;
		padding: 60rpx 0;
		text-align: center;
		background-color: transparent;
	}

	.sm {
		margin-top: 200rpx;
	}

	.start {
		width: 70%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f29c11;
		border-radius: 40rpx;
		margin-top: 60rpx;
		border-bottom: solid 3px #8d5805;
		box-sizing: border-box;

		text {
			font-size: 20px;
			font-weight: bold;
			color: #b51c06;
			text-shadow: 1px 1px 1px #f2e811;
		}
	}

	.text {
		position: absolute;
		top: 0;
		left: 0;
		padding-top: 60rpx;
		font-size: 60rpx;
		line-height: 100rpx;
		color: #fff;
		text-shadow: 6upx 6upx 20upx rgba(217, 109, 26, 0.8);
		transition: all 10s;
	}

	.list {
		position: absolute;
		top: 100rpx;
		left: 0;
		padding: 0 32rpx;
		opacity: 0;
	}

	.list-item {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 13rem;
		height: 3rem;
		font-size: 32rpx;
		background-size: 300% 300%;
		backdrop-filter: blur(1rem);
		border-radius: 30rpx;
		transition: 0.5s;
		animation: gradient_301 5s ease infinite;
		border: double 4px transparent;
		background-image: linear-gradient(#212121, #212121), linear-gradient(137.48deg, #ffdb3b 10%, #f37b1d 45%, #8f51ea 67%, #0044ff 87%);
		background-origin: border-box;
		background-clip: content-box, border-box;
		margin-bottom: 32rpx;
		z-index: 2;
	}

	#container-stars {
		position: fixed;
		z-index: -1;
		width: 100%;
		height: 100%;
		overflow: hidden;
		transition: 0.5s;
		backdrop-filter: blur(1rem);
		border-radius: 20rpx;
		z-index: 1;
	}

	strong {
		z-index: 2;
		font-family: 'Avalors Personal Use';
		font-size: 30rpx;
		letter-spacing: 5px;
		color: #ffffff;
		text-shadow: 0 0 4px white;
	}

	#glow {
		position: absolute;
		display: flex;
		width: 12rem;
	}

	.circle {
		width: 100%;
		height: 30px;
		filter: blur(2rem);
		animation: pulse_3011 4s infinite;
		z-index: -1;
	}

	.circle:nth-of-type(1) {
		background: rgba(254, 83, 186, 0.636);
	}

	.circle:nth-of-type(2) {
		background: rgba(142, 81, 234, 0.704);
	}

	.list-item:hover #container-stars {
		z-index: 1;
		background-color: #212121;
	}

	.list-item:hover {
		transform: scale(1.1);
	}

	.list-item:active {
		border: double 4px #f37b1d;
		background-origin: border-box;
		background-clip: content-box, border-box;
		animation: none;
	}

	.list-item:active .circle {
		background: #f37b1d;
	}

	#stars {
		position: relative;
		background: transparent;
		width: 200rem;
		height: 200rem;
	}

	#stars::after {
		content: '';
		position: absolute;
		top: -10rem;
		left: -100rem;
		width: 100%;
		height: 100%;
		animation: animStarRotate 90s linear infinite;
	}

	#stars::after {
		background-image: radial-gradient(#ffffff 1px, transparent 1%);
		background-size: 50px 50px;
	}

	#stars::before {
		content: '';
		position: absolute;
		top: 0;
		left: -50%;
		width: 170%;
		height: 500%;
		animation: animStar 60s linear infinite;
	}

	#stars::before {
		background-image: radial-gradient(#ffffff 1px, transparent 1%);
		background-size: 50px 50px;
		opacity: 0.5;
	}

	@keyframes animStar {
		from {
			transform: translateY(0);
		}

		to {
			transform: translateY(-135rem);
		}
	}

	@keyframes animStarRotate {
		from {
			transform: rotate(360deg);
		}

		to {
			transform: rotate(0);
		}
	}

	@keyframes gradient_301 {
		0% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0% 50%;
		}
	}

	@keyframes pulse_3011 {
		0% {
			transform: scale(0.75);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
		}

		70% {
			transform: scale(1);
			box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
		}

		100% {
			transform: scale(0.75);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
		}
	}
</style>