import React, {Fragment, useEffect, useState} from "react";
import {message} from "antd";
import ExploreNav from "./ExploreNav";
import ExploreMinorArea from "./ExploreMinorArea";
import ArticleListArea from "../../utilsComponents/Present/ArticleListArea";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";
import NotFoundPage from "../../utilsComponents/Present/NotFoundPage";

export default function Explore(props) {
	const [ArticleCategoryList,setCateGoryList] = useState([])
	const [ArticleListInfo,setArticleListInfo] = useState({ArticleList:[],hasMore:false})
	const [isError,setError] = useState({status:false,errText:''})
	useEffect(() => {
		message.loading({content:'获取文章中',key:"loading",duration:10})
		// 获取公共文章
		PublicDataRequest.getHomePageData("random").then(result => {
			if (result.Ok){
				setArticleListInfo(ListInfo => {
					return {
						ArticleList: result.ArticleList,
						hasMore: false
					}
				})
				message.success({content:'文章获取成功',key:'loading'})
			}else {
				message.warn({content:'获取文章失败',key:'loading'})
				setError({status: true,errText: result.Msg})
			}
		})
	},[])

	useEffect(() => {
		// 热门分类
		PublicDataRequest.getHottestArticleCategory().then(result =>{
			if (result?.Ok){
				setCateGoryList(result.HottestCateGory)
			}
		})
	},[])



	let changeCategory = ({key}) => {
		message.loading({content:'请稍后',key:'loading',duration:10})
		PublicDataRequest.getHomePageData(key).then(result => {
			if (result?.Ok){
				setArticleListInfo({ ArticleList: result.ArticleList, hasMore: false})
				message.success({content:'获取新文章',key:'loading'})
			}else {
				message.warn({content:'获取文章失败!',key:'loading'})
			}
		})
	}
	let handleClickTag = category => {
		return () => {
			PublicDataRequest.getArticleByCategory(category).then(result => {
				if (result?.Ok){
					setArticleListInfo({ArticleList: result.ArticleList,hasMore: false})
					message.success({content:'获取选中分类文章',key:'loading'})
				}else {
					message.warn({content:'获取文章失败!',key:'loading'})
				}
			})
		}
	}
	return (
		<Fragment>
			{!isError.status ?
				<div className='explore-show-container'>
					<div className='explore-major-container'>
						<div className='explore-article-header'>
							<ExploreNav changeCategory={changeCategory}/>
						</div>
						<div className='explore-article-list clear-scroll'>
							<ArticleListArea ArticleListInfo={ArticleListInfo} loading={false}/>
						</div>
					</div>
					<div className="explore-minor-container">
						<ExploreMinorArea ArticleCategoryList={ArticleCategoryList} handleClickTag={handleClickTag}/>
					</div>
				</div> : <NotFoundPage errText={isError.errText}/>
			}
		</Fragment>
	);
}
