import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Comment,message} from "antd";
import { CommentOutlined } from "@ant-design/icons";
import CommentEditor from "./CommentEditor";
import {getTimeFromNow} from "@utils/PresentUtils/TimeUtils";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

export default function NewComment({Notice:{time,data:{ArticleId,Title,CommentsId:commentsid,CommentId:commentid,UserName,UserId,Anonymous,Comment:comment}}}:any){

	const navigator = useNavigate()
	const [commentVisible,setVisible] = useState(false)

	const checkArticle = () => {
		navigator(`/post?articleid=${ArticleId}&reply=${commentid}`)
	}
	const checkUser = () => {
		if (Anonymous){
			message.warn('匿名用户')
			return;
		}
		navigator(`/preview/${UserId}`)
	}
	return(
		<div className='comment-info-item'>
			<Comment
				author={!Anonymous ? UserName : '匿名用户'}
				// @ts-ignore
				avatar={<Avatar onClick={checkUser} src={Anonymous ? '/sources/Anonymous.png' : PublicDataRequest.getUserAvatarUrl(UserId)}/>}
				content={
					<>
						在你的文章<span className='article-name' onClick={checkArticle}>{Title}</span>下发表了评论
						{comment && <div className='reply-comment'>
							{comment}
						</div>}
						{commentVisible && <CommentEditor
							username={UserName}
							commentid={commentid}
							commentsid={commentsid}
							setVisible={setVisible}
						/>
						}
					</>
				}
				datetime={
					<span>{getTimeFromNow(time)}</span>
				}
				actions={[
					<span onClick={() => setVisible(commentVisible => !commentVisible)}>
        				<CommentOutlined />
						<span className="comment-action">{commentVisible ? "返回" : "回复"}</span>
					</span>
				]}
			/>
		</div>
	)
}
