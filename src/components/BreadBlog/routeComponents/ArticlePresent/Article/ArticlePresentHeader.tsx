import React from "react";
import {useNavigate} from "react-router-dom";
import {PageHeader, Tag} from "antd";
import {getFormatTime} from "@utils/PresentUtils/TimeUtils";
import SubscribeBtn from "@utilsComponents/User/SubscribeBtn";

export default function ArticlePresentHeader({ArticleInfo}:{ArticleInfo:PreviewArticleInfo}){
	const navigator = useNavigate()
	return(
		<PageHeader
			title={ArticleInfo.authorname}
			className="site-page-header"
			subTitle={getFormatTime(ArticleInfo.createdtime,'YYYY-MM-DD')}
			onBack={() => navigator(-1)}
			tags={ArticleInfo.tags.map(ele => {
				const tag = JSON.parse(ele)
				return <Tag key={tag}>{tag}</Tag>
			})}
			extra={[
				<SubscribeBtn key='subscribe' type='default' userid={ArticleInfo.authorid}/>
			]}
			avatar={{ src: `/data/logo/${ArticleInfo.authorid}` }}
		>
			{ArticleInfo.description || '该文章无描述'}
		</PageHeader>
	)
}
