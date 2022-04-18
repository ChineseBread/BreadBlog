import {useLocation, useNavigate,useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Layout, message} from "antd";
import ArticleDrawer from "../Drawer/ArticleDrawer";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";
import MarkDownEditor from "../editor/MarkDownEditor";
import EditorHeader from "../Header/EditorHeader";
import ArticleDraftStorage from "../../../../../utils/StorageUtils/ArticleDraftStorage";

const {Content} = Layout
export default function DraftsMarkDown(props) {
	const {draftid} = useParams()

	const navigator = useNavigate()
	const location = useLocation()
	const [visible,setVisible] = useState(false)
	const [title,setTitle] = useState('')

	const [text,setText] = useState('')

	useEffect(() => {
		if (!draftid || !location?.state?.Versions){
			message.warn('未找到草稿信息')
			navigator('/user/drafts')
		}else{
			let {Versions:{title,content}} = location.state
			setTitle(title)
			setText(content)
			ArticleDraftStorage.saveArticleDraftID(draftid)
		}
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
	const handleTitleChange = ({target}) => {
		setTitle(target.value)
	}
	return(
		<div className='Editor_Container'>
			<Layout>
				<EditorHeader
					handleTitleChange={handleTitleChange}
					openDrawer={openDrawer}
					// visible={visible}
					title={title}
					// pathname={'/article/edit/common'}
					// toolTip='写普通文章'
					isEdit={false}
				/>
				<Content>
					<div className="editor-site-layout-content" >
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
