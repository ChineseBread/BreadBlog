import React, {Fragment, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Card, Divider,Skeleton} from "antd";
import ArticlePresentHeader from "./ArticlePresentHeader";
import ArticleActionNav from "./ArticleActionNav";
import ArticleContent from "./ArticleContent";
import {MarkDownContent,MarkDownCatalog} from "./MarkDownContent";
import CommentsList from "../Comment/CommentsList";
import TimeShow from "@utilsComponents/Present/TimeShow";
import ErrorPage from "@utilsComponents/Present/ErrorPage";
import ArticlePreviewDataRequest from "@utils/RequestUtils/Data/ArticlePreviewDataRequest";
export default function ArticlePresent() {

	const [search,] = useSearchParams()
	const [ArticleInfo,setArticleInfo] = useState<PreviewArticleInfo>({authorname:'',type:'',articleid: "", sortname: "", content:'',description:'',authorid:'',title:'',createdtime:0,commentsid:'',ispublic:true,tags:[]})
	const [loading,setLoading] = useState(true)
	const [isError,setError] = useState({status:false,errText:''})

	useEffect(()=>{
		let articleid = search.get('articleid')
		if (!articleid) {
			setError({status: true,errText: '文章ID为空'})
		}else {
			ArticlePreviewDataRequest.getArticleInfo(articleid).then(result => {
				if (result.Ok){
					result.ArticleInfo && setArticleInfo(result.ArticleInfo)
					setLoading(false)
				}else {
					setError({status: true,errText:result.Msg || ''})
				}
			})
		}
	},[])

	return (
		<Fragment>
			{!isError.status ? <div className='article-present-container'>
				<div className='article-action-nav'>
					{!loading && <ArticleActionNav articleid={search.get('articleid')}/>}
				</div>
				<div className='article-present-major-container'>
					<Skeleton active loading={loading}>
						<Card title={ArticleInfo.title}>
							<div className='article-show-container'>
								<div className='article-author-header'>
									<ArticlePresentHeader ArticleInfo={ArticleInfo}/>
								</div>
								<Divider/>
								{ArticleInfo.type === 'markdown' ?
									<MarkDownContent content={ArticleInfo.content}/> :
									<ArticleContent content={ArticleInfo.content}/>
								}
							</div>
						</Card>
					</Skeleton>
					<Card>
						<div className='article-comment-container'>
							<Skeleton active loading={loading}>
								<CommentsList articleid={search.get("articleid")} commentsid={ArticleInfo.commentsid} reply={search.get('reply')}/>
							</Skeleton>
						</div>
					</Card>
				</div>
				<div className='article-minor-container'>
					<div className={`article-card-container ${ArticleInfo.type === 'markdown' ? 'markdown-sticky-box' : 'common-sticky-box'}`}>
						<div className='article-card-item box-shadow'>
							<TimeShow/>
						</div>
						{ArticleInfo.type === 'markdown' &&
						<div className='article-card-item box-shadow article-markdown-catalog'>
							<MarkDownCatalog/>
						</div>
						}
					</div>
				</div>
			</div> : <ErrorPage errText={isError.errText}/>}
		</Fragment>
	);
}
