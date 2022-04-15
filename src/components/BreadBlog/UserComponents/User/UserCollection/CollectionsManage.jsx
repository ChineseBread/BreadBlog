import {useEffect, useMemo, useState} from "react";
import {Button, Input, message, Popconfirm, Skeleton} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";

export default function CollectionsManage(props) {
	const[favs,setFavs] = useState([]);
	const [text,setText] = useState('')
	const [loading,setLoading] = useState(false)
	const [favLoading,setFavLoading] = useState(true)
	useEffect(() => {
		UserDataRequest.getUserFavorites().then(result => {
			if (result?.Ok){
				setFavs(result.Favs)
			}else{
				message.warn('获取收藏夹失败')
			}
			setFavLoading(false)
		})

	},[])
	const confirm = favname => {
		return () => {
			return new Promise((resolve,reject) => {
				UserOperationRequest.deleteFav(favname).then(result => {
					message[result?.Ok? 'success' : 'warn'](result?.Msg)
					setFavs(favs => favs.filter(favItem => favItem.info.name !== favname))
					resolve()
				})
			})
		}
	}
	let handleChange = target => {
		setText(target.value)
	}
	let handleCreate = () => {
		if (!text) {
			message.warn('收藏夹名称不能为空!')
		}else{
			setLoading(true)
			UserOperationRequest.createFav(text).then(result => {
				if (result?.Ok){
					message.success('添加成功')
					setFavs(favs => [...favs,result.FavInfo])
				}else {
					message.warn(result.Msg)
				}
				setText('')
				setLoading(false)
			})
		}

	}
	return (
		<div className='fav-list-container'>
			<Skeleton active loading={favLoading}>
				{
					useMemo(() => {
						return(
							favs.map(favItem => {
								return(
									<div className='fav-item' key={favItem.favid}>
										<span>{favItem.info.name}</span>
										<div className='fav-button'>
											<Button type='ghost'>编辑</Button>
											<Popconfirm
												title="确认删除吗"
												onConfirm={confirm(favItem.info.name)}
												okText='确认'
												cancelText='取消'
											>
												<Button type="ghost">删除</Button>
											</Popconfirm>
										</div>
									</div>
								)
							})
						)
					},[favs])
				}
				<div className='fav-item'>
					<Input placeholder='输入收藏夹名称' maxLength='10' value={text} onChange={({target}) => handleChange(target)}/>
					<Button icon={loading ? <LoadingOutlined /> :<PlusOutlined />} onClick={handleCreate}>创建收藏夹</Button>
				</div>
			</Skeleton>
		</div>
	);
}