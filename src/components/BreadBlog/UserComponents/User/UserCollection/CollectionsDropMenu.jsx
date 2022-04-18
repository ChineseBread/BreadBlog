import React from "react";
import {Button, Dropdown, Menu} from "antd";
import {MoreOutlined} from "@ant-design/icons";

const useMenu = (articleid,favname,unsubscribeArticle) => {

	return (
		<Menu onClick={unsubscribeArticle(articleid,favname)} className='CollectionsDropMenu'>
			<Menu.Item key='unsubcribe'>
				取消收藏
			</Menu.Item>
		</Menu>
	);
}

export default function CollectionsDropMenu({articleid,favname,unsubscribeArticle}){
	return(
		<Dropdown  key="more" overlay={useMenu(articleid,favname,unsubscribeArticle)} placement="bottomRight" overlayClassName='article-dropdown' arrow>
			<Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
		</Dropdown>
	)
}