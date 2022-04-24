import React, { useEffect, useState} from "react";
import UserInfoArea from "./UserInfoArea";
import UserMinorArea from "./UserMinorArea";
import ArticleListArea from "../../../utilsComponents/Present/ArticleListArea";
import ArticleDropMenu from "../../../utilsComponents/Present/ArticleDropMenu";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";
import {message} from "antd";
// import ArticleDropMenu from "../../../utilsComponents/ArticleDropMenu";

/**
 * @ To be determined 除公共文章之外都没有给page选项，需要给page属性或者直接全部渲染
 */
export default function UserHomePage(){

	const [ArticleCategoryList,setCateGoryList] = useState([])
	const [ArticleListInfo,setArticleListInfo] = useState({ArticleList:[],hasMore:true})
	const [page,setPage] = useState(1)
	// const [hasMore,setHasMore] = useState(true)
	const [category,setCateGory] = useState('all')
	const [loading,setLoading] = useState(true)

	useEffect(() => {
		UserDataRequest.getUserArticleCategory().then(result => {
			if (result?.Ok){
				setCateGoryList(result.ArticleCateGory)
			}
		})
	},[])

	useEffect(() => {
		UserDataRequest.getUserArticle(1,'all').then(result => {
			if (result?.Ok){
				let {ArticleList,total} = result
				setPage(page => page + 1)
				setArticleListInfo({ArticleList,hasMore:ArticleList.length < total})
				// setArticleList(ArticleList => [...ArticleList,...result.ArticleList])
				// setHasMore(ArticleList < result.total)
			}
		}).finally(() => {
			setLoading(false)
		})
	},[])


	let changeCategory = (key) => {
		return () => {
			setPage(1)
			setLoading(true)
			UserDataRequest.getUserArticleByCateGory(page,key).then(result => {
				if (result?.Ok){
					let {ArticleList,total} = result;
					setArticleListInfo({ArticleList, hasMore: ArticleList.length < total})
					// setArticleList(result.ArticleList)
					// setHasMore(ArticleList.)
					setCateGory(key)
				}
			}).finally(() => {
				setLoading(false)
			})
		}
	}

	let getMoreArticleList = () => {
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
				// setArticleList(ArticleList => [...ArticleList,...result.ArticleList])
				// setHasMore(ArticleList < result.total)
			}else{
				message.warn(result.Msg)
			}

		})
	}

	return(
		<div className='user-home-container'>
			<div className='user-card-list-container' >
				<UserInfoArea  changeCategory={changeCategory}/>
				<ArticleListArea
					ArticleListInfo={ArticleListInfo}
					loading={loading}
					// ArticleList={ArticleList}
					getMoreArticleList={getMoreArticleList}
					// hasMore={hasMore}
					extra={item => <ArticleDropMenu articleid={item.articleid} type={item.type}/>}
					scrollTarget='scrollableDiv'
				/>
			</div>
			<div className='user-minor-container'>
				<UserMinorArea ArticleCategoryList={ArticleCategoryList} changeCategory={changeCategory}/>
			</div>
		</div>
	)
}
