import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import ArticleDrawer from "../Drawer/ArticleDrawer";
import BraftEditor from "braft-editor";
import ArticleEditor from "../editor/ArticleEditor";
import EditorHeader from "../Header/EditorHeader";
import ArticleDraftStorage from "../../../../../utils/StorageUtils/ArticleDraftStorage";
const {Content} = Layout

export default function EditCommon(){

	const [visible,setVisible] = useState(false)
	const [title,setTitle] = useState('')

	const [editorState,setEditorState] = useState(BraftEditor.createEditorState('<p>写点东西呗...</p>'))

	useEffect(() => {
		ArticleDraftStorage.createArticleDraft(title,editorState.toHTML(),'common')
	},[])
	useEffect(() => {
		ArticleDraftStorage.updateArticleDraft(title,editorState.toHTML(),'common')
	},[title,editorState])

	const openDrawer = () =>{
		setVisible(true)
	}
	const closeDrawer = () => {
		setVisible(false)
	}
	const handleTitleChange = ({target}) => {
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
					pathname={'/article/edit/md'}
					toolTip='写MarkDown文章'
					isEdit={true}
				/>
				<Content>
					<div className="editor-site-layout-content" id='article-drawer'>
						<ArticleDrawer
							visible={visible}
							onClose={closeDrawer}
							title={title}
							// markdown={text}
							editorState={editorState}
							isMarkdown={false}
						/>
						<ArticleEditor editorState={editorState} setEditorState={setEditorState}/>
					</div>
				</Content>
			</Layout>
		</div>

	)
}
