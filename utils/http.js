import _show_error from './showMsg.js'

function request(url, data = {}, method = 'GET', needToken = false, loading = true, header = {}) {
	return new Promise((resolve, reject) => {
		_request(url, resolve, reject, data, method, needToken, loading, header)
	})
}

function _request(url, resolve, reject, data, method, needToken, loading, header) {
	header = {
		...header,
	}
	if (needToken) {
		header['Authorization'] = uni.getStorageSync('token') || ''
	}
	if (loading) {
		uni.showLoading({
			title: '加载中',
			mask: true,
		})
	}
	uni.request({
		url,
		method,
		data,
		header,
		success: res => {
			loading && uni.hideLoading()
			if (res.data.code === 'success') {
				if (res.data.token) {
					uni.setStorageSync('token', res.data.token)
				}
				resolve(res.data)
			} else {
				console.log('ApiUrl===>', url, res)
				reject(res || 'error')
				_show_error(url, res.data.code, res.data.msg)
			}
		},
		fail: err => {
			console.log('err', err)

			loading && uni.hideLoading()

			reject(err)
			_show_error(url, '', '')
		},
	})
}

export default request