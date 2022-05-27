import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Badge} from "antd";
import {CommentOutlined} from "@ant-design/icons";
import UserOperationRequest from "@utils/RequestUtils/Operation/UserOperationRequest";

export default function UserNoticeIcon() {
	const navigator = useNavigate()
	const [count,setCount] = useState(0)
	useEffect(() => {
		UserOperationRequest.checkNotice().then(result => {
			if (result.Ok){
				setCount(result.count)
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
