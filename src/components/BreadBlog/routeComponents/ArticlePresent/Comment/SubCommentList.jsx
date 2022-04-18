import React, {useMemo, useState} from "react";
import {Avatar, Comment, message} from "antd";
import {CommentOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import moment from "moment";
import SubCommentEditor from "./SubCommentEditor";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";

export default function SubCommentList({commentid,commentsid,SubCommentsListInfo,setSubCommentsListInfo}){

	return(
		<div className='subcomment-container'>
			{useMemo(() => {
				SubCommentsListInfo.CommentsList.forEach(({fcommentdata}) => {
					if (fcommentdata.reply){
						SubCommentsListInfo.CommentsList.forEach(({fcommentid,fcommentdata:{username,comment}}) => {
							if (fcommentid === fcommentdata.reply) {
								fcommentdata.reply = username || '匿名用户'
								fcommentdata.replyComment = comment
							}
						})
					}
				})
				return(
					SubCommentsListInfo.CommentsList.map(({fcommentid,fcommentdata,isliked = false}) => {
						return(
							<SubCommentItem
								key={fcommentid}
								fcommentdata={{...fcommentdata,isliked}}
								commentid={commentid}
								commentsid={commentsid}
								fcommentid={fcommentid}
								setSubCommentsListInfo={setSubCommentsListInfo}
							/>
						)
					})
				)
			},[SubCommentsListInfo.CommentsList])}
		</div>
	)
}

/**
 * @reply 被回复的姓名
 * @isliked 是否点赞
 */
function SubCommentItem({fcommentdata:{isanonymous,username,createdtime,comment,like,reply,replyComment,isliked},commentid,commentsid,fcommentid,setSubCommentsListInfo}){
	const [likes, setLikes] = useState({isLike:isliked,action:isliked ? 'liked' : 'unliked'});

	const [commentVisible,setVisible] = useState(false)

	const likeComment = () => {
		UserOperationRequest[likes.isLike ? 'unlikeSubComment' : 'likeSubComment'](commentsid,commentid,fcommentid).then(result => {
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
			author={<a>{isanonymous ? '匿名用户' : reply ? `${username} 回复 ${reply}` : username}</a>}
			avatar={<Avatar src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae361584a42c48df9e9930f36319cadd~tplv-k3u1fbpfcp-no-mark:200:200:200:200.awebp?" alt="admin" />}
			datetime={moment(createdtime * 1000).format('YYYY-MM-DD HH:mm:ss')}
			content={
				<div className='comment-content-container'>
					<div className='comment-content comment'>
						<span>{comment}</span>
					</div>
					{reply && <div className='reply-comment comment'>
						<span>{replyComment}</span>
					</div>}
					{commentVisible && <SubCommentEditor
						username={username}
						commentsid={commentsid}
						commentid={commentid}
						fcommentid={fcommentid}
						setSubCommentsListInfo={setSubCommentsListInfo}
						setVisible={setVisible}
					/>}
				</div>
			}
		/>
	)
}