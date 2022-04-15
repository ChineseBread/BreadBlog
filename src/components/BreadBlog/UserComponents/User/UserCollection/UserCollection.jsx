import {Button, Card} from "antd";
import {SettingOutlined, StarOutlined} from "@ant-design/icons";
import React from "react";
import {Outlet, useNavigate} from "react-router-dom";

export default function UserCollection(props) {
	const navigator = useNavigate()
	return (
 		<div className='user-collections-container'>
			<Card title='我的收藏' extra={[
				<Button key='1' icon={<StarOutlined />} type='ghost' onClick={() => navigator('/user/collections/show')}>收藏夹</Button>,
				<Button key='2' icon={<SettingOutlined />} type='ghost' onClick={() => navigator('/user/collections/manage')}>收藏夹管理</Button>]}>
				<Outlet/>
			</Card>
		</div>
	);
}
