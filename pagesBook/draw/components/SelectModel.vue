<template>
	<view class="model-main" :class="isHide ? 'block-hide' : ''">
		<view class="up">
			<button v-for="item in upCook" :key="item.id" class="card" hover-class="hover-scale"
				@click="handleCheck(item.type)">
				<label class="label">{{item.name}}</label>
				<view class="mask"></view>
			</button>
		</view>
		<view class="down">
			<button v-for="item in downCook" :key="item.id" class="card" hover-class="hover-scale"
				@click="handleCheck(item.type)">
				<label class="label">{{item.name}}</label>
				<view class="mask"></view>
			</button>
		</view>
	</view>
</template>

<script>
	import cookType from '../../../json/cookType.json'
	export default {
		data() {
			return {
				cookType,
				isHide: false,
			}
		},
		computed: {
			upCook() {
				return this.cookType.slice(0, 2)
			},
			downCook() {
				return this.cookType.slice(2)
			},
		},
		methods: {
			// 选择类型
			handleCheck(type) {
				this.isHide = true
				this.$emit('_type', type)
				setTimeout(() => {
					this.$emit('update:step', 2)
				}, 600)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.model-main {
		display: flex;
		flex-direction: column;
		gap: 30rpx;
		padding-top: 60rpx;
	}

	.block-hide {
		backface-visibility: hidden;
		perspective: 2000upx;
		pointer-events: none;

		.card {
			opacity: 0;
			// &:nth-of-type(even) {
			// 	transform: translate3d(100vw, 100vh, 0);
			// }
			transition: 1.5s;
		}

		.up .card {
			&:nth-of-type(1) {
				transform: translate3d(-100vw, -100vh, 0);
			}

			&:nth-of-type(2) {
				transform: translate3d(100vw, -100vh, 0);
			}
		}

		.down .card {
			&:nth-of-type(1) {
				transform: translate3d(-100vw, 100vh, 0);
			}

			&:nth-of-type(2) {
				transform: translate3d(100vw, 100vh, 0);
			}
		}
	}


	.up {
		display: flex;
		flex-direction: row;
		gap: 30rpx;
	}

	.down {
		display: flex;
		flex-direction: row;
		gap: 30rpx;
	}

	.card {
		position: relative;
		width: 340rpx;
		height: 440rpx;
		outline: none;
		border: none;
		background: transparent;
		transition: .3s ease-in-out;
		border-radius: 20rpx;
		z-index: 1;
		.label {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -50%, 0);
			font-size: 52rpx;
			line-height: 1;
			color: #fff;
			z-index: 3;
			text-shadow: 6upx 6upx 8upx rgba(124, 173, 55, 0.2);
		}

		.mask {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .3);
			z-index: 2;
			// filter: blur(2rpx);
		}
	}

	.up .card {
		line-height: 90rpx;
		text-align: center;

		&:nth-of-type(1){
			background: url('https://s2.loli.net/2023/06/06/JAb2gn93FTWpXY1.jpg') no-repeat;
			background-size: 100%;
		}

		&:nth-of-type(2){
			background: url('https://s2.loli.net/2023/06/06/zQexClDjtSiFmbZ.jpg') no-repeat;
			background-size: 100%;
		}
	}

	.down .card {
		&:nth-of-type(1) {
			background: url('https://s2.loli.net/2023/06/06/AIfBxnrS3KsQ4vm.jpg') no-repeat;
			background-size: 100%;
		}

		&:nth-of-type(2) {
			background: url('https://s2.loli.net/2023/06/06/zHdDmtnRXY9AGZM.jpg') no-repeat;
			background-size: 100%;
		}
	}

	.hover-scale {
		scale: 1.05;
	}
</style>