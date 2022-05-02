import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, Tag} from "antd";
import {nanoid} from "nanoid";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";
import UserLevel from "../../utilsComponents/User/UserLevel";
import TimeShow from "../../utilsComponents/Present/TimeShow";

/**
 * @description 主页侧边栏
 * @constructor
 */
export default function ExploreMinorArea({ArticleCategoryList,handleClickTag}) {
	const navigator = useNavigate()
	const [AuthorList,setAuthorList] = useState([])
	useEffect(() => {
		PublicDataRequest.getHottestAuthor().then(result => {
			if (result.Ok){
				setAuthorList(result.AuthorList)
			}
		})
	},[])
	const checkUser = (userid,username) => {
		return () => navigator(`/preview?userid=${userid}&username=${username}`)
	}
	return (
		<div className='explore-card-container'>
			<div className='explore-card-item box-shadow'>
				<TimeShow/>
			</div>
			{useMemo(() => {
				return(
					<div className='explore-card-item box-shadow'>
						<Card title="今天想看什么?">
							<div className='tags-list-container clear-scroll'>
								{ArticleCategoryList.map(category =>{
									return(
										<Tag onClick={handleClickTag(category)} key={nanoid()}>{category}</Tag>
									)
								})}
							</div>
						</Card>
					</div>
				)
			},[ArticleCategoryList])}
			{useMemo(() => {
				return(
					<div className='explore-card-item box-shadow'>
						<Card title="作者榜">
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
						</Card>
					</div>
				)
			},[AuthorList])}

		</div>
	);
}
