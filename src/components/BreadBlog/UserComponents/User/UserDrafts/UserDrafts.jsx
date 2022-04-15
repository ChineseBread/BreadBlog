import React, {useEffect, useState} from "react";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";
import {Button, Card, message, Skeleton} from "antd";
import {useNavigate} from "react-router-dom";
import DraftsList from "./DraftsList";
import DraftDropMenu from "./DraftDropMenu";
import UserOperationRequest from "../../../../../utils/RequestUtils/UserOperationRequest";

export default function UserDrafts(props) {
	const [DraftsListInfo,setDraftsListInfo] = useState({DraftsList:[],hasMore:true})
	const [loading,setLoading] = useState(true)
	const [page,setPage] = useState(1)
	const navigator = useNavigate()

	useEffect(() => {
		UserDataRequest.getUserDrafts(page).then(result => {
			if (result.Ok){
				let {total,DraftsList} = result
				setDraftsListInfo( {DraftsList,hasMore: DraftsList.length < total})
			}else{
				message.warn({content:result.Msg,key:'loading'})
			}

		}).finally(() => {
			setLoading(false)
		})
		return () => false
	},[])

	const getMoreArticleList = () => {
		UserDataRequest.getUserDrafts(page + 1).then(result => {
			if (result.Ok){
				let {total,DraftsList} = result
				setDraftsListInfo(DraftsListInfo => {
					return{
						hasMore: DraftsListInfo.DraftsList.length + DraftsList.length < total,
						DraftsList: [...DraftsListInfo.DraftsList,...DraftsList]
					}
				})
				setPage(page => page + 1)
			}else{
				message.warn(result.Msg)
			}
		})
	}
	const deleteDraft = draftId => {
		return () => {
			UserOperationRequest.deleteDraft(draftId).then(result =>{
				if (result.Ok){
					setDraftsListInfo(({DraftsList,hasMore}) => {
						return{
							hasMore,
							DraftsList:DraftsList.filter(draft => draft.DraftId !== draftId)
						}
					})
					message.success('删除成功')
				}else{
					message.warn(result.Msg)
				}
			})
		}
	}
 	return (
		<div className='user-drafts-container'>
			<Card title='草稿箱' extra={<Button onClick={() => navigator('/article/edit/md')}>写文章</Button>}>
				<div className="user-drafts-list" id='user-drafts-list'>
					<Skeleton active loading={loading}>
						<DraftsList
							getMoreArticleList={getMoreArticleList}
							DraftsListInfo={DraftsListInfo}
							extra={DraftId => <DraftDropMenu deleteDraft={deleteDraft} DraftId={DraftId}/>}
						/>
					</Skeleton>
				</div>
			</Card>
		</div>
	);
}
