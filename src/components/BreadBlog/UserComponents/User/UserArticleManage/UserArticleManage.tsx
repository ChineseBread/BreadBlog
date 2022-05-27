import React from "react";
import {Button, Card} from "antd";
import {useNavigate} from "react-router-dom";
import UserCategory from "./UserCategory";
import UserTrash from "./UserTrash";

/**
 *@description 用户文章管理 负责管理垃圾箱和用户分类
 */
export default function UserArticleManage() {
	const navigator = useNavigate()
	return (
		<div className='user-manage-container'>
			<Card title='文章管理' extra={<Button onClick={() => navigator('/user/home')}>我的主页</Button>}>
				<div className='user-manage-item-container clear-scroll' id='user-trash-list'>
					<UserTrash/>
				</div>
				<div className='user-manage-item-container clear-scroll'>
					<UserCategory/>
				</div>
			</Card>
		</div>
	);
}
