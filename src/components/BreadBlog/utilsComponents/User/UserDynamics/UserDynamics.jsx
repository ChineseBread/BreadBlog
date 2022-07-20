import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, List, message, Result} from "antd";
import {EyeOutlined, LikeOutlined, MessageOutlined, SmileOutlined} from "@ant-design/icons";
import LikeArticle from "./LikeArticle";
import NewArticle from "./NewArticle";
import {getFormatTime} from "@utils/PresentUtils/TimeUtils";
import IconText from "@utils/PresentUtils/IconText";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

const map = {
	'LikeArticle': Time => <LikeArticle time={Time}/>,
	'NewArticle':Time => <NewArticle time={Time} />
}
export default function UserDynamics({userid}) {

	const [loading,setLoading] = useState(true)
	const [dynamics,setDynamics] = useState([])

	useEffect(() => {
		PublicDataRequest.getUserDynamics(userid).then(result => {
			if (result.Ok){
				setDynamics(result.Dynamics)
			}else {
				message.warn(result.Msg)
			}
			setLoading(false)
		})
	},[])
	return (
		<div className='user-dynamics-list'>
			{useMemo(() => {
				return (
					loading ?
						<Card title="请稍后" loading={true}/> :
						dynamics.length >= 1 ? <List
							itemLayout="vertical"
							size="large"
							dataSource={dynamics}
							renderItem={({Time,Data,Type}) => <ArticleItem article={Data.Article}>{map[Type](Time)}</ArticleItem>}
						/> : <Result
							icon={<SmileOutlined />}
							title="最近没有动态哦"
						/>
				)
			},[loading,dynamics])}
		</div>
	);
}
function ArticleItem({article:{title,authorid,createdtime,sortname,pv,likes,comments,description,articleid,cover},children}){
	const navigator = useNavigate()
	const checkArticle = () => {
		navigator(`/post?articleid=${articleid}`)
	}
	return (
		<div className='article-list-item'>
			{children}
			<List.Item
				actions={[
					<IconText icon={EyeOutlined} text={pv || 0} key="list-vertical-eye-o" />,
					<IconText icon={LikeOutlined} text={likes || 0} key="list-vertical-like-o" />,
					<IconText icon={MessageOutlined} text={comments || 0} key="list-vertical-message" />,
				]}
				extra={[
					cover &&  <img
						key='img'
						alt="logo"
						src={`/data/article/cover/${articleid}`}
					/>
				]}
			>
				<List.Item.Meta
					avatar={<a href={`/preview/${authorid}`}><Avatar src={PublicDataRequest.getUserAvatarUrl(authorid)} /></a>}
					title={title}
					description={`${sortname || '无分类'} | ${getFormatTime(createdtime,'YYYY-MM-DD')}`}
				/>
				<div className='article-list-item-content' onClick={checkArticle}>
					{description || '太屑啦什么都没有写'}
				</div>
			</List.Item>
		</div>
	);
}
