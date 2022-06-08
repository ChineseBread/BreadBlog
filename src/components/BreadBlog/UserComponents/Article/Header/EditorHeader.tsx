import React from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Button, Dropdown, Input, Tooltip} from "antd";
import {LeftOutlined, SwapOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import useAvatarDropMenu from "@utilsComponents/Present/AvatarDropMenu";
import CustomStorage from "@utils/StorageUtils/CustomStorage";

export default function EditorHeader({handleTitleChange,openDrawer,visible,title,pathname,toolTip,isEdit}:any) {
	const navigator = useNavigate()
	return (
		<Header className='box-shadow'>
			<div>
				<LeftOutlined onClick={() => navigator(-1)}/>
				<Input placeholder='请输入文章的标题' value={title} maxLength={20} onChange={handleTitleChange}/>
			</div>
			<div className='user_editor_operation'>
				<Button onClick={() => navigator('/user/drafts')}>草稿箱</Button>
				<Button type='primary' onClick={openDrawer}>发布设置</Button>
				{isEdit && <Tooltip placement="bottom" title={toolTip}>
					<SwapOutlined onClick={() => !visible && navigator(pathname)}/>
				</Tooltip>}
				<Dropdown overlay={useAvatarDropMenu()} placement="bottomLeft" trigger={['click']} arrow>
					<Avatar src={CustomStorage.getAvatarUrl()} />
				</Dropdown>
			</div>
		</Header>
	);
}