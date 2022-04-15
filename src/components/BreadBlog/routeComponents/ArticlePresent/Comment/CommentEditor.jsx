import TextArea from "antd/es/input/TextArea";
import {Button, message, Switch} from "antd";
import React, {useMemo, useState} from "react";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";

/**
 * @description 子评论列表
 * @param commentid 评论id -> 单个评论
 * @param commentsid 评论组id
 */

export default function CommentEditor({username,commentid,commentsid,setCommentsListInfo}) {
	const [isAnonymous,setAnonymous] = useState(false)
	const [text,setText] = useState('')
	const changeAnonymous = () => {
		setAnonymous(isAnonymous => !isAnonymous)
	}
	const changeComment = ({target}) => {
		setText(target.value)
	}
	const sendSubComment = () => {
		UserOperationRequest.sendSubComment(text,commentsid,commentid,isAnonymous).then(result => {
			if (result.Ok){
				setCommentsListInfo(CommentsInfo => {
					return{
						hasMore:CommentsInfo.hasMore,
						CommentsList:[result.FComment,...CommentsInfo.CommentsList]
					}
				})
				message.success('评论成功')
			}else {
				message.warn(result.Msg)
			}
			setText('')
		})
	}
	return (
		useMemo(() => {
			return(
				<div className='comment-editor'>
					<TextArea showCount value={text} maxLength={100} placeholder={`回复给${username || '匿名用户'}:`} onChange={changeComment}/>
					<Button htmlType="submit" type="primary" onClick={sendSubComment}>
						回复
					</Button>
					<Switch defaultChecked={true} checkedChildren='公开' unCheckedChildren='私人' onChange={changeAnonymous}/>
				</div>
			)
		},[text])
	)
}