import React, {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, List, Skeleton} from "antd";
import {EyeOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";
import {getFormatTime} from "@utils/PresentUtils/TimeUtils";
import IconText from "@utils/PresentUtils/IconText";

export default function ExploreArticleList({ArticleList,loading}:{ArticleList:Article[],loading:boolean}) {
	const navigator = useNavigate()
	const checkArticle = (articleid:string) =>{
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
							renderItem={(item:PublicArticle) => (
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
											avatar={<a href={`/preview/${item.authorid}`}><Avatar src={`/data/logo/${item.authorid}`} /></a>}
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

				)
			},[loading])}
		</>
	);
}
