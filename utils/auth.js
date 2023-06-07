/**
 * 微信授权
 */
const authList = {
	userInfo: {
		apiName: ['getUserInfo'],
		authTitle: '需要使用你的用户信息',
		authContent: '需要使用你的用户信息，请确认授权'
	},
	userLocation: {
		apiName: ['getLocation', 'chooseLocation'],
		authTitle: '请求授权当前位置',
		authContent: '需要获取您的地理位置，请确认授权'
	},
	address: {
		apiName: ['chooseAddress'],
		authTitle: '需要使用你的通讯地址',
		authContent: '需要使用你的通讯地址，请确认授权'
	},
	invoiceTitle: {
		apiName: ['chooseInvoiceTitle'],
		authTitle: '需要使用你的发票抬头',
		authContent: '需要使用你的发票抬头，请确认授权'
	},
	invoice: {
		apiName: ['chooseInvoice'],
		authTitle: '需要获取你的发票',
		authContent: '需要获取你的发票，请确认授权'
	},
	werun: {
		apiName: ['getWeRunData'],
		authTitle: '需要获取你的微信运动数据',
		authContent: '需要获取你的微信运动数据，请确认授权'
	},
	writePhotosAlbum: {
		apiName: ['saveImageToPhotosAlbum', 'saveVideoToPhotosAlbum'],
		authTitle: '请求授权相册',
		authContent: '需要使用你的相册，请确认授权'
	},
}
/**
 * @description: 返回值中只会出现小程序已经向用户请求过的权限
 * @param {String} 权限名称
 * @return {Boolean} 是有拥有权限
 */
const getUniSetting = key => {
	if (typeof key === 'string' && !authList[key]) return false
	return new Promise(function(resolve) {
		uni.getSetting({
			success: async res => {
				var result = res.authSetting
				console.log('result[`scope.${key}`]',result[`scope.${key}`],result);
				// 用户拒绝过
				if (result[`scope.${key}`] === false) {
					uni.showModal({
						title: authList[key].authTitle,
						content: authList[key].authContent,
						success: function(res) {
							if (res.confirm) {
								uni.openSetting({
									success: async dataAu => {
										// 异步，进入授权页面授权后返回判断
										if (dataAu
											.authSetting[
												`scope.${key}`
											] === true
										) {
											// uni.showToast({
											// 	title: '授权成功',
											// 	icon: 'success',
											// 	duration: 1000
											// })
											resolve({
												type: 'success'
											})
										} else {
											resolve({
												type: 'err'
											})
											uni.showToast({
												title: '授权失败',
												icon: 'none',
												duration: 1000
											})
										}
									}
								})
								// 用户点击取消
							} else if (res.cancel) {
								resolve({
									type: 'err'
								})
								uni.showToast({
									title: '授权失败',
									icon: 'none',
									duration: 1000
								})
							}
						},
						fail:function(err){
							console.log(err);
						}
					})
				} else {
					//  已授权，或者还未授权
					resolve({
						type: 'success'
					})
				}
			}
		})
	})
}
export default {
	getUniSetting
}
