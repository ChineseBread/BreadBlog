import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, message, Skeleton, Tag} from "antd";
import {nanoid} from "nanoid";
import UserLevel from "../../utilsComponents/User/UserLevel";
import TimeShow from "../../utilsComponents/Present/TimeShow";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";

/**
 * @description 主页侧边栏
 * @constructor
 */
export default function ExploreMinorArea({setArticleList,setListLoading}) {

	return (
		<div className='explore-card-container'>
			<div className='explore-card-item box-shadow'>
				<TimeShow/>
			</div>
			<div className='explore-card-item box-shadow'>
				<CategoryCard
					setArticleList={setArticleList}
					setListLoading={setListLoading}
				/>
			</div>
			<div className='explore-card-item box-shadow'>
				<AuthorListCard/>
			</div>
		</div>
	);
}
function CategoryCard({setArticleList,setListLoading}){

	const [ArticleCategoryList,setCateGoryList] = useState([])
	const [loading,setLoading] = useState(true)
	useEffect(() => {
		// 热门分类
		PublicDataRequest.getHottestArticleCategory().then(result =>{
			if (result?.Ok){
				setCateGoryList(result.HottestCateGory)
			}
			setLoading(false)
		})
	},[])

	const handleClickTag = category => {
		return () => {
			setListLoading(true)
			PublicDataRequest.getArticleByCategory(category).then(result => {
				if (result?.Ok){
					setArticleList(result.ArticleList)
					message.success({content:'获取选中分类文章',key:'loading'})
				}else {
					message.warn({content:'获取文章失败!',key:'loading'})
				}
				setListLoading(false)
			})
		}
	}

	return(
		<>
			{useMemo(() => {
				return(
					<Card title="今天想看什么?">
						<Skeleton loading={loading}>
							<div className='tags-list-container clear-scroll'>
								{ArticleCategoryList.map(category =>{
									return(
										<Tag onClick={handleClickTag(category)} key={nanoid()}>{category}</Tag>
									)
								})}
							</div>
						</Skeleton>
					</Card>
				)
			},[ArticleCategoryList])}
		</>
	)
}
function AuthorListCard(){
	const navigator = useNavigate()
	const [AuthorList,setAuthorList] = useState([])
	const [loading,setLoading] = useState(true)

	useEffect(() => {
		PublicDataRequest.getHottestAuthor().then(result => {
			if (result.Ok){
				setAuthorList(result.AuthorList)
			}
			setLoading(false)
		})
	},[])

	const checkUser = userid => {
		return () => navigator(`/preview/${userid}`)
	}
	return(
		<>
			{useMemo(() => {
				return(
					<Card title="作者榜">
						<Skeleton loading={loading}>
							<div className='author-list-container clear-scroll'>
								{AuthorList.map(({username,userid},index) =>{
									return(
										<div className='author-list-item' key={userid} onClick={checkUser(userid,username)}>
											<Avatar  src={`/data/logo/${userid}`}/>
											<UserLevel user={username}/>
										</div>
									)
								})}
							</div>
						</Skeleton>
					</Card>
				)
			},[AuthorList])}
		</>
	)
}