import CustomComment from "./CustomComment";
import {Divider, message, Skeleton} from "antd";
import CommentItem from "./CommentItem";
import React, {Fragment, useEffect, useMemo, useState} from "react";
import PublicDataRequest from "../../../../../utils/RequestUtils/PublicDataRequest";
import {nanoid} from "nanoid";

export default function CommentsList({articleid}) {
	const [commentsList,setCommentList] = useState([])
	const [commentsid,setCommentsId] = useState('')
	const [loading,setLoading] = useState(true)
	useEffect(() => {
		PublicDataRequest.getArticleComment(articleid).then(result => {
			if (result?.Ok){
				setCommentsId(result.CommentsId)
				setCommentList(result.CommentsList)
				setLoading(false)
			}else {
				message.warn("获取评论失败")
			}
		})
	},[])
	return (
		<Fragment>
			<CustomComment articleid={articleid} setCommentList={setCommentList}/>
			<Divider/>
			<div className='comment-list-container'>
				<div className='comment-title'>
					<span>全部评论</span>
				</div>
				<Skeleton active loading={loading}>
					<div className='comment-list'>
						{
							useMemo(() => {
								return(
									commentsList?.length >= 1 ? commentsList.map(comment => {
											return <CommentItem key={nanoid()} commentItem={{...comment, commentsid}}/>
										}) :
									<span><h3>暂无评论...</h3></span>
								)
							},[commentsList])
						}
					</div>
				</Skeleton>
			</div>
		</Fragment>
	);
}
