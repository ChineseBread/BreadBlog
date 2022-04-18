import TextArea from "antd/es/input/TextArea";
import {Button, message, Switch} from "antd";
import React, {useMemo, useState} from "react";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";

export default function SubCommentEditor({username,commentsid,commentid,fcommentid,setSubCommentsListInfo,setVisible}) {
	const [text,setText] = useState('')
	const [isAnonymous,setAnonymous] = useState(false)
	const changeAnonymous = () => {
		setAnonymous(isAnonymous =>　!isAnonymous)
	}
	const changeComment = ({target}) => {
		setText(target.value)
	}
	const sendReply = () => {
		if (!text){
			message.warn('请输入评论')
			return
		}
		UserOperationRequest.sendSubCommentReply(commentsid,commentid,isAnonymous,text,fcommentid).then(result => {
			if (result.Ok){
				setSubCommentsListInfo(CommentsInfo => {
					return{
						hasMore:CommentsInfo.hasMore,
						CommentsList:[...CommentsInfo.CommentsList,result.FComment]
					}
				})
			}else{
				message.warn(result.Msg)
			}
			setAnonymous(false)
			setText('')
			setVisible(false)
		})
	}
	return (
		useMemo(() => {
			return(
				<div className='comment-editor'>
					<TextArea value={text} showCount maxLength={100} placeholder={`回复给${username || '匿名用户'}:`} onChange={changeComment}/>
					<Button htmlType="submit" type="primary" onClick={sendReply}>
						回复
					</Button>
					<Switch defaultChecked={true} checkedChildren='公开' unCheckedChildren='私人' onChange={changeAnonymous}/>
				</div>
			)
		},[text])
	)
}