import React, {Fragment, useEffect, useState} from "react";
import {Avatar, Comment, message} from "antd";
import {CommentOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import moment from "moment";
import SubCommentList from "./SubCommentList";
import CommentEditor from "./CommentEditor";
import PublicDataRequest from "../../../../../utils/RequestUtils/PublicDataRequest";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";

export default function CommentItem({commentItem:{isanonymous,userid,username,comment,createdtime,commentid,like,fcount,commentsid}}) {

	const [likes, setLikes] = useState({isLike:false,action:''});
	// const [action, setAction] = useState(null);

	const [commentVisible,setVisible] = useState(false)
	//子评论数组
	const [CommentsListInfo,setCommentsListInfo] = useState({CommentsList:[],hasMore:true})
	const [page,setPage] = useState(0)
	useEffect(() => {
		PublicDataRequest.getArticleSubComment(page + 1,commentsid,commentid).then(result => {
			if (result.Ok){
				let{ SubComments } = result
				setCommentsListInfo({CommentsList: SubComments.CommentsList,hasMore: true})

			}else{
				message.warn(result.Msg)
			}

		})
	},[])

	const likeComment = () => {
		UserOperationRequest[likes.isLike ? 'unlikeComment' : 'likeComment'](commentsid,commentid).then(result => {
			if (result?.Ok){
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

	return (
		<Fragment>
			<Comment
				actions={[
					<span onClick={likeComment}>
        				{likes.action === 'liked' ? <LikeFilled/> : <LikeOutlined/>}
						<span className="comment-action">{likes.isLike ? parseInt(like) + 1 : like}</span>
					</span>,
					<span onClick={() => setVisible(commentVisible => !commentVisible)}>
        				<CommentOutlined />
						<span className="comment-action">{fcount}</span>
						<span className="comment-action">回复</span>
					</span>
				]}
				author={<a>{isanonymous? '匿名用户' : username}</a>}
				avatar={<Avatar src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae361584a42c48df9e9930f36319cadd~tplv-k3u1fbpfcp-no-mark:200:200:200:200.awebp?" alt="admin" />}
				datetime={moment(createdtime * 1000).format('YYYY-MM-DD HH:mm:ss')}
				content={
					<div className='comment-content-container'>
						<span className='comment-content'>{comment}</span>
						{commentVisible && <CommentEditor
							username={username}
							commentsid={commentsid}
							commentid={commentid}
							setCommentsListInfo={setCommentsListInfo}
						/>}
					</div>
				}
			>
				{fcount >= 1 && <SubCommentList
					CommentsListInfo={CommentsListInfo}
					commentsid={commentsid}
					commentid={commentid}
					setCommentsListInfo={setCommentsListInfo}
				/>}
			</Comment>
		</Fragment>

	);
}

