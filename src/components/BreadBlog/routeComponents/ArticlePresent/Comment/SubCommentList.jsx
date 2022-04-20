import React, {useContext, useMemo, useState} from "react";
import {Avatar, Button, Comment, message} from "antd";
import {CommentOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import moment from "moment";
import SubCommentEditor from "./SubCommentEditor";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";
import {CommentContext} from "./CommentContext";

export default function SubCommentList({SubCommentsListInfo,getMoreSubComment}){

	return(
		<div className='subcomment-container'>
			{useMemo(() => {
				return(
					SubCommentsListInfo.CommentsList.map(({fcommentid,fcommentdata,isliked = false,replydata}) => {
						return(
							<SubCommentItem
								key={fcommentid}
								fcommentdata={{...fcommentdata,isliked}}
								fcommentid={fcommentid}
								replydata={replydata}
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
 */
function SubCommentItem({fcommentid,fcommentdata:{isanonymous,username,createdtime,comment,like,reply,isliked},replydata}){

	const {commentsid,commentid} = useContext(CommentContext);
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
			author={<a>{isanonymous ? '匿名用户' : reply ? `${username} 回复 ${replydata.username || '匿名用户'}` : username}</a>}
			avatar={<Avatar src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae361584a42c48df9e9930f36319cadd~tplv-k3u1fbpfcp-no-mark:200:200:200:200.awebp?" alt="admin" />}
			datetime={moment(createdtime * 1000).format('YYYY-MM-DD HH:mm:ss')}
			content={
				<div className='comment-content-container'>
					<div className='comment-content comment'>
						<span>{comment}</span>
					</div>
					{reply && <div className='reply-comment comment'>
						<span>{replydata.comment}</span>
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