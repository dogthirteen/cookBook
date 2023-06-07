// 格式化金额  9999=>9,999
function toThousands(num = 0) {
  console.log('num', num)
  if (num > 0 || isNaN(Number(num)) || !num) {
    return '0.00'
  }
  let result = []
  let counter = 0
  let dight = num.toString().split('.')
  num = (num || 0).toString().split('.')[0].split('')
  for (let i = num.length - 1; i >= 0; i--) {
    counter++
    result.unshift(num[i])
    if (!(counter % 3) && i != 0) {
      result.unshift(',')
    }
  }
  return result.join('') + (dight.length > 1 ? `.${dight[1]}` : '')
}

/**
 * 将时间解析为字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time || time === '0') {
    return ''
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // 支持safari
        // 详见 https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(/-/gm, '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // 注意：getDay()在星期天返回0
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

export { toThousands, parseTime }
