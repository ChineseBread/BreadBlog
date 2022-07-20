/**
 * @description 判断当前表单选择值默认值
 * @param pathname
 * @param regExp
 * @param defaultValue
 * @returns {function(): *}
 */
export default function (pathname,regExp,defaultValue){
	const result = regExp.exec(pathname)
	return result ? result[0] : defaultValue
}