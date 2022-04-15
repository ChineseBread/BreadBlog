import React, {useEffect, useState} from "react";
import {useNavigate,useSearchParams} from "react-router-dom";
import {Layout, message} from "antd";
import UpdateDrawer from "../Drawer/UpdateDrawer";
import PublicDataRequest from "../../../../../utils/RequestUtils/PublicDataRequest";
import EditorHeader from "../Header/EditorHeader";
import MarkDownEditor from "../editor/MarkDownEditor";
const {Content} = Layout


export default function UpdateMarkDown(props) {

	const navigator = useNavigate()
	const [search,setSearch] = useSearchParams()
	const [ArticleInfo,setArticleInfo] = useState({title:'',authorid:'',authorname:'',type:'',ispublic:true,hassort:true,sortname:'',tags:[],description:'',content:''})

	useEffect(() => {
		let articleid = search.get('articleid')
		if (articleid){
			// do get articleinfo
			message.loading({content:'获取文章信息',key:'loading'})

			PublicDataRequest.getArticleInfo(articleid).then(result => {

				if (result?.Ok && result.ArticleInfo.type === 'markdown'){
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

	const [visible,setVisible] = useState(false)
	const [loading,setLoading] = useState(true)

	const [title,setTitle] = useState('')
	const [text,setText] = useState('')

	let openDrawer = () =>{
		setVisible(true)
	}
	let closeDrawer = () => {
		setVisible(false)
	}
	let handleTitleChange = ({target}) => {
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
