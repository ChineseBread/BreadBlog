import {useNavigate, useOutletContext, Outlet} from "react-router-dom";
import {Tabs} from "antd";
import {Fragment} from "react";
import getDefaultUrlValue from "@utils/PresentUtils/getDefaultUrlValue";
const {TabPane} = Tabs
export default function WarnNotice() {
	const navigator = useNavigate()
	const {NoticeList,pathname} = useOutletContext<{NoticeList:Notice[],pathname:string}>()
	const WarnNoticeList = (NoticeList || []).filter(({Notice}) => Notice.type === 'warn')
	const handleChange = (key:any) => {
		navigator(`/user/notice/warn/${key}`)
	}

	return (
		<Fragment>
			{/*// @ts-ignore*/}
			<Tabs defaultActiveKey={getDefaultUrlValue(pathname,/article|comment/,'article')} onChange={handleChange}>
				<TabPane tab="文章" key="article"/>
				<TabPane tab="评论" key="comment"/>
			</Tabs>
			<div className='warn-notice-container'>
				<Outlet context={{NoticeList:WarnNoticeList}}/>
			</div>
		</Fragment>
	);
}