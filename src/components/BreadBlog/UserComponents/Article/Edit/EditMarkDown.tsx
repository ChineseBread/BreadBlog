import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import MarkDownEditor from "../Editor/MarkDownEditor";
import EditorHeader from "../Header/EditorHeader";
import ArticleDrawer from "../Drawer/ArticleDrawer";
import ArticleDraftStorage from "@utils/StorageUtils/ArticleDraftStorage";
const {Content} = Layout

export default function EditMarkDown(){

	const [visible,setVisible] = useState(false)
	const [title,setTitle] = useState('')

	const [text,setText] = useState('## 写点东西呗')

	useEffect(() => {
		//创建草稿箱
		ArticleDraftStorage.createArticleDraft(title,text,'markdown')
	},[])
	useEffect(() => {
		ArticleDraftStorage.updateArticleDraft(title,text,'markdown')
	},[title,text])
	const openDrawer = () =>{
		setVisible(true)
	}
	const closeDrawer = () => {
		setVisible(false)
	}
	const handleTitleChange = ({target}:any) => {
		setTitle(target.value)
	}
	return(
		<div className='Editor_Container'>
			<Layout>
				<EditorHeader
					handleTitleChange={handleTitleChange}
					openDrawer={openDrawer}
					visible={visible}
					title={title}
					pathname={'/article/Edit/common'}
					toolTip='写普通文章'
					isEdit={true}
				/>
				<Content>
					<div className="editor-site-layout-content" id='article-drawer'>
						<ArticleDrawer
							visible={visible}
							onClose={closeDrawer}
							title={title}
							markdown={text}
							isMarkdown={true}
						/>
						<MarkDownEditor text={text} setText={setText}/>
					</div>
				</Content>
			</Layout>
		</div>

	)
}
