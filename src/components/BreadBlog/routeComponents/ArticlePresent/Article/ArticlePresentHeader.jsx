import {useNavigate} from "react-router-dom";
import {Button, PageHeader, Tag} from "antd";
import moment from "moment";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";
import {nanoid} from "nanoid";

export default function ArticlePresentHeader({ArticleInfo}){
	const navigator = useNavigate()
	return(
		<PageHeader
			title={ArticleInfo.authorname}
			className="site-page-header"
			subTitle={moment(Number(ArticleInfo.createdtime) * 1000).format('YYYY-MM-DD')}
			onBack={() => navigator(-1)}
			tags={ArticleInfo.tags.map(ele => <Tag key={nanoid()}>{JSON.parse(ele)}</Tag>)}
			// subTitle="This is a subtitle"
			extra={[
				<Button key="subscribe" icon={<PlusOutlined />}>关注</Button>,
			]}
			avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
		>
			{ArticleInfo.description || '该文章无描述'}
		</PageHeader>
	)
}
