import React from "react";
import {Button, Dropdown, Menu} from "antd";
import {DeleteOutlined, MoreOutlined} from "@ant-design/icons";

const menu = (DraftId:string,deleteDraft:any) => {

	return (
		<Menu onClick={deleteDraft(DraftId)}>
			<Menu.Item key='delete'>
				<DeleteOutlined />
				删除
			</Menu.Item>
		</Menu>
	)
}
export default function DraftDropMenu({DraftId,deleteDraft}:any) {

	return (
		<Dropdown key="more" overlay={menu(DraftId,deleteDraft)} placement="bottom" trigger={['click']} overlayClassName='drafts-dropdown' arrow>
			<Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
		</Dropdown>
	);
}
