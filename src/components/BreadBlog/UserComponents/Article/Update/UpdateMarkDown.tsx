import React, {useEffect, useState} from "react";
import {useNavigate,useSearchParams} from "react-router-dom";
import {Layout, message} from "antd";
import UpdateDrawer from "../Drawer/UpdateDrawer";
import EditorHeader from "../Header/EditorHeader";
import MarkDownEditor from "../Editor/MarkDownEditor";
import UserDataRequest from "@utils/RequestUtils/Data/UserDataRequest";
const {Content} = Layout


export default function UpdateMarkDown() {

	const navigator = useNavigate()
	const [search,] = useSearchParams()
	const [ArticleInfo,setArticleInfo] = useState<UpdateArticleInfo>({articleid:'',title:'',ispublic:true,sortname:'',tags:[],description:'',content:''})

	const [visible,setVisible] = useState(false)
	const [loading,setLoading] = useState(true)

	const [title,setTitle] = useState('')
	const [text,setText] = useState('')

	useEffect(() => {
		let articleid = search.get('articleid')
		if (articleid){
			// do get articleinfo
			message.loading({content:'获取文章信息',key:'loading'})

			UserDataRequest.getUserArticleInfo(articleid).then(result => {

				if (result.Ok && result?.ArticleInfo?.type === 'markdown'){
					message.success({content:'获取完成',key:'loading'})
					setArticleInfo(result.ArticleInfo)
					setTitle(result.ArticleInfo.title)
					setText(result.ArticleInfo.content)
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
					// pathname={'/article/Edit/common'}
					// toolTip='写普通文章'
					isEdit={false}
				/>
				<Content>
					<div className="editor-site-layout-content" >
						<UpdateDrawer
							visible={visible}
							onClose={closeDrawer}
							ArticleInfo={ArticleInfo}
							title={title}
							markdown={text}
							loading={loading}
							articleid={search.get('articleid')}
						/>
						<MarkDownEditor text={text} setText={setText}/>
					</div>
				</Content>
			</Layout>
		</div>
	);
}
