import {Button, Dropdown, Menu} from "antd";
import {DeleteOutlined, EditOutlined, MoreOutlined} from "@ant-design/icons";
import React from "react";
import {useNavigate} from "react-router-dom";

const useMenu = (articleid,type) => {
	const navigator = useNavigate()
	let onClick = ({key}) => {
		switch (key){
			case "edit":
				navigator(`/article/update/${type === 'markdown' ? 'md' : 'common'}?articleid=${articleid}`)
				// navigator(`/update`)
				break;
			case "delete":
				break;
			default:
				// do nothing
		}
	}
	return (
		<Menu onClick={onClick}>
			<Menu.Item key='edit'>
				<EditOutlined/>
				编辑
			</Menu.Item>
			<Menu.Item key='delete'>
				<DeleteOutlined />
				删除
			</Menu.Item>
		</Menu>
	);
}

export default function ArticleDropMenu({articleid,type}){
	return(
		<Dropdown key="more" overlay={useMenu(articleid,type)} placement="bottomRight" overlayClassName='article-dropdown' arrow>
			<Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
		</Dropdown>
	)
}
