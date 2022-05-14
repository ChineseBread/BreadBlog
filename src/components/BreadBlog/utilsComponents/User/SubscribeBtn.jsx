import {useEffect, useState} from "react";
import {Button, message} from "antd";
import {CheckOutlined, PlusOutlined} from "@ant-design/icons";
import UserOperationRequest from "../../../../utils/RequestUtils/UserOperationRequest";
/**
 * @description 用户点赞关注按钮
 * @param userid 用户id
 */
export default function SubscribeBtn({userid,type}) {
	const [like,setLike] = useState(false)
	useEffect(() => {
		UserOperationRequest.checkFollow(userid).then(result => {
			setLike(result.Msg === '已关注该用户')
		})
	},[])
	const subscribeUser = () => {
	  UserOperationRequest[like ? 'unFollowUser' : 'followUser'](userid).then(result => {
		  if (result.Ok){
			  setLike(like => !like)
			  message.success(result.Msg)
		  }else {
			  message.warn(result.Msg)
		  }
	  })
	}
	return (
		<Button type={type} onClick={subscribeUser} icon={like ? <CheckOutlined /> : <PlusOutlined/>}>{like ? '已关注' : '关注'}</Button>
	);
}
