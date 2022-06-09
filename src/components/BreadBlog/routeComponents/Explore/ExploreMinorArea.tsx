import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, message ,Tag} from "antd";
import UserLevel from "@utilsComponents/User/UserLevel";
import TimeShow from "@utilsComponents/Present/TimeShow";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

/**
 * @description 主页侧边栏
 * @constructor
 */
export default function ExploreMinorArea({setArticleList,setListLoading}:any) {

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
function CategoryCard({setArticleList,setListLoading}:any){

	const [ArticleCategoryList,setCateGoryList] = useState<string[]>([])
	const [loading,setLoading] = useState(true)
	useEffect(() => {
		// 热门分类
		PublicDataRequest.getHottestArticleCategory().then(result =>{
			if (result?.Ok){
				result.HottestCateGory && setCateGoryList(result.HottestCateGory)
			}
			setTimeout(() => {
				setLoading(false)
			},1000)
		})
	},[])

	const handleClickTag = (category:string) => {
		return () => {
			setListLoading(true)
			PublicDataRequest.getArticleByCategory(category).then(result => {
				if (result?.Ok){
					setArticleList(result.ArticleList)
				}else {
					message.warn({content:'获取文章失败!',key:'loading'})
				}
				setTimeout(() => {
					message.success({content:'获取选中分类文章',key:'loading'})
					setListLoading(false)
				},1000)
			})
		}
	}

	return(
		<>
			{useMemo(() => {
				return(
					<Card title="今天想看什么?" loading={loading}>
						<div className='tags-list-container clear-scroll'>
							{ArticleCategoryList.map(category =>{
								return(
									<Tag onClick={handleClickTag(category)} key={category}>{category}</Tag>
								)
							})}
						</div>
					</Card>
				)
			},[loading])}
		</>
	)
}
function AuthorListCard(){
	const navigator = useNavigate()
	const [AuthorList,setAuthorList] = useState<Author[]>([])
	const [loading,setLoading] = useState(true)

	useEffect(() => {
		PublicDataRequest.getHottestAuthor().then(result => {
			if (result.Ok){
				result.AuthorList && setAuthorList(result.AuthorList)
			}
			setTimeout(() => {
				setLoading(false)
			},1000)
		})
	},[])

	const checkUser = (userid:string) => {
		return () => navigator(`/preview/${userid}`)
	}
	return(
		<>
			{useMemo(() => {
				return(
					<Card title="作者榜" loading={loading}>
						<div className='author-list-container clear-scroll'>
							{AuthorList.map(({username,userid,level},index) =>{
								return(
									<div className='author-list-item' key={userid} onClick={checkUser(userid)}>
										<Avatar  src={PublicDataRequest.getUserAvatarUrl(userid)}/>
										<UserLevel user={username} level={level}/>
									</div>
								)
							})}
						</div>
					</Card>
				)
			},[loading])}
		</>
	)
}