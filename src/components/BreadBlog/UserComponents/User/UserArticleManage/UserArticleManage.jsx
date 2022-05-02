import {Button, Card} from "antd";
import React from "react";
import UserCateGory from "./UserCateGory";
import UserTrash from "./UserTrash";
import {useNavigate} from "react-router-dom";

/**
 *@description 用户文章管理 负责管理垃圾箱和用户分类
 */
export default function UserArticleManage(props) {
	const navigator = useNavigate()
	return (
		<div className='user-manage-container'>
			<Card title='文章管理' extra={<Button onClick={() => navigator('/user/home')}>我的主页</Button>}>
				<div className='user-manage-item-container clear-scroll' id='user-trash-list'>
					<UserTrash/>
				</div>
				<div className='user-manage-item-container clear-scroll'>
					<UserCateGory/>
				</div>
			</Card>
		</div>
	);
}
