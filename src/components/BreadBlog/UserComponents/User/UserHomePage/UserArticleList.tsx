import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {message} from "antd";
import ArticleDropMenu from "@utilsComponents/Present/ArticleDropMenu";
import ArticleListArea from "@utilsComponents/Present/ArticleListArea";
import UserDataRequest from "@utils/RequestUtils/Data/UserDataRequest";
import UserOperationRequest from "@utils/RequestUtils/Operation/UserOperationRequest";

export default function UserArticleList() {

	const [ArticleListInfo,setArticleListInfo] = useState<ListInfo<{ArticleList:UserArticle[]}>>({ArticleList:[],hasMore:false})
	const [page,setPage] = useState(1)
	const [loading,setLoading] = useState(true)
	const [search,] = useSearchParams()

	useEffect(() => {
		const sortname = search.get('sortname') || 'all'
		setLoading(true)
		UserDataRequest.getUserArticleByCateGory(1,sortname).then(result => {
			if (result.Ok){
				let {ArticleList = [],total = 0} = result
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
		UserDataRequest.getUserArticleByCateGory(page + 1,sortname).then(result => {
			if (result?.Ok){
				let {ArticleList = [],total = 0} = result;
				setPage(page => page + 1)
				setArticleListInfo(ListInfo => {
					return{
						ArticleList: [...ListInfo.ArticleList,...ArticleList],
						hasMore: ArticleList.length + ListInfo.ArticleList.length < total
					}
				})
			}else{
				setArticleListInfo(ListInfo => {
					return{
						ArticleList:ListInfo.ArticleList,
						hasMore: false
					}
				})
				message.warn(result.Msg)
			}

		})
	}
	const deleteArticle = (articleid:string) => {
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
	return (
		<ArticleListArea
			ArticleListInfo={ArticleListInfo}
			loading={loading}
			getMoreArticleList={getMoreArticleList}
			extra={(item:UserArticle) => <ArticleDropMenu key='1' deleteArticle={deleteArticle}  articleid={item.articleid} type={item.type}/>}
			scrollTarget='scrollableDiv'
		/>
	);
}
