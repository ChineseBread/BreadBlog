import {Menu, message} from "antd";
import React from "react";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

function _ExploreNav({setArticleList,setListLoading}:any){

	const changeCategory = ({key}:any) => {
		setListLoading(true)
		message.loading({content:'请稍后',key:'loading',duration:10})
		PublicDataRequest.getHomePageData(key).then(result => {
			if (result?.Ok){
				setArticleList(result.ArticleList)
			}else {
				message.warn({content:'获取文章失败!',key:'loading'})
			}
			setTimeout(() => {
				message.success({content:'获取新文章',key:'loading'})
				setListLoading(false)
			},1000)
		})
	}

	return(
		<Menu
			mode="horizontal"
			defaultSelectedKeys={['1']}
			onClick={changeCategory}
		>
			<Menu.Item key="random">随机</Menu.Item>
			<Menu.Item key="newest">最新</Menu.Item>
			<Menu.Item key="hottest">最热</Menu.Item>
		</Menu>
	)
}
export default React.memo(_ExploreNav,() => true)