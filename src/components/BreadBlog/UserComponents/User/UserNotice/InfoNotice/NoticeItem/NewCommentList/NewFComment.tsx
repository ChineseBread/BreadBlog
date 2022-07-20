import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Comment,message} from "antd";
import {CommentOutlined} from "@ant-design/icons";
import FCommentEditor from "./NewFCommentEditor";
import {getTimeFromNow} from "@utils/PresentUtils/TimeUtils";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

export default function NewFComment({Notice:{time,data:{CommentId:commentid,CommentsId:commentsid,UserName,UserId,Anonymous,Fcomment}}}:any) {

	const navigator = useNavigate()
	const [commentVisible,setVisible] = useState(false)

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
						回复了你文章下的评论
						{Fcomment && <div className='reply-comment'>
							{Fcomment}
						</div>}
						{commentVisible && <FCommentEditor
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
