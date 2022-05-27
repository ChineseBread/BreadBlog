import {useNavigate, useOutletContext,Outlet} from "react-router-dom";
import {Fragment} from "react";
import {Tabs} from "antd";
import getDefaultUrlValue from "@utils/PresentUtils/getDefaultUrlValue";
const { TabPane } = Tabs;

export default function InfoNotice() {
	const navigator = useNavigate()
	const {NoticeList,pathname} = useOutletContext<{NoticeList:Notice[],pathname:string}>()
	const InfoNoticeList = (NoticeList || []).filter(({Notice}) => Notice.type === 'info')
	const handleChange = (key:any) => {
		navigator(`/user/notice/info/${key}`)
	}

	return (
		<Fragment>

			{/*// @ts-ignore*/}
			<Tabs defaultActiveKey={getDefaultUrlValue(pathname,/like|comment|follow/,'like')} onChange={handleChange}>
				<TabPane tab="点赞消息" key="like"/>
				<TabPane tab="评论消息" key="comment"/>
				<TabPane tab="关注消息" key="follow"/>
			</Tabs>
			<div className='info-notice-container'>
				<Outlet context={{NoticeList:InfoNoticeList}}/>
			</div>
		</Fragment>
	);
}
