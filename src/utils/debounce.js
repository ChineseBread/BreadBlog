/**
 * @debounce 防抖时间为0.5秒
 */
export default function debounce(method, wait, immediate) {
	let timeout, result
	return function (...args) {
		// 返回一个Promise，以便可以使用then或者Async/Await语法拿到原函数返回值
		return new Promise(resolve => {

			let context = this
			if (timeout) {
				clearTimeout(timeout)
			}
			if (immediate) {
				let callNow = !timeout
				timeout = setTimeout(() => {
					timeout = null
				}, wait)
				if (callNow) {
					result = method.apply(context, args)
					// 将原函数的返回值传给resolve
					resolve(result)
				}
			} else {
				timeout = setTimeout(() => {
					result = method.apply(context, args)
					// 将原函数的返回值传给resolve
					resolve(result)
				}, wait)
			}
		})
	}
}