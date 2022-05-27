import React from "react";
import {getTimeFromNow} from "@utils/PresentUtils/TimeUtils";

export default function LikeArticle({time}) {
	return (
		<div className='dynamic-description'>
			<span className='time-from-now'>{getTimeFromNow(time)}</span>点赞了这篇文章
		</div>
	)
}
