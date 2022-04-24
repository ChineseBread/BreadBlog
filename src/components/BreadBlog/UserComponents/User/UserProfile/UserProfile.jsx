import React from "react";
import {Card, Divider, Input, Form, Button} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import CustomStorage from "../../../../../utils/StorageUtils/CustomStorage";
import UploadAvatar from "./UploadAvatar";

const {User,pwd,Token} = CustomStorage.getAccount()

export default function UserProfile(props) {
	const navigator = useNavigate()
	let onFinish = data => {
		console.log(data)
	}

	return (
		<div className='user-profile-container'>
			<div className='user-profile-header'>
				<div className='user-profile-header-content' onClick={() => navigator('/user/home')}>
					<LeftOutlined/>
					<span>点击返回个人主页</span>
				</div>
			</div>
			<div className='user-profile-content-container'>
				<Card title="个人资料">
					<div className='user-info-container'>
						<Form
							name="basic"
							onFinish={onFinish}
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 20 }}
							initialValues={{oldname:User,oldpwd:pwd}}
						>
							<Divider/>
							<Form.Item
								label="旧用户名"
								name="oldname"
								rules={[{ required: true, message: '请输入新的用户名!' }]}
							>
								<Input placeholder='请输入新的姓名' disabled/>
							</Form.Item>
							<Divider/>
							<Form.Item
								label="用户名"
								name="name"
								rules={[{ required: true, message: '请输入新的用户名!' },({getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('name') !== User) {
											return Promise.resolve();
										}
										return Promise.reject(new Error('请勿输入相同的用户名!'));
									},
								})]}
							>
								<Input placeholder='请输入新的姓名'/>
							</Form.Item>
							<Divider/>
							<Form.Item
								label="旧密码"
								name="oldpwd"
								rules={[{ required: true, message: '请输入密码!' }]}
							>
								<Input placeholder='请输入新的密码'  disabled />
							</Form.Item>

							<Divider/>
							<Form.Item
								label="新密码"
								name="newpwd"
								rules={[{ required: true, message: '请输入密码!' },({getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('newpwd') !== pwd) {
											return Promise.resolve();
										}
										return Promise.reject(new Error('请勿输入相同密码!'));
									},
								})]}
							>
								<Input.Password placeholder='请输入新的密码' type='password'/>
							</Form.Item>
							<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
								<Button type="ghost" htmlType="submit">
									更新信息
								</Button>
							</Form.Item>
						</Form>

					</div>
					<div className='user-avatar-settings'>
						<UploadAvatar token={Token}/>
					</div>
				</Card>
			</div>

		</div>
	);
}
