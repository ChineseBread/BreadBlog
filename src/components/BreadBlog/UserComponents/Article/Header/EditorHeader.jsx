import {LeftOutlined, SwapOutlined} from "@ant-design/icons";
import {Avatar, Button, Dropdown, Input, Tooltip} from "antd";
import useAvatarDropMenu from "../../../utilsComponents/Present/AvatarDropMenu";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Header} from "antd/es/layout/layout";

export default function EditorHeader({handleTitleChange,openDrawer,visible,title,pathname,toolTip,isEdit}) {
	const navigator = useNavigate()
	return (
		<Header>
			<div>
				<LeftOutlined onClick={() => navigator(-1)}/>
				<Input placeholder='请输入文章的标题' value={title} maxLength={20} onChange={handleTitleChange}/>
			</div>
			<div className='user_editor_operation' style={{width:'320px'}}>
				<Button onClick={() => navigator('/user/drafts')}>草稿箱</Button>
				<Button type='primary' onClick={openDrawer}>发布设置</Button>
				{isEdit && <Tooltip placement="bottom" title={toolTip}>
					<SwapOutlined onClick={() => !visible && navigator(pathname)}/>
				</Tooltip>}
				<Dropdown overlay={useAvatarDropMenu()} placement="bottomLeft" trigger={['click']} arrow>
					<Avatar size={40} src='https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae361584a42c48df9e9930f36319cadd~tplv-k3u1fbpfcp-no-mark:200:200:200:200.awebp?' />
				</Dropdown>
			</div>
		</Header>
	);
}