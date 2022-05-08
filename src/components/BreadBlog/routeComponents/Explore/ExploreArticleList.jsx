import React, {useMemo} from "react";
import {Avatar, Card, List, Skeleton, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {EyeOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";
import moment from "moment/moment";

const IconText = ({ icon, text }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);
export default function ExploreArticleList({ArticleList,loading}) {
	const navigator = useNavigate()
	let checkArticle = articleid =>{
		return () => {
			navigator(`/post?articleid=${articleid}`)
		}
	}
	return (
		<>
			{useMemo(() => {
				return(
					loading ?
						<Card title="请稍后">
							<Skeleton active/>
						</Card> :
						<List
							itemLayout="vertical"
							size="large"
							dataSource={ArticleList}
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
											item.cover &&  <img
												alt="logo"
												src={`/data/article/cover/${item.articleid}`}
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

				)
			},[loading])}
		</>
	);
}
