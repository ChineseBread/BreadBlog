import {Avatar, Button, message, Switch} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, {useState} from "react";
import CustomStorage from "@utils/StorageUtils/CustomStorage";
import ArticlePreviewRequest from "@utils/RequestUtils/Operation/ArticlePreviewRequest";

/**
 *
 * @param articleid
 * @param setCommentListInfo
 */
function CustomComment({articleid,setCommentListInfo}:any){
	const [isAnonymous,setAnonymous] = useState(false);
	const [comment,setComment] = useState("")

	let sendComment = async () =>{
		if (!comment){
			message.warn("请输入评论")
			return
		}
		let result = await ArticlePreviewRequest.sendComment(comment,articleid,isAnonymous)
		if (result.Ok){
			let {UserID,User} = CustomStorage.getAccount()
			let { CommentId } = result
			setCommentListInfo((CommentsListInfo:CommentsListInfo) => {
				return{
					CommentsList:[{CommentId,FcommentCount:0,isliked:false,CommentData:{like:0,isanonymous:isAnonymous,userid:UserID,username:User,createdtime:Date.now() / 1000,comment}},...CommentsListInfo.CommentsList],
					hasMore:CommentsListInfo.hasMore,
				}
			})
			setComment('')
			message.success('评论成功')
		}else{
			message.warn(result.Msg)
		}

	}
	let handleCommentChange = ({target}:any) => {
		setComment(target.value)
	}
	let onChange = () => {
		setAnonymous(isAnonymous => !isAnonymous)
	}
	return(
		<div className='custom-comment-form'>
			<div className='comment-title'>
				<div>评论</div>
				<div className='custom-comment-action'>
					<span><Button onClick={sendComment}>发送评论</Button></span>
					<span><Switch checkedChildren="公开" unCheckedChildren="匿名" defaultChecked onChange={onChange}/></span>
				</div>
			</div>
			<div className='comment-input'>
				<Avatar size={65} src={CustomStorage.getAvatarUrl()} />
				<TextArea showCount maxLength={100} placeholder='留下你的足迹...' value={comment} onChange={handleCommentChange}/>
			</div>
		</div>
	)
}
export default React.memo(CustomComment,() => true)