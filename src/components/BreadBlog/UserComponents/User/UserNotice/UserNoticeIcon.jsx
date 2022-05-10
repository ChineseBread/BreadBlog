import React, {useEffect, useState} from "react";
import {CommentOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {Badge, message} from "antd";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";

export default function UserNoticeIcon(props) {
	const navigator = useNavigate()
	const [count,setCount] = useState(0)
	useEffect(() => {
		UserOperationRequest.checkNotice().then(result => {
			if (result?.Ok){
				setCount(count)
			}
		})
	},[])
	const handleNotice = () => {
		navigator('/user/notice/info')
	}
	return (
		<Badge count={count} overflowCount={99} size='small'>
			<CommentOutlined onClick={handleNotice} />
		</Badge>
	);
}
