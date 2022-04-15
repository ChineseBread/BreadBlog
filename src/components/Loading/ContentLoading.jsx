import {useEffect, useState} from "react";
import './contentloading.less'
export default function ContentLoading(props) {
	let [subTitle,setSubTitle] = useState("努力加载中...")
	useEffect(()=>{
		let timer = setTimeout(()=>{
			setSubTitle("如若加载时间过长请刷新重试...")
		},10000)
		return () => {
			clearTimeout(timer)
		}
	},[subTitle])
	return (
		<div className='content_loading_container'>
			<div>
				<span className='subtitle'>
					{subTitle}
				</span>
			</div>

		</div>
	);
}
