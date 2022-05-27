import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
	relativeTime: {
		future: "%s内",
		past: "%s前",
		s: '一秒前',
		m: "一分钟",
		mm: "%d分钟",
		h: "一小时",
		hh: "%d小时",
		d: "一天",
		dd: "%d天",
		M: "一个月",
		MM: "%d月",
		y: "一年",
		yy: "%d年"
	}
})

function getFormatTime(time,format){
	return dayjs(time * 1000).format(format);
}
function getTimeFromNow(time){
	return dayjs(getFormatTime(time,'YYYY-MM-DD HH:mm:ss')).fromNow()
}
export {getFormatTime,getTimeFromNow}