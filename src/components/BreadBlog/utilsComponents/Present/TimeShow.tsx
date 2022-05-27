import React, {Fragment, useEffect, useMemo, useState} from "react";
import {Card} from "antd";
import {getFormatTime} from "@utils/PresentUtils/TimeUtils";

export default function TimeShow({actions,extra}:any | undefined){
	const [time,setTime] = useState(getFormatTime(new Date().getTime() / 1000,"HH:mm:ss"))
	useEffect(() => {
		let timer = setInterval(() => {
			setTime(getFormatTime(new Date().getTime() / 1000,"HH:mm:ss"))
		},1000)
		return () => {
			clearInterval(timer)
		}
	},[])
	let getIcon = () => {
		let iconTime = parseInt(time.substring(0,2));
		if (iconTime <= 10){
			return 'icon-shangwu'
		}else if (iconTime >= 11 && iconTime <= 16){
			return 'icon-a-qingtianbaitian'
		}else if (iconTime >= 17 && iconTime <= 18){
			return 'icon-bangwan'
		}else {
			return "icon-wanshang"
		}
	}
	return(
		<Fragment>
			<Card title="你好,今天感觉如何?" actions={actions} extra={extra}>
				{useMemo(() => {
					return(
						<div className='time-container'>
							<i className={`iconfont ${getIcon()} time-icon`}/>
							<div className='time-info'>
								<h1 className='sounso-rare'>{time}</h1>
							</div>
						</div>
					)
				},[time])}
			</Card>
		</Fragment>
	)
}