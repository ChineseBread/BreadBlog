import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Card, Tag} from "antd";
import {
	EditOutlined,
	EyeInvisibleOutlined,
	FolderOpenOutlined,
	StarOutlined,
	UnorderedListOutlined
} from "@ant-design/icons";
import {nanoid} from "nanoid";
import TimeShow from "../../../utilsComponents/Present/TimeShow";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";

export default function UserMinorArea() {
	const navigator = useNavigate()
	return (
		<div className='user-card-container'>
			<div className='user-minor-card box-shadow'>
				<div className='minor-card-content-container'>
					<TimeShow actions={[
						<div className='user-actions' onClick={() => navigator('/user/collections/show')}>
							<StarOutlined key='subscribe' style={{marginRight:'15px'}} />
							收藏夹
						</div>,
						<div className='user-actions' onClick={() => navigator('/article/edit/md')}>
							<EditOutlined key="edit" style={{marginRight:'15px'}} />
							写文章
						</div>

					]}/>
				</div>
			</div>
			<div className='user-minor-card box-shadow'>
				<CategoryList/>
			</div>
		</div>
	);
}
function CategoryList(){
	const [,setSearch] = useSearchParams()
	const [CategoryList,setCategoryList] = useState([])
	useEffect(() => {
		UserDataRequest.getUserArticleCategory().then(result => {
			if (result?.Ok){
				setCategoryList(result.ArticleCateGory)
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
					<div className='minor-card-content-container'>
						<Card title='文章分类' actions={[<div onClick={() => navigator('/user/article/manage')}>
							<div className='user-actions'>
								<FolderOpenOutlined key='folder' style={{marginRight:'15px'}} />
								文章管理
							</div>
						</div>]}>
							<div className='tags-list-container'>
								<Tag key={nanoid()} icon={<UnorderedListOutlined />} onClick={handleChange('all')}>全部文章</Tag>
								<Tag key={nanoid()} icon={<EyeInvisibleOutlined />} onClick={handleChange('private')}>私人文章</Tag>
								{CategoryList.map(category => {
									return(
										<Tag key={nanoid()} onClick={handleChange(category)}>{category}</Tag>
									)
								})}
							</div>
						</Card>
					</div>
				)
			},[CategoryList])}
		</>
	)
}