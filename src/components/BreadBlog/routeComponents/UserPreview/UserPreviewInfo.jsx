import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Avatar, Menu} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import UserLevel from "../../utilsComponents/User/UserLevel";
import UserPreviewContext from "./UserPreviewContext";

function UserPreviewInfo(){
	const navigator = useNavigate()
	const {userid,username} = useContext(UserPreviewContext)
	const handleChange = key => {
		return () => {
			navigator(`/preview/${userid}/${key}`)
		}
	}
	return(
		<div className='user-header-container'>
			<div className='user-avatar-container'>
				<div className='user-background'>
					<img src={`/data/background/${userid}`}/>
				</div>
				<Avatar size={100} src={`/data/logo/${userid}`}/>
			</div>
			<div className='user-info-container preview-user-info'>
				<UserLevel user={username}/>
				<Button type='text' icon={<PlusOutlined/>} key="edit-user-info">关注</Button>
			</div>
			<Menu theme="light" mode="horizontal" defaultSelectedKeys={['all']}>
				<Menu.Item key="article" onClick={handleChange('')}>文章</Menu.Item>
				<Menu.Item key="dynamic" onClick={handleChange('dynamic')}>动态</Menu.Item>
				<Menu.Item key="subscribe" onClick={handleChange('subscribe')}>关注</Menu.Item>
			</Menu>
		</div>
	)
}

export default React.memo(UserPreviewInfo,() => true)
