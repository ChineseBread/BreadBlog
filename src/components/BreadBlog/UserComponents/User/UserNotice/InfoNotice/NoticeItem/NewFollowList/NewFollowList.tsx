import React from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {Avatar, Comment} from "antd";
import EmptyNotice from "../../../EmptyNotice";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";
import {getTimeFromNow} from "@utils/PresentUtils/TimeUtils";
import SubscribeBtn from "@utilsComponents/User/SubscribeBtn";

export default function NewFollowList() {
	const {NoticeList} = useOutletContext<{NoticeList:Notice[]}>()
	const list = NoticeList.filter(({Notice}) => Notice.theme === 'NewFans')
	return (
		<div className='fans-info-list'>
			{list.length >= 1 ? list.map(({NoticeId,Notice}) => {
				return (
					<NewFans key={NoticeId} Notice={Notice}/>
				)
			}) : <EmptyNotice/>}
		</div>
	);
}
function NewFans({Notice:{time,data:{UserId,UserName}}}:any){
	const navigator = useNavigate()
	const checkUser = () => {
		navigator(`/preview/${UserId}`)
	}
	return(
		<div className='fans-info-item'>
			<Comment
				author={UserName}
				//@ts-ignore
				avatar={<Avatar onClick={checkUser} src={PublicDataRequest.getUserAvatarUrl(UserId)}/>}
				content={
					<>
						<div>
							<span className='article-name' onClick={checkUser}>{UserName}</span>关注了您
						</div>
						<div>
							<SubscribeBtn userid={UserId} type='default'/>
						</div>
					</>
				}
				datetime={
					<span>{getTimeFromNow(time)}</span>
				}
			/>
		</div>
	)
}