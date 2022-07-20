import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Dropdown, Menu} from "antd";
import {DeleteOutlined, EditOutlined, EllipsisOutlined} from "@ant-design/icons";

const useMenu = (articleid,type,deleteArticle) => {
	const navigator = useNavigate()
	const onClick = ({key}) => {
		switch (key){
			case "edit":
				navigator(`/article/update/${type === 'markdown' ? 'md' : 'common'}?articleid=${articleid}`)
				break;
			case "delete":
				deleteArticle(articleid)()
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

export default function ArticleDropMenu({articleid,type,deleteArticle}){
	return(
		<Dropdown key="more" overlay={useMenu(articleid,type,deleteArticle)} placement="top" overlayClassName='article-dropdown' trigger={['click']} arrow>
			<Button type="text" icon={<EllipsisOutlined />} />
		</Dropdown>
	)
}
