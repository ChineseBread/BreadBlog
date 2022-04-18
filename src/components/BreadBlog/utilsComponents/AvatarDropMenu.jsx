import React, {Fragment, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Menu, Modal} from "antd";
import {
	EditOutlined,
	FileTextOutlined,
	HomeOutlined, LogoutOutlined, SettingOutlined,
	StarOutlined,
	UserAddOutlined,
	UserOutlined
} from "@ant-design/icons";
import CustomStorage from "../../../utils/StorageUtils/CustomStorage";

export default function AvatarDropMenu() {

	const navigator = useNavigate()
	const [visible,setVisible] = useState(false)
	const location = useLocation()
	let handleExit = () => {
		CustomStorage.removeAccount()
		setVisible(false)
		if (location.pathname.startsWith('/user') || location.pathname.startsWith('/article')) navigator('/')

	}
	return(
		<Fragment>
			<Modal
				title="注销"
				visible={visible}
				onOk={handleExit}
				onCancel={() => setVisible(false)}
				okText="确认"
				cancelText="取消"
				mask={false}
				forceRender={false}
			>
				<p>确认要注销当前账户吗</p>
				<p>注销后将会返回首页且当前用户操作不会保存</p>
			</Modal>
			<Menu>
				<Menu.Item key="toMd" onClick={() => navigator('/article/edit/md')}>
					<EditOutlined />
					<span>写文章</span>
				</Menu.Item>
				<Menu.Item key="drafts" onClick={() => navigator('/user/drafts')}>
					<FileTextOutlined />
					<span >草稿箱</span>
				</Menu.Item>

				<Menu.Item key='userHomePage' onClick={() => navigator('/user/home')}>
					<UserOutlined />
					<span>我的主页</span>
				</Menu.Item>
				<Menu.Item key="subscribe" onClick={() => navigator('/user/collections/show')}>
					<StarOutlined />
					<span >我的收藏</span>
				</Menu.Item>
				{/*<Menu.Item key='tags' onClick={() => navigator('/user/tags')}>*/}
				{/*	<TagsOutlined />*/}
				{/*	<span >标签管理</span>*/}
				{/*</Menu.Item>*/}

				<Menu.Item key='toHome' onClick={() => navigator('/')}>
					<HomeOutlined />
					<span >回到首页</span>
				</Menu.Item>
				<Menu.Item key='settings' onClick={() => navigator('/user/profile')}>
					<SettingOutlined />
					<span >用户设置</span>
				</Menu.Item>
				{
					CustomStorage.getAccount().Token ?
						<Menu.Item key='logout' onClick={() => setVisible(true)}>
							<LogoutOutlined />
							<span >退出</span>
						</Menu.Item>:
						<Menu.Item key='login' onClick={() => navigator('/account')}>
							<UserAddOutlined />
							<span >登录</span>
						</Menu.Item>
				}
			</Menu>
		</Fragment>
	)

}