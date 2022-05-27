import React, {useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Avatar, Menu} from 'antd';
import UserPreviewContext from "./UserPreviewContext";
import UserLevel from "@utilsComponents/User/UserLevel";
import SubscribeBtn from "@utilsComponents/User/SubscribeBtn";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";
import getDefaultValue from "@utils/PresentUtils/getDefaultUrlValue";

function UserPreviewInfo(){
	const navigator = useNavigate()
	const location = useLocation()
	const {userid,name,level} = useContext(UserPreviewContext)
	const handleChange = (key:string) => {
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
				<UserLevel user={name} level={level}/>
				<SubscribeBtn userid={userid} type='text'/>
			</div>
			{/*@ts-ignore*/}
			<Menu theme="light" mode="horizontal" defaultSelectedKeys={getDefaultValue(location.pathname,/dynamic|subscribe/,'article')}>
				<Menu.Item key="article" onClick={handleChange('')}>文章</Menu.Item>
				<Menu.Item key="dynamic" onClick={handleChange('dynamic')}>动态</Menu.Item>
				<Menu.Item key="subscribe" onClick={handleChange('subscribe')}>关注</Menu.Item>
			</Menu>
		</div>
	)
}

export default React.memo(UserPreviewInfo,() => true)
