import {useNavigate, useOutletContext} from "react-router-dom";
import {Avatar, Comment} from "antd";
import EmptyNotice from "../../../EmptyNotice";
import {getTimeFromNow} from "@utils/PresentUtils/TimeUtils";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

export default function NewLikeList() {
	const {NoticeList} = useOutletContext<{NoticeList:Notice[]}>()
	const list = NoticeList.filter(({Notice}) => Notice.theme === 'NewLike')
	return (
		<div className='like-info-list'>
			{list.length >= 1 ? list.map(({NoticeId,Notice}) => {
				return (
					<NewLike key={NoticeId} Notice={Notice}/>
				)
			}) : <EmptyNotice/>}
		</div>
	);
}
function NewLike({Notice:{time,data:{ArticleId,UserId,UserName,Title}}}:any){
	const navigator = useNavigate()
	const checkArticle = () => {
		navigator(`/post?articleid=${ArticleId}`)
	}
	const checkUser = () => {
		navigator(`/preview/${UserId}`)
	}
	return(
		<div className='like-info-item' >
			<Comment
				author={UserName}
				//@ts-ignore
				avatar={<Avatar onClick={checkUser} src={PublicDataRequest.getUserAvatarUrl(UserId)} />}
				content={
					<p>
						Ta点赞了你的文章 <span className='article-name' onClick={checkArticle}>{Title}</span>
					</p>
				}
				datetime={
					<span>{getTimeFromNow(time)}</span>
				}
			/>
		</div>
	)
}