import React from "react";
import {getTimeFromNow} from "@utils/PresentUtils/TimeUtils";

/**
 * @description 新撰写文章
 */
export default function NewArticle({time}){
	return(
		<div className='dynamic-description'>
			<span className='time-from-now'>{getTimeFromNow(time)}</span>发布了文章
		</div>
	)
}
