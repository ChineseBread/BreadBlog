import React from "react";
import {PageHeader, Button, Menu, Progress,} from 'antd';
import {useNavigate} from "react-router-dom";
import CustomStorage from "../../../../../utils/StorageUtils/CustomStorage";
import UserLevel from "../../../utilsComponents/User/UserLevel";

function UserInfoArea({changeCategory}){
	const navigator = useNavigate()

	return(
		<div className='user-header-container'>
			<div className='article-list-item user-header' id='user-header'>
				<PageHeader
					title={<UserLevel user={CustomStorage.getAccount().User}/>}
					className="site-page-header"
					ghost={false}
					extra={[
						<Button key="edit-user-info" onClick={() => navigator('/user/profile')}>编辑用户资料</Button>,
					]}
					avatar={{ src: CustomStorage.getAvatarUrl() }}
				/>
				<Menu theme="light" mode="horizontal" defaultSelectedKeys={'article'}>
					<Menu.Item key="all"  onClick={changeCategory('all')}>所有文章</Menu.Item>
					<Menu.Item key="private" onClick={changeCategory('private')}>私人文章</Menu.Item>
				</Menu>
			</div>
		</div>
	)
}
export default React.memo(UserInfoArea,() => true)
