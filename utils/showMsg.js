export default function _show_error(url = '', code = '', msg = '') {
  uni.showToast({
    title: `${msg || '网络太慢了，请重试'}`,
    icon: 'none',
    duration: 2000,
  })
}
