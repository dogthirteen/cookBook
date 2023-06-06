<template>
	<view class="card" :class="step > 1 ? 'block-show' : 'block-hide'" :style="{top:CustomBar+'px'}" @click="start">
		<block v-for="(item, index) in mycard" :key="index">
			<view :data-index="index" :data-item="item" @click="openCard" :class="
				'project flex align-center item' + index + ' '  + 
				(item.status==1 ? 'flip' : '') + 
				(isDiminish ? ' is-diminish' : '') +
				(isStart ? ' show' : '')">
				<image class="front" :src="cardImg"></image>
				<view class="back flex align-center justify-center flex-wrap">
					{{item.name}}
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	function runAsync(time) {
		return new Promise(function(resolve, reject) {
			const timer = setTimeout(function() {
				resolve();
				clearTimeout(timer);
			}, time);
		});
	}

	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				isDiminish: false,
				isStart: false,
				move: '',
				mycard: this.card
			};
		},

		components: {},
		props: {
			// 九宫格卡片
			cardImg: {
				type: String,
				required: true
			},
			card: {
				type: Array,
				default: new Array()
			},
			step: {
				type: Number
			}
		},
		methods: {
			start(callback) {
				this.isDiminish = true
				this.$emit('update:ready', true)
				setTimeout(() => {
					this.isStart = true
				}, 1600)
				//      const {
				//        card,
				//        mode
				//      } = this; 
				//   var mycard = this.mycard;
				//      runAsync(100).then(() => {
				//        // 延迟100毫秒翻转第一排牌面
				//        for (let i = 0; i < 3; i++) {
				//          mycard[i].status = 1;
				//        }
				// 	this.card = mycard;
				//        return runAsync(200);
				//      }).then(() => {
				//        // 延迟200毫秒翻转第二排牌面
				//        for (let i = 3; i < 6; i++) {
				//          mycard[i].status = 1;
				//        }
				// 	this.card = mycard;
				//        return runAsync(200);
				//      }).then(() => {
				//        // 延迟200毫秒翻转第三排牌面
				//        for (let i = 6; i <= 8; i++) {
				//          mycard[i].status = 1;  
				//        }

				//        this.card = mycard;
				//        return runAsync(800);
				//      }).then(() => {
				//        // 将所有背面朝上
				//        for (let i = 0; i < 9; i++) {
				//          mycard[i].status = 0;
				//        }

				//        this.card = mycard;
				//        return runAsync(1000); 
				//      }).then(() => {
				//        // 洗牌动画
				//        for (let i = 0; i < 9; i++) {
				//          runAsync(i * 40).then(() => {
				//            mycard[i].isMove = true;
				//            this.card = mycard;
				//            return runAsync(i * 40);  
				//          }).then(() => {
				//            mycard[i].isMove = false;
				//            this.card = mycard; 
				//            return runAsync(800); 
				//          }).then(() => {
				//            // 结束后回调
				//            if (typeof callback === 'function') {
				//              callback();
				//            }
				//          });
				//        }
				//      });
			},

			// 点击打开单个卡片，开奖
			openCard(event) {
				const {
					item,
					index
				} = event.currentTarget.dataset; // 触发父组件方法

				this.$emit('open', {
					detail: {
						item,
						index
					}
				});
			}
		},
		watch: {
			card: {
				immediate: false,
				handler: function() {
					const {
						card,
						mode
					} = this;
					this.mycard = this.card;
				}
			}
		}
	};
</script>
<style>
	.block-show {
		pointer-events: auto;
		opacity: 1;
	}

	.block-hide {
		backface-visibility: hidden;
		perspective: 2000upx;
		pointer-events: none;
		opacity: 0;
	}

	.card {
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		width: 750rpx;
		height: 1200rpx;
		padding: 30rpx 24rpx 0;
		transition: opacity 1s;
	}

	.card .project {
		position: absolute;
		width: 220rpx;
		height: 358rpx;
		transform: translate3d(240rpx, 358rpx, 0) scale(2.8);
		transition: all 1s cubic-bezier(.68, -.22, .265, 1.22)
	}

	.card .project image {
		display: block;
		width: 220rpx;
		height: 358rpx;
		background-color: #ccc;
	}

	.card .project .back,
	.card .project .front {
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		transform-style: preserve-3d;
		transition: all 1s cubic-bezier(.68, -.22, .265, 1.22);
		position: absolute;
		left: 0;
		top: 0;
		width: 220rpx;
		height: 358rpx;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, .1);
	}

	.card .project .front {
		transform: rotateY(0);
	}

	.card .project .back {
		font-size: 32rpx;
		padding: 0 24rpx;
		background: #efebe9;
		border: 10rpx solid #B4A078;
		outline: #B4A078 dashed 2rpx;
		outline-offset: -20rpx;
		transform: rotateY(180deg);
	}

	.card .project.flip .back {
		transform: rotateY(0)
	}

	.card .project.flip .front {
		transform: rotateY(180deg)
	}

	.card .ani {
		top: 260rpx !important;
		left: 200rpx !important
	}

	.card .is-diminish {
		transform: translate3d(238rpx, 398rpx, 0) scale(1);
	}

	.card .show {
		transition: all .3s;
	}

	.card .show.item0 {
		transform: translate3d(0, 20rpx, 0);
		transition-delay: 0s;
	}

	.card .show.item1 {
		transform: translate3d(238rpx, 20rpx, 0);
		transition-delay: .3s;
	}

	.card .show.item2 {
		transform: translate3d(478rpx, 20rpx, 0);
		transition-delay: .6s;
	}

	.card .show.item3 {
		transform: translate3d(0, 398rpx, 0);
		transition-delay: .9s;
	}

	.card .show.item4 {
		transform: translate3d(238rpx, 398rpx, 0);
		transition-delay: 0s;
	}

	.card .show.item5 {
		transform: translate3d(478rpx, 398rpx, 0);
		transition-delay: 1.2s;
	}

	.card .show.item6 {
		transform: translate3d(0, 776rpx, 0);
		transition-delay: 1.5s;
	}

	.card .show.item7 {
		transform: translate3d(238rpx, 776rpx, 0);
		transition-delay: 1.8s;
	}

	.card .show.item8 {
		transform: translate3d(478rpx, 776rpx, 0);
		transition-delay: 2.1s;
	}
</style>