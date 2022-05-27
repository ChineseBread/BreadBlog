import React, {Fragment, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, Divider, List, Skeleton} from "antd";
import {EyeOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import {getFormatTime} from "@utils/PresentUtils/TimeUtils";
import IconText from "@utils/PresentUtils/IconText";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

export default function ArticleListArea({ArticleListInfo,getMoreArticleList,loading,extra,scrollTarget}:any) {

	const navigator = useNavigate()
	const checkArticle = (articleid:string) =>{
		return () => {
			navigator(`/post?articleid=${articleid}`)
		}
	}
	const checkUser = (authorid:string) => {
		return () => navigator(`/preview/${authorid}`)
	}
	return (
		<Fragment>
			{useMemo(() => {

				return (
					loading ?
						<Card title="请稍后">
							<Skeleton active/>
						</Card>
						:
						<InfiniteScroll
							dataLength={ArticleListInfo.ArticleList.length}
							next={getMoreArticleList}
							hasMore={ArticleListInfo.hasMore}
							loader={<Divider plain>🧐 加载中</Divider>}
							endMessage={<Divider plain>你已经到达世界的尽头 🤐</Divider>}
							scrollableTarget={scrollTarget}
						>
							<List
								itemLayout="vertical"
								size="large"
								dataSource={ArticleListInfo.ArticleList}
								renderItem={(item:Article) => (
									<div className='article-list-item'>
										<List.Item
											key={item.articleid}
											actions={[
												<IconText icon={EyeOutlined} text={item.pv || 0} key="list-vertical-eye-o" />,
												<IconText icon={LikeOutlined} text={item.likes || 0} key="list-vertical-like-o" />,
												<IconText icon={MessageOutlined} text={item.comments || 0} key="list-vertical-message" />,
												extra && extra(item),
											]}
											extra={[
												item.cover &&  <img
													key='img'
													alt="logo"
													src={`/data/article/cover/${item.articleid}`}
												/>
											]}
										>
											<List.Item.Meta
												// @ts-ignore
												avatar={<Avatar onClick={checkUser(item.authorid)} src={PublicDataRequest.getUserAvatarUrl(item.authorid)} />}
												title={item.title}
												description={`${item.sortname || '无分类'} | ${getFormatTime(item.createdtime,'YYYY-MM-DD')}`}
											/>
											<div className='article-list-item-content' onClick={checkArticle(item.articleid)}>
												{item.description || '太屑啦什么都没有写'}
											</div>
										</List.Item>
									</div>
								)}
							/>
						</InfiniteScroll>
				)
			},[loading,ArticleListInfo])}
		</Fragment>
	)
}
