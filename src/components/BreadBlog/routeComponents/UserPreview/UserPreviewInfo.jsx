import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Menu} from 'antd';
import UserLevel from "../../utilsComponents/User/UserLevel";
import UserPreviewContext from "./UserPreviewContext";
import SubscribeBtn from "../../utilsComponents/User/SubscribeBtn";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";

function UserPreviewInfo(){
	const navigator = useNavigate()
	const {userid,username,level} = useContext(UserPreviewContext)
	const handleChange = key => {
		return () => {
			navigator(`/preview/${userid}/${key}`)
		}
	}
	return(
		<div className='user-header-container'>
			<div className='user-avatar-container'>
				<div className='user-background'>
					<img src={PublicDataRequest.getUserBackgroundUrl(userid)}/>
				</div>
				<Avatar size={100} src={PublicDataRequest.getUserAvatarUrl(userid)}/>
			</div>
			<div className='user-info-container preview-user-info'>
				<UserLevel user={username} level={level}/>
				<SubscribeBtn userid={userid} type='text'/>
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
