import React, {useContext, useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Card, Tag} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";
import UserPreviewContext from "./UserPreviewContext";
import TimeShow from "@utilsComponents/Present/TimeShow";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";
import getDefaultUrlValue from "@utils/PresentUtils/getDefaultUrlValue";

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
	const location = useLocation()
	const navigator = useNavigate()
	const [ArticleCategoryList,setCateGoryList] = useState<string[]>([])
	const [loading,setLoading] = useState(true)
	useEffect(() => {
		PublicDataRequest.getUserArticleCategory(userid).then(result => {
			if (result.Ok){
				result.ArticleCateGory && setCateGoryList(result.ArticleCateGory)
			}
			setTimeout(() => {
				setLoading(false)
			},500)
		})
	},[])
	const handleChange = (category:string) => {
		return () => {
			const currUrl:any = getDefaultUrlValue(location.pathname,/dynamic|subscribe/,'all')
			if (currUrl === 'all'){
				setSearch(`sortname=${category}`)
			}else {
				navigator(`/preview/${userid}?sortname=${category}`)
			}
		}
	}
	return(
		<>
			{useMemo(() => {
				return(
					<Card title='文章分类' loading={loading}>
						<div className='tags-list-container'>
							<Tag icon={<UnorderedListOutlined />} onClick={handleChange('all')}>全部文章</Tag>
							{ArticleCategoryList.filter(category => category && category.trim()).map(category => {
								return(
									<Tag key={category} onClick={handleChange(category)}>{category}</Tag>
								)
							})}
						</div>
					</Card>
				)
			},[loading])}
		</>
	)
}