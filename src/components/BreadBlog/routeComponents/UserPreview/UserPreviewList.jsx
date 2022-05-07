import React, {Fragment, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, Divider, List, Skeleton, Space} from "antd";
import {EyeOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment/moment";
const IconText = ({ icon, text }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);

export default function UserPreviewList({ArticleListInfo,getMoreArticleList,loading,extra,scrollTarget}) {

	const navigator = useNavigate()
	let checkArticle = articleid =>{
		return () => {
			navigator(`/post?articleid=${articleid}`)
		}
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
								renderItem={item => (
									<div className='article-list-item'>
										<List.Item
											key={item.articleid}
											actions={[
												<IconText icon={EyeOutlined} text={item.pv || 0} key="list-vertical-eye-o" />,
												<IconText icon={LikeOutlined} text={item.likes || 0} key="list-vertical-like-o" />,
												<IconText icon={MessageOutlined} text={item.comments || 0} key="list-vertical-message" />,
											]}
											extra={
												<img
													alt="logo"
													src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
												/>
											}
										>
											<List.Item.Meta
												avatar={<Avatar src={`/data/logo/${item.authorid}`} />}
												title={item.title}
												description={`${item.sortname || '无分类'} | ${moment(item.createdtime * 1000).format('YYYY-MM-DD')}`}
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
			},[loading,ArticleListInfo.ArticleList])}
		</Fragment>
	)
}
