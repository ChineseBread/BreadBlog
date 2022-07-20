/**
 * @description 敏感评论提示
 */
import {useNavigate, useOutletContext} from "react-router-dom";
import {Avatar, Comment} from "antd";
import EmptyNotice from "../../EmptyNotice";
import CustomStorage from "@utils/StorageUtils/CustomStorage";
import {getTimeFromNow} from "@utils/PresentUtils/TimeUtils";
export default function SensCommentList() {
	const {NoticeList} = useOutletContext<{NoticeList:Notice[]}>()
	const list = NoticeList.filter(({Notice}) => Notice.theme === 'SensCmt')
	return (
		<div className='comment-warn-list'>
			{list.length >= 1 ? list.map(({NoticeId,Notice}) => {
				return <SensComment key={NoticeId} Notice={Notice}/>
			}) : <EmptyNotice/>}
		</div>
	);
}
function SensComment({Notice:{time,data:{ArticleId,Title,FCommentId,CommentId}}}:any){
	const navigator = useNavigate()
	const checkArticle = () => {
		navigator(`/post?articleid=${ArticleId}${CommentId ? `&reply=${CommentId}` : ''}`)
	}
	return (
		<div className='comment-info-item'>
			<Comment
				author={CustomStorage.getAccount().User}
				avatar={<Avatar src={CustomStorage.getAvatarUrl()} />}
				content={
					<p>
						{!FCommentId ? <>您在文章<span className='article-name' onClick={checkArticle}>{Title}</span>下的评论包含敏感内容,已被删除!</> :
							<>您的跟评含有敏感内容,已被删除</>
						}
					</p>
				}
				datetime={
					<span>{getTimeFromNow(time)}</span>
				}
			/>
		</div>
	)
}
