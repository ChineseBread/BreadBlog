import React from "react";
import { Card,Segmented } from "antd";
import {SettingOutlined, StarOutlined} from "@ant-design/icons";
import {Outlet, useNavigate} from "react-router-dom";

export default function UserCollection() {
	const navigator = useNavigate()
	const onChange = (value:any) => {
		navigator(`/user/collections/${value}`)
	}
	return (
 		<div className='user-collections-container'>
			<Card title='我的收藏' extra={[
				<Segmented
					key='choice'
					onChange={onChange}
					options={[
						{
							label: '收藏夹',
							value: 'show',
							icon: <StarOutlined />,
						},
						{
							label: '收藏夹管理',
							value: 'manage',
							icon: <SettingOutlined />,
						},
					]}
				/>
				// <Button key='1' icon={<StarOutlined />} type='ghost' onClick={() => navigator('/user/collections/show')}>收藏夹</Button>,
				// <Button key='2' icon={<SettingOutlined />} type='ghost' onClick={() => navigator('/user/collections/manage')}>收藏夹管理</Button>
			]}>
				<Outlet/>
			</Card>
		</div>
	);
}
