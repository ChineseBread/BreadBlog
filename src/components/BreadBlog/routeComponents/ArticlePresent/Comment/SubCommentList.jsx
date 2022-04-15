import React, {useMemo, useState} from "react";
import {Avatar, Comment} from "antd";
import {CommentOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import moment from "moment";
import SubCommentEditor from "./SubCommentEditor";

export default function SubCommentList({commentid,commentsid,CommentsListInfo}){

	return(
		<div className='subcomment-container'>
			{useMemo(() => {
				return(
					CommentsListInfo.CommentsList.map(({fcommentid,fcommentdata}) => {
						return(
							<SubCommentItem
								key={fcommentid}
								fcommentdata={fcommentdata}
							/>
						)
					})
				)
			},[CommentsListInfo.CommentsList])}
		</div>
	)
}
function SubCommentItem({fcommentdata:{isanonymous,username,createdtime,comment,like}}){
	const [likes, setLikes] = useState(false);
	const [action, setAction] = useState(null);
	const [commentVisible,setVisible] = useState(false)
	const likeComment = () => {
		if (likes){
			setLikes(false);
			setAction('');
		}else{
			setLikes(true);
			setAction('liked');
		}

	};

	return(
		<Comment
			actions={[
				<span onClick={likeComment}>
			 		{action === 'liked' ? <LikeFilled/> : <LikeOutlined/>}
					<span className="comment-action">{likes ? like + 1 : like}</span>
				</span>,
				<span onClick={() => setVisible(commentVisible => !commentVisible)}>
					<CommentOutlined />
					<span className="comment-action">0</span>
					<span className="comment-action">回复</span>
				</span>
			]}
			author={<a>{isanonymous ? '匿名用户' : username}</a>}
			avatar={<Avatar src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae361584a42c48df9e9930f36319cadd~tplv-k3u1fbpfcp-no-mark:200:200:200:200.awebp?" alt="admin" />}
			datetime={moment(createdtime * 1000).format('YYYY-MM-DD HH:mm:ss')}
			content={
				<div className='comment-content-container'>
					<span className='comment-content'>{comment}</span>
					{commentVisible && <SubCommentEditor username={username}/>}
				</div>
			}
		/>
	)
}