import React, {Fragment, useEffect, useMemo, useState} from "react";
import moment from "moment";
import {Card} from "antd";

export default function TimeShow({actions}){
	const [time,setTime] = useState(moment().format("HH:mm:ss"))
	useEffect(() => {
		let timer = setInterval(() => {
			setTime(moment().format("HH:mm:ss"))
		},1000)
		return () => {
			clearInterval(timer)
		}
	},[])
	let getIcon = () => {
		let iconTime = time.substring(0,2);
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
			<Card title="你好,今天感觉如何?" actions={actions}>
				{useMemo(() => {
					return(
						<div className='time-container'>
							<i className={`iconfont ${getIcon()} time-icon`}/>
							<div className='time-info'>
								<h1>{time}</h1>
							</div>
						</div>
					)
				},[time])}
			</Card>
		</Fragment>
	)
}