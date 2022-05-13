import React, {useContext, useEffect, useMemo, useState} from "react";
import {Card, Tag} from "antd";
import {nanoid} from "nanoid";
import TimeShow from "../../utilsComponents/Present/TimeShow";
import {UnorderedListOutlined} from "@ant-design/icons";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";
import {useSearchParams} from "react-router-dom";
import UserPreviewContext from "./UserPreviewContext";

export default function UserPreviewMinor() {
	return (
		<div className='user-card-container'>
			<div className='user-minor-card box-shadow'>
				<div className='minor-card-content-container'>
					<TimeShow/>
				</div>
			</div>
			<div className='user-minor-card box-shadow'>
				<div className='minor-card-content-container'>
					<CategoryList/>
				</div>
			</div>
		</div>
	);
}
function CategoryList(){
	const {userid} = useContext(UserPreviewContext)
	const [,setSearch] = useSearchParams()
	const [ArticleCategoryList,setCateGoryList] = useState([])
	useEffect(() => {
		PublicDataRequest.getUserArticleCategory(userid).then(result => {
			if (result?.Ok){
				setCateGoryList(result.ArticleCateGory)
			}
		})
	},[])
	const handleChange = category => {
		return () => {
			setSearch(`sortname=${category}`)
		}
	}
	return(
		<>
			{useMemo(() => {
				return(
					<Card title='文章分类'>
						<div className='tags-list-container'>
							<Tag icon={<UnorderedListOutlined />} onClick={handleChange('all')}>全部文章</Tag>
							{ArticleCategoryList.map(category => {
								return(
									<Tag key={nanoid()} onClick={handleChange(category)}>{category}</Tag>
								)
							})}
						</div>
					</Card>
				)
			},[ArticleCategoryList])}
		</>
	)
}