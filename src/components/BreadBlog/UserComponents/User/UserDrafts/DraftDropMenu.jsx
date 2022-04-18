import React from "react";
import {Button, Dropdown, Menu} from "antd";
import {DeleteOutlined, MoreOutlined} from "@ant-design/icons";

const menu = (DraftId,deleteDraft) => {

	return (
		<Menu onClick={deleteDraft(DraftId)}>
			<Menu.Item key='delete'>
				<DeleteOutlined />
				删除
			</Menu.Item>
		</Menu>
	)
}
export default function DraftDropMenu({DraftId,deleteDraft}) {

	return (
		<Dropdown key="more" overlay={menu(DraftId,deleteDraft)} placement="bottom" trigger={['click']} overlayClassName='drafts-dropdown' arrow>
			<Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
		</Dropdown>
	);
}
