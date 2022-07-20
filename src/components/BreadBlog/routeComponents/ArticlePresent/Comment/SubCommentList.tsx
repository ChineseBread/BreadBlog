import React, {useContext, useMemo, useState} from "react";
import {Avatar, Button, Comment, message} from "antd";
import {CommentOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import SubCommentEditor from "./SubCommentEditor";
import {CommentContext} from "./CommentContext";
import {getFormatTime} from "@utils/PresentUtils/TimeUtils";
import ArticlePreviewRequest from "@utils/RequestUtils/Operation/ArticlePreviewRequest";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

export default function SubCommentList({SubCommentsListInfo,getMoreSubComment}:{SubCommentsListInfo:SubCommentsListInfo,getMoreSubComment:any}){

	return(
		<div className='subcomment-container'>
			{useMemo(() => {
				return(
					SubCommentsListInfo.CommentsList.map(({fcommentid,fcommentdata,isliked = false,replydata}) => {
						return(
							<SubCommentItem
								key={fcommentid}
								fcommentid={fcommentid}
								replydata={replydata}
								fcommentdata={fcommentdata}
								isliked={isliked}
							/>
						)
					})
				)
			},[SubCommentsListInfo.CommentsList])}
			{SubCommentsListInfo.hasMore && <Button className='more-subcomment-button' type='text' onClick={getMoreSubComment}>更多评论</Button>}
		</div>
	)
}

/**
 * @param reply 被回复的姓名
 * @param isliked 是否点赞
 * @param fcommentid 追评对应的id
 * @param reply 该追评若为回复了其他的评论reply则是一个对应的fcommentid
 * @param isanonymous
 * @param username
 * @param createdtime
 * @param comment
 * @param like
 * @param userid
 * @param replydata
 */
function SubCommentItem({fcommentid,replydata = {username:'',replyid:'',like:0},fcommentdata:{isanonymous,comment,createdtime,userid,username,like,reply},isliked}:FCommentItem){
	const {commentsid,commentid} = useContext(CommentContext);
	const [likes, setLikes] = useState({isLike:isliked,action:isliked ? 'liked' : 'unliked'});
	const [commentVisible,setVisible] = useState(false)

	const likeComment = () => {
		ArticlePreviewRequest[likes.isLike ? 'unlikeSubComment' : 'likeSubComment'](commentsid,commentid,fcommentid).then(result => {
			if (result.Ok){
				setLikes(likes => {
					return{
						isLike: !likes.isLike,
						action: likes.isLike ? 'unliked' : 'liked'
					}
				})
			}else {
				message.warn(result.Msg)
			}
		})
	};

	return(
		<Comment
			actions={[
				<span onClick={likeComment}>
			 		{likes.action === 'liked' ? <LikeFilled/> : <LikeOutlined/>}
					<span className="comment-action">{likes.isLike ? parseInt(like) + 1 : like}</span>
				</span>,
				<span onClick={() => setVisible(commentVisible => !commentVisible)}>
					<CommentOutlined />
					<span className="comment-action">{commentVisible ? "返回" : "回复"}</span>
				</span>
			]}
			author={<a>{reply ? `${isanonymous ? '匿名用户' : username} 回复 ${replydata.username || '匿名用户'}` : username || '匿名用户' }</a>}
			avatar={<Avatar src={isanonymous ? '/sources/Anonymous.png' : PublicDataRequest.getUserAvatarUrl(userid)}/>}
			datetime={getFormatTime(createdtime,'YYYY-MM-DD HH:mm:ss')}
			content={
				<div className='comment-content-container'>
					<div className='comment-content comment'>
						<span>{comment}</span>
					</div>
					{reply && <div className='reply-comment comment'>
						{replydata.comment ? <span>{replydata.comment}</span> : <span className='no-reply-comment'>该评论含有敏感内容,已被删除</span>}
					</div>}
					{commentVisible && <SubCommentEditor
						username={username}
						fcommentid={fcommentid}
						setVisible={setVisible}
					/>}
				</div>
			}
		/>
	)
}