import React, {Fragment, useEffect, useState} from "react";
import {Button, Checkbox, Input, message, Modal, Popover, Skeleton, Space, Typography} from "antd";
import {
	LikeFilled, LikeOutlined, MessageOutlined, PlusOutlined,
	ShareAltOutlined, StarFilled, StarOutlined
} from "@ant-design/icons";
import ArticlePreviewRequest from "@utils/RequestUtils/Operation/ArticlePreviewRequest";
import UserDataRequest from "@utils/RequestUtils/Data/UserDataRequest";
import UserOperationRequest from "@utils/RequestUtils/Operation/UserOperationRequest";
type navProps = {
	readonly articleid:any
}
export default function ArticleActionNav({articleid}:navProps) {

	let toComment = () => {
		const comment = document.getElementById('comment')
		comment && comment.scrollIntoView({behavior:'smooth',block:'start'})
	}

	return (
		<Fragment>
			<Like articleid={articleid}/>
			<Button shape="circle" size='large' icon={<MessageOutlined />} onClick={toComment}/>
			<Subscribe articleid={articleid}/>
			<Share/>
		</Fragment>
	);
}
function Share(){
	return(
		<Popover content={window.location.href} title="分享" trigger="click" placement='right'>
			<Button size='large' shape='circle' icon={<ShareAltOutlined />}/>
		</Popover>
	)
}
function Like({articleid}:navProps){

	const [isLike,setLike] = useState(false)

	useEffect(() => {
		ArticlePreviewRequest.checkLike(articleid).then(result => {
			setLike(result.Msg === '已点赞过')
		})
	},[])

	let likeArticle = () => {
		ArticlePreviewRequest[isLike ? 'unlikeArticle' : 'likeArticle'](articleid).then(result => {
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

function Subscribe({articleid}:navProps){
	//全部收藏夹
	const [favs,setFavs] = useState<UserFavorite[]>([])
	const [loading,setLoading] = useState(true)
	const [visible,setVisible] = useState(false)
	// 创建收藏夹的input
	const [text,setText] = useState('')
	//已选中收藏夹
	const [hasFav,setHasFav] = useState<string[]>([])

	useEffect(() => {
		ArticlePreviewRequest.checkFav<CheckUserFavorite>(articleid).then(result => {
			if (result.Ok && result.isFav){
				setHasFav((result.Favs || []).map(favItem => favItem.favname))
			}
		})
	},[])

	const openUserFav = () => {
		setVisible(true)
		// 没有获取过收藏夹
		if (favs.length < 1) {
			UserDataRequest.getUserFavorites().then(result => {
				if (result.Ok){
					setFavs(result.Favs || [])
				}else {
					message.warn(result.Msg)
				}
				setLoading(false)
			})
		}
	}

	const onChange = (favList:any) => {
		setHasFav(favList)
	}

	const completeFav = () => {
		message.loading({content:'请稍后',key:'updating'})
		ArticlePreviewRequest.updateFav(hasFav,articleid).then(result =>{
			message[result.Ok ? 'success' : 'warn']({content:result.Msg,key:'updating'})
		})
		setVisible(false)
	}

	const onNameChange = ({target}:any) =>{
		setText(target.value)
	}

	const createFav = () => {
		message.loading({content:'创建新收藏夹',key:'creating'})
		UserOperationRequest.createFav(text).then(result => {
			if (result.Ok){
				message.success({content:'创建成功',key:'creating'})
				setFavs((favs:any) => [...favs,result.FavInfo])
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
							defaultValue={hasFav}
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

