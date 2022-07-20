import React, {Fragment, useEffect, useState} from "react";
import {Button, message} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";
import ExploreNav from "./ExploreNav";
import ExploreMinorArea from "./ExploreMinorArea";
import ExploreArticleList from "./ExploreArticleList";
import ErrorPage from "@utilsComponents/Present/ErrorPage";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

export default function Explore() {

	const [ArticleList,setArticleList] = useState<PublicArticle[]>([])
	const [loading,setLoading] = useState(true)
	const [column,setColumn] = useState(false)
	const [isError,setError] = useState({status:false,errText:''})

	useEffect(() => {

		message.loading({content:'获取文章中',key:"loading",duration:10})
		// 获取公共文章
		PublicDataRequest.getHomePageData("random").then(result => {
			if (result.Ok){
				setArticleList(result.ArticleList)
			}else {
				message.warn({content:'获取文章失败',key:'loading'})
				setError({status: true,errText: result.Msg})
			}
			setTimeout(() => {
				message.success({content:'文章获取成功',key:'loading'})
				setLoading(false)
			},1000)
		})
	},[])


	return (
		<Fragment>
			{!isError.status ?
				<div className='explore-show-container'>
					<div className='explore-major-container'>
						<div className='explore-article-header'>
							<ExploreNav
								setArticleList={setArticleList}
								setListLoading={setLoading}
							/>
							<Button onClick={() => setColumn(e => !e)} icon={<UnorderedListOutlined />} type='text'/>
						</div>
						<div className={`explore-article-list clear-scroll ${column ? 'double-column' : 'single-column'}`}>
							<ExploreArticleList ArticleList={ArticleList} loading={loading}/>
						</div>
					</div>
					<div className="explore-minor-container">
						<ExploreMinorArea
							setArticleList={setArticleList}
							setListLoading={setLoading}
						/>
					</div>
				</div> : <ErrorPage errText={isError.errText}/>
			}
		</Fragment>
	);
}
