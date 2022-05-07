import React, {Fragment, useEffect, useState} from "react";
import {Button, message} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";
import ExploreNav from "./ExploreNav";
import ExploreMinorArea from "./ExploreMinorArea";
import ExploreArticleList from "./ExploreArticleList";
import NotFoundPage from "../../utilsComponents/Present/NotFoundPage";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";

export default function Explore(props) {
	const [ArticleCategoryList,setCateGoryList] = useState([])
	const [ArticleList,setArticleList] = useState([])
	const [loading,setLoading] = useState(true)
	const [isError,setError] = useState({status:false,errText:''})
	const [column,setColumn] = useState(false)
	useEffect(() => {

		message.loading({content:'获取文章中',key:"loading",duration:10})
		// 获取公共文章
		PublicDataRequest.getHomePageData("random").then(result => {
			if (result.Ok){
				setArticleList(result.ArticleList)
				message.success({content:'文章获取成功',key:'loading'})
			}else {
				message.warn({content:'获取文章失败',key:'loading'})
				setError({status: true,errText: result.Msg})
			}
			setLoading(false)
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
		setLoading(true)
		message.loading({content:'请稍后',key:'loading',duration:10})
		PublicDataRequest.getHomePageData(key).then(result => {
			if (result?.Ok){
				setArticleList(result.ArticleList)
				message.success({content:'获取新文章',key:'loading'})
			}else {
				message.warn({content:'获取文章失败!',key:'loading'})
			}
			setLoading(false)
		})
	}
	let handleClickTag = category => {
		return () => {
			PublicDataRequest.getArticleByCategory(category).then(result => {
				if (result?.Ok){
					setArticleList(result.ArticleList)
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
							<Button onClick={() => setColumn(e => !e)} icon={<UnorderedListOutlined />} type='text'/>
						</div>
						<div className={`explore-article-list clear-scroll ${column && 'double-column'}`}>
							<ExploreArticleList ArticleList={ArticleList} loading={loading}/>
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
