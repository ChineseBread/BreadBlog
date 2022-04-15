import React from "react";
import {PageHeader, Button, Menu,} from 'antd';
import {useNavigate} from "react-router-dom";
import CustomStorage from "../../../../../utils/StorageUtils/CustomStorage";

function UserInfoArea({changeCategory}){
	const navigator = useNavigate()

	return(
		<div className='user-header-container'>
			<div className='article-list-item user-header' id='user-header'>
				<PageHeader
					title={CustomStorage.getAccount().User}
					className="site-page-header"
					// subTitle="This is a subtitle"
					ghost={false}
					// tags={<Tag color="blue">Running</Tag>}
					extra={[
						<Button key="edit-user-info" onClick={() => navigator('/user/profile')}>编辑用户资料</Button>,
					]}
					avatar={{ src: CustomStorage.getAvatarUrl() }}
				/>
				<Menu theme="light" mode="horizontal" defaultSelectedKeys={'article'}>
					<Menu.Item key="all"  onClick={changeCategory('all')}>所有文章</Menu.Item>
					<Menu.Item key="private" onClick={changeCategory('private')}>私人文章</Menu.Item>
					{/*{ArticleCategory.filter(ele => ele && ele.trim()).map(category => <Menu.Item key={category}>{category}</Menu.Item>)}*/}
					{/*{ArticleCategory.map(category => <Menu.Item key={category}>{category}</Menu.Item>)}*/}
				</Menu>
			</div>
		</div>
	)
}
export default React.memo(UserInfoArea,() => true)
