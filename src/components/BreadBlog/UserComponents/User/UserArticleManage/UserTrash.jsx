import React, {useEffect, useMemo, useState} from "react";
import {Avatar, Button, Card, Divider, Dropdown, List, Menu, message, Skeleton} from "antd";
import {DeleteOutlined, MoreOutlined, RedoOutlined} from "@ant-design/icons";
import moment from "moment/moment";
import InfiniteScroll from "react-infinite-scroll-component";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";

export default function UserTrash(props) {
	const [page,setPage] = useState(1)
	const [TrashListInfo,setTrashListInfo] = useState({TrashList:[],hasMore:false})
	const [loading,setLoading] = useState(true)
	useEffect(() => {
		UserDataRequest.getUserTrash(page).then(result => {
			if (result.Ok){
				let {total,TrashList} = result
				setTrashListInfo({TrashList,hasMore:TrashList.length < total})
			}else {
				message.warn(result.Msg)
			}
			setLoading(false)
		})
	},[])
	const getMoreTrashList = () => {
		UserDataRequest.getUserTrash(page + 1).then(result => {
			if (result.Ok){
				let {TrashList,total} = result
				setTrashListInfo(TrashListInfo => {
					return{
						TrashList: [...TrashListInfo.TrashList,...TrashList],
						hasMore: TrashListInfo.TrashList.length + TrashList.length < total
					}
				})
				setPage(page => page + 1)
			}else{
				message.warn(result.Msg)
			}
		})
	}
	const removeTrash = (trashid,type) => {
		return () => {
			UserOperationRequest.removeTrash(trashid,type).then(result => {
				if (result.Ok){
					setTrashListInfo(TrashListInfo => {
						return{
							TrashList:TrashListInfo.TrashList.filter(trash => trash.TrashId !== trashid),
							hasMore: TrashListInfo.hasMore
						}
					})
				}
				message[result.Ok ? 'success' : 'warn'](result.Msg)
			})
		}
	}
	return (
		<Card type='inner' title='垃圾箱'>
			<Skeleton active loading={loading}>
				<InfiniteScroll
					dataLength={TrashListInfo.TrashList.length}
					next={getMoreTrashList}
					hasMore={TrashListInfo.hasMore}
					loader={<Divider plain>🧐 加载中</Divider>}
					endMessage={<Divider plain>你已经到达世界的尽头 🤐</Divider>}
					scrollableTarget='user-trash-list'
				>
					{useMemo(() => {
						return(
							<List
								itemLayout="vertical"
								size="large"
								dataSource={TrashListInfo.TrashList}
								renderItem={({TrashId,TrashData:{title,createdtime,sortname,description,authorid}}) => (
									<div className='article-list-item'>
										<List.Item
											key={TrashId}
											extra={<TrashMenu TrashId={TrashId} removeTrash={removeTrash}/>}
										>
											<List.Item.Meta
												avatar={<Avatar src={`/data/logo/${authorid}`} />}
												title={title}
												description={`${sortname || '无分类'} | ${moment(createdtime * 1000).format('YYYY-MM-DD')}`}
											/>
											<div className='article-list-item-content'>
												{description || '无内容'}
											</div>
										</List.Item>
									</div>
								)}
							/>
						)
					},[TrashListInfo.TrashList])}
				</InfiniteScroll>
			</Skeleton>
		</Card>
	);
}
function TrashMenu({TrashId,removeTrash}){
	return(
		<Dropdown key="more" overlay={useMenu(TrashId,removeTrash)} placement="bottomRight" overlayClassName='article-dropdown' arrow>
			<Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
		</Dropdown>
	)
}
const useMenu = (trashid,removeTrash) => {
	let onClick = ({key}) => {
		switch (key){
			case "redo":
				removeTrash(trashid,'redo')()
				break;
			case "delete":
				removeTrash(trashid,'delete')()
				break;
			default:
			// do nothing
		}
	}
	return (
		<Menu onClick={onClick}>
			<Menu.Item key='redo'>
				<RedoOutlined/>
				还原
			</Menu.Item>
			<Menu.Item key='delete'>
				<DeleteOutlined />
				删除
			</Menu.Item>
		</Menu>
	);
}
