import React, {Fragment, useEffect, useState} from "react";
import {Card, message, Skeleton} from "antd";
import CollectionsMenu from "./CollectionsMenu";
import ArticleListArea from "../../../utilsComponents/ArticleListArea";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";

export default function CollectionsArticle(props) {
	const [loading,setLoading] = useState(false)
	const [favsLoading,setFavsLoading] = useState(true)
	const [favs,setFavs] = useState([])
	const [category,setCateGory] = useState('')
	const [ArticleListInfo,setArticleListInfo] = useState({ArticleList:[],hasMore:false})
	const [page,setPage] = useState(1)
	// const [visible,setVisible] = useState(false)

	useEffect(() => {
		UserDataRequest.getUserFavorites().then(result => {
			if (result?.Ok){
				setFavs(result.Favs)
				setFavsLoading(false)
			}else{
				message.warn('获取收藏夹失败')
				// setFavsLoading(false)
			}
		})

	},[])

	const getMoreArticleList = () => {
		UserDataRequest.getArticlesByFav(page + 1,category).then(result => {

			if (result?.Ok){
				let {ArticleList,total} = result;
				setPage(page => page + 1)
				setArticleListInfo(ListInfo => {
					return{
						ArticleList: [...ListInfo.ArticleList,...ArticleList],
						hasMore: ArticleList.length + ListInfo.ArticleList.length < total
					}
				})
			}

		})
	}

	const changeFav = (key) =>{
		return () => {
			message.loading({content:'加载中...',key:'loading'})
			setPage(1)
			setLoading(true)
			UserDataRequest.getArticlesByFav(1,key).then(result => {
				if (result?.Ok){
					let {ArticleList,total} = result;
					setArticleListInfo({ArticleList, hasMore: ArticleList.length < total})
					setCateGory(key)
					message.success({content:'获取新文章',key:'loading'})
					setLoading(false)
				}else {
					message.warn({content:'获取信息失败',key:'loading'})
					// setLoading(false)
				}
			})
		}

	}
	return (
		<Fragment>
			<div className='collections-menu clear-scroll'>
				<Skeleton active loading={favsLoading}>
					<CollectionsMenu favs={favs} changeFav={changeFav}/>
				</Skeleton>
			</div>
			<div className='collections-article-list-container' id='collections-article-list-container'>

				<Card type='inner' title={loading ? '加载中...' : category}>
					<Skeleton active loading={loading}>
						<ArticleListArea
							ArticleListInfo={ArticleListInfo}
							loading={false}
							// ArticleList={ArticleList}
							getMoreArticleList={getMoreArticleList}
							// hasMore={hasMore}
							scrollTarget='collections-article-list-container'
						/>
					</Skeleton>
				</Card>
			</div>
		</Fragment>
	);
}
