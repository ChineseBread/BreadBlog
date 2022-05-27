import React, {Fragment, useEffect, useMemo, useState} from "react";
import {Button, Divider, message, Skeleton} from "antd";
import {DownOutlined} from "@ant-design/icons";
import CommentItem from "./CommentItem";
import CustomComment from "./CustomComment";
import ArticlePreviewDataRequest from "@utils/RequestUtils/Data/ArticlePreviewDataRequest";

export default function CommentsList({articleid,commentsid,reply}:any) {

	const [CommentsListInfo,setCommentListInfo] = useState<ListInfo<{CommentsList:PreviewCommentItem[]}>>({CommentsList:[],hasMore:false})
	const [loading,setLoading] = useState(true)
	const [page,setPage] = useState(1)

	useEffect(() => {
		ArticlePreviewDataRequest.getArticleComments(commentsid,1).then(result => {
			if (result?.Ok){
				let {CommentsList = [],total = 0} = result
				setCommentListInfo({CommentsList:CommentsList,hasMore:CommentsList.length < total })
			}else {
				message.warn("获取评论失败")
			}
			setLoading(false)
		})
	},[])
	// 如果有评论回复就直接跳转到该位置
	useEffect(() => {
		const element = reply && document.getElementById(reply);
		element && setTimeout(() => {
			element.scrollIntoView({block:'center'})
		},400)
	},[loading])

	const getMoreArticleComment = () => {

		ArticlePreviewDataRequest.getArticleComments(commentsid,page + 1).then(result => {
			if (result?.Ok){
				let {CommentsList = [],total = 0} = result
				setPage(page => page + 1)
				setCommentListInfo(CommentsListInfo => {
					return {
						hasMore: CommentsList.length + CommentsListInfo.CommentsList.length < total,
						CommentsList: [...CommentsListInfo.CommentsList,...CommentsList],
					}
				})
			}else {
				message.warn("获取评论失败")
			}
		})
	}
	return (
		<Fragment>
			<Skeleton active loading={loading}>
				<CustomComment articleid={articleid} setCommentListInfo={setCommentListInfo}/>
				<Divider/>
				<div className='comment-list-container' id='comment'>
					<div className='comment-title'>
						<span>全部评论</span>
					</div>
						<div className='comment-list'>
							{
								useMemo(() => {
									let { CommentsList } = CommentsListInfo
									return(
										CommentsList.length >= 1 ? CommentsList.map(comment => {
												return <CommentItem key={comment.CommentId} commentsid={commentsid} commentItem={{CommentData:comment.CommentData,isliked:comment.isliked,FcommentCount:comment.FcommentCount,CommentId:comment.CommentId}}/>
											}) :
											<span><h3>暂无评论...</h3></span>
									)
								},[CommentsListInfo.CommentsList])
							}
						</div>
				</div>
			</Skeleton>
			<Button type='text' icon={<DownOutlined />} disabled={!CommentsListInfo.hasMore} onClick={getMoreArticleComment}>{CommentsListInfo.hasMore ? "更多回复" : "没有评论了"}</Button>
		</Fragment>
	);
}
