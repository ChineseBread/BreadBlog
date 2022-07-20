import React, {Fragment, useEffect, useState} from "react";
import {Avatar, Comment, message} from "antd";
import {CommentOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import SubCommentList from "./SubCommentList";
import CommentEditor from "./CommentEditor";
import {CommentContextProvider} from "./CommentContext";
import {getFormatTime} from "@utils/PresentUtils/TimeUtils";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";
import ArticlePreviewRequest from "@utils/RequestUtils/Operation/ArticlePreviewRequest";
import ArticlePreviewDataRequest from "@utils/RequestUtils/Data/ArticlePreviewDataRequest";

/**
 * @attention token过期拿不到数据
 * @attention 评论的reply需要放在fcommentdata
 * @param commentsid 评论集对应的id
 * @param CommentId 评论id
 */

export default function CommentItem({commentsid,commentItem:{CommentId:commentid,FcommentCount:fcount,isliked,CommentData:{isanonymous,userid,username,comment,createdtime,like}}}: CommentItem) {

	const [likes, setLikes] = useState({isLike:isliked,action:isliked ? 'liked' : 'unliked'});
	const [commentVisible,setVisible] = useState(false)
	//子评论数组
	const [SubCommentsListInfo,setSubCommentsListInfo] = useState<ListInfo<{CommentsList:FCommentItem[]}>>({CommentsList:[],hasMore:false})
	const [page,setPage] = useState(1)

	useEffect(() => {
		fcount >= 1 && ArticlePreviewDataRequest.getArticleSubComment(page,commentsid,commentid).then(result => {
			if (result.Ok){
				const {SubComments:{CommentsList,total} = {CommentsList:[],total:0}} = result
				setSubCommentsListInfo({CommentsList,hasMore: CommentsList.length < total})
			}

		})
	},[])
	const likeComment = () => {
		ArticlePreviewRequest[likes.isLike ? 'unlikeComment' : 'likeComment'](commentsid,commentid).then(result => {
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
	const getMoreSubComment = () => {
		ArticlePreviewDataRequest.getArticleSubComment(page + 1,commentsid,commentid).then(result => {
			if (result.Ok){
				const {SubComments:{CommentsList,total} = {CommentsList:[],total:0}} = result
				setPage(page => page + 1)
				setSubCommentsListInfo(SubCommentsListInfo => {
					return{
						CommentsList:[...SubCommentsListInfo.CommentsList,...CommentsList],
						hasMore: CommentsList.length + SubCommentsListInfo.CommentsList.length < total
					}
				})
			}else{
				message.warn(result.Msg)
			}
		})
	}
	return (
		<Fragment>
			<Comment
				// @ts-ignore
				id={commentid}
				actions={[
					<span onClick={likeComment}>
        				{likes.action === 'liked' ? <LikeFilled/> : <LikeOutlined/>}
						<span className="comment-action">{likes.isLike ? parseInt(like) + 1 : like}</span>
					</span>,
					<span onClick={() => setVisible(commentVisible => !commentVisible)}>
        				<CommentOutlined />
						<span className="comment-action">{fcount || 0}</span>
						<span className="comment-action">{commentVisible ? "返回" : "回复"}</span>
					</span>
				]}
				author={<a>{isanonymous? '匿名用户' : username}</a>}
				avatar={<Avatar src={isanonymous ? '/sources/Anonymous.png' : PublicDataRequest.getUserAvatarUrl(userid)}/>}
				datetime={getFormatTime(createdtime,'YYYY-MM-DD HH:mm:ss')}
				content={
					<div className='comment-content-container'>
						<span className='comment-content'>{comment}</span>
						{commentVisible && <CommentEditor
							username={username}
							commentsid={commentsid}
							commentid={commentid}
							setSubCommentsListInfo={setSubCommentsListInfo}
							setVisible={setVisible}
						/>}
					</div>
				}
			>
				<CommentContextProvider value={{commentsid,commentid,setSubCommentsListInfo}}>
					<SubCommentList
						SubCommentsListInfo={SubCommentsListInfo}
						getMoreSubComment={getMoreSubComment}
					/>
				</CommentContextProvider>
			</Comment>
		</Fragment>

	);
}

