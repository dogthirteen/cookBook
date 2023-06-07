<script>
	import Vue from 'vue'
	import autoUpdate from './utils/autoUpload'
	import { GetOssUploadList } from 'api/oss.js'
	export default {
		globalData: {
			photos: [
				'https://s2.loli.net/2023/06/07/UbciBpItZW8Qdle.jpg',
				'https://s2.loli.net/2023/06/07/46Ee1URXMiuzJjk.jpg',
				'https://s2.loli.net/2023/06/07/hskZrIvJqeLp6ai.jpg',
				'https://s2.loli.net/2023/06/07/yYQj7GqXDCrV4AS.jpg',
				'https://s2.loli.net/2023/06/07/PHg95rnWxFMzV6O.jpg',
				'https://s2.loli.net/2023/06/07/DSibxm1TrN6BULd.jpg',
				'https://s2.loli.net/2023/06/07/RpgoDaO5vVJCWiN.jpg',
				'https://s2.loli.net/2023/06/07/OFSz9IlerYmjnxX.jpg',
				'https://s2.loli.net/2023/06/07/apm3e7rkAJDRKBw.jpg',
				'https://s2.loli.net/2023/06/07/cz7gGEteahBu1FW.jpg',
				'https://s2.loli.net/2023/06/07/4dk3Y6ypr1FBoSv.jpg',
				'https://s2.loli.net/2023/06/07/ShrUy7dZx3kCATK.jpg',
				'https://s2.loli.net/2023/06/07/7McTZG529FtOBid.jpg'
			],
		},
		onLaunch: function() {
			// #ifndef MP-WEIXIN
			this.handleGetOssUploadList()
			// #endif
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN || MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let capsule = wx.getMenuButtonBoundingClientRect();
					if (capsule) {
						Vue.prototype.Custom = capsule;
						// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
						Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					}
					// #endif


					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
			autoUpdate()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async handleGetOssUploadList() {
				try {
					const { data } = await GetOssUploadList({ page: 1 })
					console.log('data', data);
					this.globalData.photos = data.filter(item => item.filename.indexOf('photo_') > -1).map(item => item.url)
				} catch (err) {
					console.log('err', err);
				}
			},
		}

	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/animation.css";
	@import "colorui/icon.css";

	.wrap {
		width: 100vw;
		min-height: 100vh;
		font-size: 28rpx;
		color: #111;
		background-color: #f3f4f5;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>