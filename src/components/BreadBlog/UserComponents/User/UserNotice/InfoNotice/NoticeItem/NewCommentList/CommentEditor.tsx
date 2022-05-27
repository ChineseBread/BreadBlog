import React, {useState} from "react";
import {Button, Input, message, Switch} from "antd";
import ArticlePreviewRequest from "@utils/RequestUtils/Operation/ArticlePreviewRequest";

export default function CommentEditor({username,commentid,commentsid,setVisible}:any) {
	const [isAnonymous,setAnonymous] = useState(false)
	const [text,setText] = useState('')
	const changeAnonymous = () => {
		setAnonymous(isAnonymous => !isAnonymous)
	}
	const changeComment = ({target}:any) => {
		setText(target.value)
	}
	const sendSubComment = () => {
		if (!text) {
			message.warn('请输入评论')
			return
		}
		ArticlePreviewRequest.sendSubComment(text,commentsid,commentid,isAnonymous).then(result => {
			if (result.Ok){
				message.success('回复成功')
			}else {
				message.warn(result.Msg)
			}
			setAnonymous(false)
			setText('')
			setVisible(false)
		})
	}
	return (

		<div className='comment-editor'>
			<Input value={text} maxLength={50} placeholder={`回复给${username || '匿名用户'}:`} onChange={changeComment}/>
			<Button size='small' htmlType="submit" type="primary" onClick={sendSubComment}>
				回复
			</Button>
			<Switch  defaultChecked={true} checkedChildren='公开' unCheckedChildren='私人' onChange={changeAnonymous}/>
		</div>
	)
}