import React, {Fragment, useEffect, useMemo, useState} from "react";
import {Button, Divider, message, Skeleton} from "antd";
import CommentItem from "./CommentItem";
import CustomComment from "./CustomComment";
import PublicDataRequest from "../../../../../utils/RequestUtils/PublicDataRequest";
import {DownOutlined} from "@ant-design/icons";

export default function CommentsList({articleid}) {
	const [CommentsListInfo,setCommentListInfo] = useState({CommentsList:[],commentsid:'',hasMore:false})
	// const [commentsid,setCommentsId] = useState('')
	const [loading,setLoading] = useState(true)
	const [page,setPage] = useState(1)
	useEffect(() => {
		PublicDataRequest.getArticleComment(articleid,1).then(result => {
			if (result?.Ok){
				let {CommentsList,CommentsId,total} = result
				setCommentListInfo({CommentsList,commentsid: CommentsId,hasMore:result.CommentsList.length < total})
				setLoading(false)
			}else {
				message.warn("获取评论失败")
			}
		})
	},[])
	const getMoreArticleComment = () => {

		PublicDataRequest.getArticleComment(articleid,page + 1).then(result => {
			if (result?.Ok){
				let {CommentsList,CommentsId,total} = result
				setPage(page => page + 1)
				setCommentListInfo(CommentsListInfo => {
					return {
						hasMore: CommentsList.length + CommentsListInfo.CommentsList.length < total,
						CommentsList: [...CommentsListInfo.CommentsList,...CommentsList],
						commentsid: CommentsId
					}
				})
			}else {
				message.warn("获取评论失败")
			}
		})
	}
	return (
		<Fragment>
			<CustomComment articleid={articleid} setCommentListInfo={setCommentListInfo}/>
			<Divider/>
			<div className='comment-list-container'>
				<div className='comment-title'>
					<span>全部评论</span>
				</div>
				<Skeleton active loading={loading}>
					<div className='comment-list'>
						{
							useMemo(() => {
								let {CommentsList,commentsid} = CommentsListInfo
								return(
									CommentsList.length >= 1 ? CommentsList.map(comment => {
											return <CommentItem key={comment.commentid} commentItem={{...comment, commentsid}}/>
										}) :
									<span><h3>暂无评论...</h3></span>
								)
							},[CommentsListInfo.CommentsList])
						}
					</div>
				</Skeleton>
			</div>
			{<Button type='text' icon={<DownOutlined />} disabled={!CommentsListInfo.hasMore} onClick={getMoreArticleComment}>{CommentsListInfo.hasMore ? "更多回复" : "没有评论了"}</Button>}
		</Fragment>
	);
}
