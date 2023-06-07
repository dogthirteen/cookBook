function autoUpdate() {
	var self = this
	const updateManager = uni.getUpdateManager();
	//1. 检查小程序是否有新版本发布
	updateManager.onCheckForUpdate(function(res) {
		// 请求完新版本信息的回调
		if (res.hasUpdate) {
			//2. 小程序有新版本，则静默下载新版本，做好更新准备
			updateManager.onUpdateReady(function() {
				console.log(new Date())
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success: function(res) {
						if (res.confirm) {
							//3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate()
						} else if (res.cancel) {
							//如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
							uni.showModal({
								title: '温馨提示~',
								content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
								showCancel: false, //隐藏取消按钮
								success: function(res) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate()
								}
							})
						}
					}
				})
			})
			updateManager.onUpdateFailed(function() {
				// 新的版本下载失败
				uni.showModal({
					title: '已经有新版本了哟~',
					content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
				})
			})
		}
	})
}

export default autoUpdate
