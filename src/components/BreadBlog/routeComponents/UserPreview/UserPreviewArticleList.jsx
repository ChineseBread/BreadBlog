import React, {useContext, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {message} from "antd";
import ArticleListArea from "../../utilsComponents/Present/ArticleListArea";
import UserPreviewContext from "./UserPreviewContext";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";

export default function UserPreviewArticleList(props) {

	const {userid} = useContext(UserPreviewContext)
	const [search,] = useSearchParams()

	const [ArticleListInfo,setArticleListInfo] = useState({ArticleList:[],hasMore:false})
	const [page,setPage] = useState(1)
	const [loading,setLoading] = useState(true)


	useEffect(() => {
		const sortname = search.get('sortname') || 'all'
		setLoading(true)
		PublicDataRequest.getUserArticleByCateGory(userid,1,sortname).then(result => {
			if (result.Ok){
				let {ArticleList,total} = result
				setPage(2)
				setArticleListInfo({ArticleList,hasMore:ArticleList.length < total})
			}else {
				message.warn(result.Msg)
			}
		}).finally(() => {
			setLoading(false)
		})
	},[search])

	const getMoreArticleList = () => {
		const sortname = search.get('sortname') || 'all'
		PublicDataRequest.getUserArticleByCateGory(userid,page,sortname).then(result => {
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
		<ArticleListArea
			ArticleListInfo={ArticleListInfo}
			loading={loading}
			getMoreArticleList={getMoreArticleList}
			scrollTarget='scrollableDiv'
		/>
	);
}
