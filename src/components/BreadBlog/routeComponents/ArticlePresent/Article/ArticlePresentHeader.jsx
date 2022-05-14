import {useNavigate} from "react-router-dom";
import {PageHeader, Tag} from "antd";
import moment from "moment";
import React from "react";
import {nanoid} from "nanoid";
import SubscribeBtn from "../../../utilsComponents/User/SubscribeBtn";

export default function ArticlePresentHeader({ArticleInfo}){
	const navigator = useNavigate()
	return(
		<PageHeader
			title={ArticleInfo.authorname}
			className="site-page-header"
			subTitle={moment(ArticleInfo.createdtime * 1000).format('YYYY-MM-DD')}
			onBack={() => navigator(-1)}
			tags={ArticleInfo.tags.map(ele => <Tag key={nanoid()}>{JSON.parse(ele)}</Tag>)}
			// subTitle="This is a subtitle"
			extra={[
				<SubscribeBtn key='subscribe' type='default' userid={ArticleInfo.authorid}/>
			]}
			avatar={{ src: `/data/logo/${ArticleInfo.authorid}` }}
		>
			{ArticleInfo.description || '该文章无描述'}
		</PageHeader>
	)
}
