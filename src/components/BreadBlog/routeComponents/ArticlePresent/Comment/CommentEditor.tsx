import React, {useState} from "react";
import {Button, message, Switch,Input} from "antd";
import ArticlePreviewRequest from "@utils/RequestUtils/Operation/ArticlePreviewRequest";

/**
 * @description 子评论列表
 * @param username 用户名
 * @param commentid 评论id -> 单个评论
 * @param commentsid 评论组id
 * @param setCommentsListInfo
 */
const {TextArea} = Input

export default function CommentEditor({username,commentid,commentsid,setSubCommentsListInfo,setVisible}:any) {
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
				 setSubCommentsListInfo((CommentsListInfo:any) => {
					return{
						hasMore:CommentsListInfo.hasMore,
						CommentsList:[result.FComment,...CommentsListInfo.CommentsList]
					}
				})
				message.success('评论成功')
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
			<TextArea showCount value={text} maxLength={100} placeholder={`回复给${username || '匿名用户'}:`} onChange={changeComment}/>
			<Button htmlType="submit" type="primary" onClick={sendSubComment}>
				回复
			</Button>
			<Switch defaultChecked={true} checkedChildren='公开' unCheckedChildren='私人' onChange={changeAnonymous}/>
		</div>
	)
}
