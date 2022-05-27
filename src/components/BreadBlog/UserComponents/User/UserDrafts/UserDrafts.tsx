import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, message, Skeleton} from "antd";
import DraftsList from "./DraftsList";
import DraftDropMenu from "./DraftDropMenu";
import UserOperationRequest from "@utils/RequestUtils/Operation/UserOperationRequest";
import UserDataRequest from "@utils/RequestUtils/Data/UserDataRequest";

export default function UserDrafts() {
	const navigator = useNavigate()
	const [DraftsListInfo,setDraftsListInfo] = useState<ListInfo<{DraftsList:Draft[]}>>({DraftsList:[],hasMore:true})
	const [loading,setLoading] = useState(true)
	const [page,setPage] = useState(1)

	useEffect(() => {
		UserDataRequest.getUserDrafts(page).then(result => {
			if (result.Ok){
				let {total = 0,DraftsList = []} = result
				setDraftsListInfo( {DraftsList,hasMore: DraftsList.length < total})
			}else{
				message.warn({content:result.Msg,key:'loading'})
			}

		}).finally(() => {
			setLoading(false)
		})
	},[])

	const getMoreArticleList = () => {
		UserDataRequest.getUserDrafts(page + 1).then(result => {
			if (result.Ok){
				let {total = 0,DraftsList = []} = result
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
	const deleteDraft = (draftId:string) => {
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
							extra={(DraftId:string) => <DraftDropMenu deleteDraft={deleteDraft} DraftId={DraftId}/>}
						/>
					</Skeleton>
				</div>
			</Card>
		</div>
	);
}
