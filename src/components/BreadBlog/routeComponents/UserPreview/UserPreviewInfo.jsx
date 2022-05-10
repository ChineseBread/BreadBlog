import React from "react";
import {Button, Avatar} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import UserLevel from "../../utilsComponents/User/UserLevel";

function UserPreviewInfo({User:{userid,username}}){
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
		</div>
	)
}

export default React.memo(UserPreviewInfo,() => true)
