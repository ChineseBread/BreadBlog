import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {message} from "antd";
import ArticleListArea from "../../utilsComponents/Present/ArticleListArea";
import UserPreviewMinor from "./UserPreviewMinor";
import UserPreviewInfo from "./UserPreviewInfo";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";
import UserPreviewList from "./UserPreviewList";

export default function UserPreview(props) {
	const [search,] = useSearchParams()
	const [ArticleCategoryList,setCateGoryList] = useState([])

	const [ArticleListInfo,setArticleListInfo] = useState({ArticleList:[],hasMore:false})
	const [page,setPage] = useState(1)
	// const [hasMore,setHasMore] = useState(true)
	const [category,setCateGory] = useState('all')
	const [loading,setLoading] = useState(true)

	useEffect(() => {
		PublicDataRequest.getUserArticleCategory(search.get('userid')).then(result => {
			if (result?.Ok){
				setCateGoryList(result.ArticleCateGory)
			}
		})
	},[])

	useEffect(() => {
		PublicDataRequest.getUserArticle(search.get('userid'),1).then(result => {
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
			PublicDataRequest.getUserArticleByCateGory(search.get('userid'),page,key).then(result => {
				if (result?.Ok){
					let {ArticleList,total} = result;
					setArticleListInfo({ArticleList, hasMore: ArticleList.length < total})
					setCateGory(key)
				}
			}).finally(() => {
				setLoading(false)
			})
		}
	}

	const getMoreArticleList = () => {
		PublicDataRequest.getUserArticleByCateGory(search.get('userid'),page + 1,category).then(result => {
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
	return (
		<div className='user-home-container'>
			<div className='user-card-list-container' >
				<UserPreviewInfo User={{userid:search.get('userid'),username:search.get('username')}}/>
				<UserPreviewList
					ArticleListInfo={ArticleListInfo}
					loading={loading}
					getMoreArticleList={getMoreArticleList}
					scrollTarget='scrollableDiv'
				/>
			</div>
			<div className='user-minor-container'>
				<UserPreviewMinor ArticleCategoryList={ArticleCategoryList} changeCategory={changeCategory} setCateGoryList={setCateGoryList}/>
			</div>
		</div>
	);
}
