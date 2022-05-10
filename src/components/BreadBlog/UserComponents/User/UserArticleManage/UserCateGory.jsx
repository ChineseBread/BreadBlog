import {useEffect, useMemo, useState} from "react";
import {Card, message, Skeleton, Switch, Tag, Tooltip} from "antd";
import {nanoid} from "nanoid";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";

export default function UserCateGory() {
	const [CategoryList,setCategoryList] = useState([])
	const [loading,setLoading] = useState(true)
	const [force,setForce] = useState(true)
	useEffect(() => {
		UserDataRequest.getUserArticleCategory().then(result => {
			if (result?.Ok){
				setCategoryList(result.ArticleCateGory)
			}else{
				message.warn('获取分类失败')
			}
			setLoading(false)
		})
	},[])
	return (
		<Card type='inner' title='分类管理' extra={[
			<Tooltip title='强制会删除对应全部文章' placement='left' key='force'>
				<Switch onChange={() => setForce(force => !force)} defaultChecked checkedChildren='强制' unCheckedChildren='非强制'/>
			</Tooltip>]}>
			<Skeleton loading={loading}>
				<div className='tags-list-container'>
					{useMemo(() => {
						return(
							CategoryList.map(category => {
								return(
									<Category key={nanoid()} category={category} force={force} setCategoryList={setCategoryList}/>
								)
							})
						)
					},[CategoryList,force])}
				</div>
			</Skeleton>
		</Card>

	);
}
function Category({category,setCategoryList,force}){
	const deleteTag = e => {
		message.loading({content:'删除中',key:'loading'})
		UserOperationRequest.deleteUserCateGory(category,force).then(result => {
			if (result.Ok){
				message.success({content:'删除成功',key:'loading'})
				setCategoryList(CategoryList => CategoryList.filter(ele => ele !== category))
			}else{
				message.warn(result.Msg)
			}
		})
	}
	return(
		<Tag closable onClose={deleteTag}>{category}</Tag>
	)
}
