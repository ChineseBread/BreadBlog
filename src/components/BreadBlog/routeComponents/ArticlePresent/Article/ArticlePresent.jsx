import React, {Fragment, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Card, Divider,Skeleton} from "antd";
import TimeShow from "../../../utilsComponents/TimeShow";
import ArticlePresentHeader from "./ArticlePresentHeader";
import ArticleActionNav from "./ArticleActionNav";
import ArticleContent from "./ArticleContent";
import MarkDownContent from "./MarkDownContent";
import CommentsList from "../Comment/CommentsList";
import PublicDataRequest from "../../../../../utils/RequestUtils/PublicDataRequest";
import NotFoundPage from "../../../utilsComponents/NotFoundPage";
export default function ArticlePresent(props) {

	// const navigator = useNavigate()
	const [search,setSearch] = useSearchParams()
	const [ArticleInfo,setArticleInfo] = useState({title:'',authorname:'',sortname:'',tags:[],content:'',createdtime:'',type:''})
	const [loading,setLoading] = useState(true)
	const [isError,setError] = useState({status:false,errText:''})
	useEffect(()=>{
		let articleid = search.get('articleid')
		if (!articleid) {
			// message.warn('文章ID为空!')
			setError({status: true,errText: '文章ID为空'})
			// navigator('/')
		}else {
			PublicDataRequest.getArticleInfo(articleid).then(result => {
				if (result?.Ok){
					setArticleInfo(result.ArticleInfo)
					setLoading(false)
				}else {
					// message.warn(result.Msg)
					setError({status: true,errText:result.Msg})
					// navigator('/')
				}
			})
		}
	},[])

	return (
		<Fragment>
			{!isError.status ? <div className='article-present-container'>
				<div className='article-action-nav'>
					<ArticleActionNav ArticleInfo={ArticleInfo} articleid={search.get('articleid')}/>
				</div>
				<div className='article-present-major-container'>
					<Skeleton active loading={loading}>
						<Card title={ArticleInfo.title}>
							<div className='article-show-container'>
								<div className='article-author-header'>
									<ArticlePresentHeader ArticleInfo={ArticleInfo}/>
								</div>
								<Divider/>
								<div id='pdf_viewer'>
									{ArticleInfo.type === 'markdown' ?
										<MarkDownContent content={ArticleInfo.content}/> :
										<ArticleContent content={ArticleInfo.content}/>
									}
								</div>
							</div>
						</Card>
					</Skeleton>
					<Card>
						<div className='article-comment-container'>
							<CommentsList articleid={search.get("articleid")}/>
						</div>
					</Card>
				</div>
				<div className='article-minor-container'>
					<TimeShow/>
				</div>
			</div> : <NotFoundPage errText={isError.errText}/>}
		</Fragment>
	);
}
