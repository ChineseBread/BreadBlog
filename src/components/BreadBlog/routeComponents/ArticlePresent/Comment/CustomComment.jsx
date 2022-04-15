import {Avatar, Button, message, Switch} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, {useState} from "react";
import CustomStorage from "../../../../../utils/StorageUtils/CustomStorage";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";


export default function CustomComment({articleid,setCommentList}){
	const [isOpen,setAnonymous] = useState(true);
	const [comment,setComment] = useState("")
	let sendComment = async () =>{
		if (!comment){
			message.warn("请输入评论")
			return
		}
		let result = await UserOperationRequest.sendComment(comment,articleid,isOpen)
		if (result?.Ok){
			setCommentList(CommentsList => [{isanonymous:false,userid:CustomStorage.getAccount().UserID,createdtime:Date.now() / 1000,comment},...CommentsList])
			setComment('')
			message.success('评论成功')
		}else{
			message.warn(result.Msg)
		}

	}
	let handleCommentChange = ({target}) => {
		setComment(target.value)
	}
	let onChange = (checked) => {
		setAnonymous(checked)
	}
	return(
		<div className='custom-comment-form' id='custom_comment'>
			<div className='comment-title'>
				<div>评论</div>
				<div className='custom-comment-action'>
					<span><Button onClick={sendComment}>发送评论</Button></span>
					<span><Switch checkedChildren="公开" unCheckedChildren="匿名" defaultChecked onChange={onChange}/></span>
				</div>
			</div>
			<div className='comment-input'>
				<Avatar size={65} src='https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae361584a42c48df9e9930f36319cadd~tplv-k3u1fbpfcp-no-mark:200:200:200:200.awebp?' />
				<TextArea showCount maxLength={100} placeholder='留下你的足迹...' value={comment} onChange={handleCommentChange}/>
			</div>
		</div>
	)
}