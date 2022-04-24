import React, {Fragment, useEffect, useMemo, useState} from "react";
import {Button, Divider, message, Skeleton} from "antd";
import CommentItem from "./CommentItem";
import CustomComment from "./CustomComment";
import PublicDataRequest from "../../../../../utils/RequestUtils/PublicDataRequest";
import {DownOutlined} from "@ant-design/icons";

export default function CommentsList({articleid,commentsid}) {

	const [CommentsListInfo,setCommentListInfo] = useState({CommentsList:[],hasMore:false})
	const [loading,setLoading] = useState(true)
	const [page,setPage] = useState(1)

	useEffect(() => {
		PublicDataRequest.getArticleComments(commentsid,1).then(result => {
			if (result?.Ok){
				let {CommentsList,total} = result
				setCommentListInfo({CommentsList,hasMore:result.CommentsList.length < total})
			}else {
				message.warn("获取评论失败")
			}
			setLoading(false)
		})
	},[])
	const getMoreArticleComment = () => {

		PublicDataRequest.getArticleComments(commentsid,page + 1).then(result => {
			if (result?.Ok){
				let {CommentsList,total} = result
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
				<div className='comment-list-container'>
					<div className='comment-title'>
						<span>全部评论</span>
					</div>
						<div className='comment-list'>
							{
								useMemo(() => {
									let { CommentsList } = CommentsListInfo
									return(
										CommentsList.length >= 1 ? CommentsList.map(comment => {
												return <CommentItem key={comment.CommentId} commentsid={commentsid} commentItem={{...comment.CommentData,isliked:comment.isliked,fcount:comment.FcommentCount,commentid:comment.CommentId}}/>
											}) :
											<span><h3>暂无评论...</h3></span>
									)
								},[CommentsListInfo.CommentsList])
							}
						</div>
				</div>
			</Skeleton>
			{<Button type='text' icon={<DownOutlined />} disabled={!CommentsListInfo.hasMore} onClick={getMoreArticleComment}>{CommentsListInfo.hasMore ? "更多回复" : "没有评论了"}</Button>}
		</Fragment>
	);
}
