import React, {Fragment, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Collapse, Divider, List} from "antd";
import {EditOutlined, MediumOutlined} from "@ant-design/icons";
import moment from "moment/moment";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomStorage from "../../../../../utils/StorageUtils/CustomStorage";
const { Panel } = Collapse
const CollapseContent =　({DraftId,Versions}) => {
	const navigator = useNavigate()
	const editArticle = (DraftId,Versions) => {
		return () => {
			navigator(`/article/draft/${Versions.type === 'markdown' ? 'md' : 'common'}/${DraftId}/${Versions.VersionId}`,{
				state:{
					Versions
				}
			})
		}
	}

	return(
		<Collapse ghost>
			<Panel header={Versions[0].Data.title}>
				{Versions.map(({VersionId,Data:{title,time,type,content}}) => {
					return(
						<div className='version-item' key={VersionId} onClick={editArticle(DraftId,{VersionId,title,content,type})}>
							<div >
								<span className='version-type'>{type === 'markdown' ? <MediumOutlined /> : <EditOutlined />}</span>
								<span className='version-title'>{title || '无标题'}</span>
								<span className='version-time'>{`${moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')}`}</span>
							</div>
						</div>
					)
				})}
			</Panel>
		</Collapse>
	)
}
export default function DraftsList({DraftsListInfo,getMoreArticleList,extra}) {

	return (
		<Fragment>
			{useMemo(() => {
				return(
					<InfiniteScroll
						dataLength={DraftsListInfo.DraftsList.length}
						next={getMoreArticleList}
						hasMore={DraftsListInfo.hasMore}
						loader={<Divider plain>🧐 加载中</Divider>}
						endMessage={<Divider plain>你已经到达世界的尽头 🤐</Divider>}
						scrollableTarget='user-drafts-list'
					>
						<List
							itemLayout="vertical"
							size="large"
							dataSource={DraftsListInfo.DraftsList}
							renderItem={({DraftId,Versions}) => (
								<div className='drafts-list-item'>
									<List.Item key={DraftId} extra={extra(DraftId)}>
										<List.Item.Meta
											avatar={<Avatar src={CustomStorage.getAvatarUrl()} />}
											title={Versions[0].Data.title || '无标题'}
											description={`${moment(Versions[0].Data.time * 1000).format('YYYY-MM-DD')} | 历史版本数:${Versions.length || 0}`}
										/>
										<CollapseContent Versions={Versions} DraftId={DraftId}/>
									</List.Item>
								</div>
							)}
						/>
					</InfiniteScroll>
				)
			},[DraftsListInfo.DraftsList])}
		</Fragment>
	);
}
/*

 */