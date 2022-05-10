import React, { useEffect, useState} from "react";
import {message} from "antd";
import UserInfoArea from "./UserInfoArea";
import UserMinorArea from "./UserMinorArea";
import ArticleListArea from "../../../utilsComponents/Present/ArticleListArea";
import ArticleDropMenu from "../../../utilsComponents/Present/ArticleDropMenu";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";

/**
 * @description 用户主页
 */
export default function UserHomePage(){

	const [CategoryList,setCateoryList] = useState([])
	const [ArticleListInfo,setArticleListInfo] = useState({ArticleList:[],hasMore:false})
	const [page,setPage] = useState(1)
	// const [hasMore,setHasMore] = useState(true)
	const [category,setCategory] = useState('all')
	const [loading,setLoading] = useState(true)

	useEffect(() => {
		UserDataRequest.getUserArticleCategory().then(result => {
			if (result?.Ok){
				setCateoryList(result.ArticleCateGory)
			}
		})
	},[])

	useEffect(() => {
		UserDataRequest.getUserArticle(1,'all').then(result => {
			if (result?.Ok){
				let {ArticleList,total} = result
				setPage(page => page + 1)
				setArticleListInfo({ArticleList,hasMore:ArticleList.length < total})
			}
		}).finally(() => {
			setLoading(false)
		})
	},[])

	const changeCategory = key => {
		return () => {
			setPage(1)
			setLoading(true)
			UserDataRequest.getUserArticleByCateGory(page,key).then(result => {
				if (result?.Ok){
					let {ArticleList,total} = result;
					setArticleListInfo({ArticleList, hasMore: ArticleList.length < total})
					setCategory(key)
				}
			}).finally(() => {
				setLoading(false)
			})
		}
	}

	const getMoreArticleList = () => {
		UserDataRequest.getUserArticleByCateGory(page + 1,category).then(result => {

			if (result?.Ok){
				let {ArticleList,total} = result;
				setPage(page => page + 1)
				setArticleListInfo(ListInfo => {
					return{
						ArticleList: [...ListInfo.ArticleList,...ArticleList],
						hasMore: ArticleList.length + ListInfo.ArticleList.length < total
					}
				})
			}else{
				message.warn(result.Msg)
			}

		})
	}
	const deleteArticle = articleid => {
		return () => {
			UserOperationRequest.deleteArticle(articleid).then(result => {
				if (result.Ok){
					setArticleListInfo(({ArticleList,hasMore}) => {
						return{
							ArticleList:ArticleList.filter(article => article.articleid !== articleid),
							hasMore
						}
					})
					message.success("删除成功")
				}else{
					message.warn(result.Msg)
				}
			})
		}
	}
	return(
		<div className='user-home-container'>
			<div className='user-card-list-container' >
				<UserInfoArea changeCategory={changeCategory}/>
				<ArticleListArea
					ArticleListInfo={ArticleListInfo}
					loading={loading}
					getMoreArticleList={getMoreArticleList}
					extra={item => <ArticleDropMenu deleteArticle={deleteArticle}  articleid={item.articleid} type={item.type}/>}
					scrollTarget='scrollableDiv'
				/>
			</div>
			<div className='user-minor-container'>
				<UserMinorArea CategoryList={CategoryList} changeCategory={changeCategory}/>
			</div>
		</div>
	)
}
