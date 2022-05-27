import React from "react";
import {useOutletContext} from "react-router-dom";
import EmptyNotice from "../../../EmptyNotice";
import NewComment from "./NewComment";
import NewFComment from "./NewFComment";
export default function NewCommentList() {
	const {NoticeList} = useOutletContext<{NoticeList:Notice[]}>()
	const list = NoticeList.filter(({Notice}) => Notice.theme === 'NewCmt' || Notice.theme === 'NewFCmt')
	return (
		<div className='comment-info-list'>
			{list.length >= 1 ? list.map(({NoticeId,Notice}) => {
				return (
					Notice.theme === 'NewCmt' ? <NewComment key={NoticeId} Notice={Notice}/> : <NewFComment key={NoticeId} Notice={Notice}/>
				)
			}) : <EmptyNotice/>}
		</div>
	);
}
