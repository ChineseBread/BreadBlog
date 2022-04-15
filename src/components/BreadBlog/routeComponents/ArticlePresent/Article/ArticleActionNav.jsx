import {Button, Checkbox, Input, message, Modal, Skeleton, Space, Typography} from "antd";
import {
	LikeFilled,
	LikeOutlined,
	MessageOutlined, PlusOutlined,
	PrinterOutlined,
	StarFilled,
	StarOutlined
} from "@ant-design/icons";
import React, {Fragment, useEffect, useState} from "react";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";
import CustomStorage from "../../../../../utils/StorageUtils/CustomStorage";

export default function ArticleActionNav({ArticleInfo,articleid}) {

	let toComment = () => {
		let element = document.getElementById('custom_comment')
		element.scrollIntoView({behavior:'smooth',block:'center'})
	}

	let printPDF = () => {
		message.loading('生成PDF中').then(() => {
			if (window.printJS){
				window.printJS({
					printable:'pdf_viewer',
					type:"html",
					header:`<h1>${ArticleInfo.title}</h1>`,
					documentTitle:'',
					style:'a{text-decoration:none;color:#141414};code{color:#434343}',
					onError:err => {
						message.warn('打印出错')
					}
				})
			}else {
				message.warn('PDF插件尚未加载完成')
			}

		})

	}

	return (
		<Fragment>
			<Like articleid={articleid}/>
			<Button shape="circle" size='large' icon={<MessageOutlined />} onClick={toComment}/>
			<Subscribe articleid={articleid}/>
			<Button shape="circle" size='large' icon={<PrinterOutlined />} onClick={printPDF}/>
		</Fragment>
	);
}

function Like({articleid}){

	const [isLike,setLike] = useState(false)

	useEffect(() => {
		UserOperationRequest.checkLike(articleid).then(result => {
			setLike(result.Msg !== '尚未点赞')
		})
	},[])

	let likeArticle = () => {
		UserOperationRequest[isLike ? 'unlikeArticle' : 'likeArticle'](articleid).then(result => {
			if (result.Ok){
				setLike(like => !like)
			}else{
				message.warn(result.Msg === 'Token过期' ? '您的登录会话已过期' : result.Msg)
			}

		})
	}
	return(
		<Button shape="circle" size='large' icon={isLike ? <LikeFilled/> : <LikeOutlined/>} onClick={likeArticle} />
	)
}

function Subscribe({articleid}){
	//全部收藏夹
	const [favs,setFavs] = useState([])
	const [loading,setLoading] = useState(true)
	const [visible,setVisible] = useState(false)
	const [text,setText] = useState('')
	//是否收藏
	// const [isFav,setIsFav] = useState(false)
	//已选中收藏夹
	const [hasFav,setHasFav] = useState([])

	useEffect(() => {
		UserOperationRequest.checkFav(articleid).then(result => {
			if (result.Ok){
				if (result.isFav) {
					// setIsFav(true)
					setHasFav(result.Favs)
				}
			}
		})
	},[])

	const openUserFav = () => {
		if (favs.length >= 1) {
			setVisible(true)
		} else {
			CustomStorage.checkAccount().then(result => {
				if (result?.Ok){
					setVisible(true)
					UserDataRequest.getUserFavorites().then(result => {
						if (result?.Ok){
							setFavs(result.Favs)
						}else {
							message.warn('获取收藏夹失败')
						}
						setLoading(false)
					})
				}else {
					message.warn(result.Msg)
				}
			})
		}
	}

	const onChange = favList => {
		setHasFav(favList)
	}

	const completeFav = () => {
		message.loading({content:'请稍后',key:'updating'})
		UserOperationRequest.updateFav(hasFav,articleid).then(result =>{
			message[result.Ok ? 'success' : 'warn']({content:result.Msg,key:'updating'})
		})
		setVisible(false)
		// setIsFav(hasFav.length >= 1)
	}

	const onNameChange = ({target}) =>{
		setText(target.value)
	}

	const createFav = () => {
		message.loading({content:'创建新收藏夹',key:'creating'})
		UserOperationRequest.createFav(text).then(result => {
			// message[result?.Ok ? 'success' : 'warn'](result.Msg)
			if (result.Ok){
				message.success({content:'创建成功',key:'creating'})
				setFavs(favs => [...favs,result.FavInfo])
			}else {
				message.warn({content:result.Msg,key:'creating'})
			}
			setText('')
		})
	}
	return(
		<Fragment>
			<Modal title="收藏文章"
			   visible={visible}
			   onOk={completeFav}
			   onCancel={() => setVisible(false)}
			   cancelText='返回'
			   okText='确认'
			>
				<div className='collections-modal-container'>
					<Skeleton active loading={loading}>
						<Checkbox.Group
							options={favs.map(fav =>{
								return{
									label:fav.info.name,
									value:fav.info.name
								}
							})}
							defaultValue={hasFav.map(favItem => favItem.favname)}
							onChange={onChange}
						/>
						<Space align="center">
							<Input maxLength={10} placeholder="创建收藏夹" value={text} onChange={onNameChange} />
							<Typography.Link onClick={createFav} style={{ whiteSpace: 'nowrap' }}>
								<PlusOutlined />创建
							</Typography.Link>
						</Space>
					</Skeleton>
				</div>
			</Modal>
			<Button shape="circle" size='large' icon={hasFav.length >= 1 ? <StarFilled /> : <StarOutlined />} onClick={openUserFav}/>
		</Fragment>
	)
}

