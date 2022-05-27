import React, {useEffect, useState} from "react";
import {useNavigate,useSearchParams} from "react-router-dom";
import {Layout, message} from "antd";
import UpdateDrawer from "../Drawer/UpdateDrawer";
import BraftEditor from "braft-editor";
import EditorHeader from "../Header/EditorHeader";
import ArticleEditor from "../editor/ArticleEditor";
import UserDataRequest from "@utils/RequestUtils/Data/UserDataRequest";
const {Content} = Layout


export default function UpdateCommon() {

	const navigator = useNavigate()
	const [search,] = useSearchParams()
	const [ArticleInfo,setArticleInfo] = useState<UpdateArticleInfo>({articleid:'',title:'',ispublic:true,sortname:'',tags:[],description:'',content:''})

	useEffect(() => {
		let articleid = search.get('articleid')
		if (articleid){
			// do get articleinfo
			message.loading({content:'获取文章信息',key:'loading'})

			UserDataRequest.getUserArticleInfo(articleid).then(result => {

				if (result.Ok && result?.ArticleInfo?.type === 'common'){
					message.success({content:'获取完成',key:'loading'})
					setArticleInfo(result.ArticleInfo)
					setTitle(result.ArticleInfo.title)
					setEditorState(BraftEditor.createEditorState(result.ArticleInfo.content))
					setLoading(false)
				}else{
					message.warn({content:'获取文章信息失败',key:'loading'})
					navigator('/user/home')
				}
			})

		}else{
			message.warn("文章信息不全")
			navigator('/')
		}
	},[])

	const [loading,setLoading] = useState(true)
	const [visible,setVisible] = useState(false)

	const [title,setTitle] = useState('')

	const [editorState,setEditorState] = useState(BraftEditor.createEditorState(''))

	let openDrawer = () =>{
		setVisible(true)
	}
	let closeDrawer = () => {
		setVisible(false)
	}
	let handleTitleChange = ({target}:any) => {
		setTitle(target.value)
	}
	return (
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
						<UpdateDrawer
							visible={visible}
							onClose={closeDrawer}
							title={title}
							editorState={editorState}
							loading={loading}
							ArticleInfo={ArticleInfo}
							articleid={search.get('articleid')}
						/>
						<ArticleEditor editorState={editorState} setEditorState={setEditorState}/>
					</div>
				</Content>
			</Layout>
		</div>
	);
}
