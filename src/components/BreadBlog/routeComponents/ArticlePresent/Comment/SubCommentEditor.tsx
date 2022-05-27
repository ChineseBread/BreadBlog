import React, {useContext, useState} from "react";
import {Button, message, Switch,Input} from "antd";
import {CommentContext} from "./CommentContext";
import ArticlePreviewRequest from "@utils/RequestUtils/Operation/ArticlePreviewRequest";
const {TextArea} = Input
/**
 * @description 追评间互相回复
 * @param username
 * @param fcommentid
 * @param setVisible
 */
export default function SubCommentEditor({username,fcommentid,setVisible}:any) {
	const {commentid,commentsid,setSubCommentsListInfo} = useContext(CommentContext);
	const [text,setText] = useState('')
	const [isAnonymous,setAnonymous] = useState(false)
	const changeAnonymous = () => {
		setAnonymous(isAnonymous =>　!isAnonymous)
	}
	const changeComment = ({target}:any) => {
		setText(target.value)
	}
	const sendReply = () => {
		if (!text){
			message.warn('请输入评论')
			return
		}
		ArticlePreviewRequest.sendSubCommentReply(commentsid,commentid,isAnonymous,text,fcommentid).then(result => {
			if (result.Ok){
				setSubCommentsListInfo((CommentsInfo:SubCommentsListInfo) => {
					return{
						hasMore:CommentsInfo.hasMore,
						CommentsList:[result.FComment,...CommentsInfo.CommentsList],
					}
				})
				message.success('回复成功')
			}else{
				message.warn(result.Msg)
			}
			setAnonymous(false)
			setText('')
			setVisible(false)
		})
	}
	return (
		<div className='comment-editor'>
			<TextArea value={text} showCount maxLength={100} placeholder={`回复给${username || '匿名用户'}:`} onChange={changeComment}/>
			<Button htmlType="submit" type="primary" onClick={sendReply}>
				回复
			</Button>
			<Switch defaultChecked={true} checkedChildren='公开' unCheckedChildren='私人' onChange={changeAnonymous}/>
		</div>
	)
}