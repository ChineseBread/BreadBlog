import {useNavigate, useOutletContext} from "react-router-dom";
import {Fragment} from "react";
import {Button, Result} from "antd";
import {NoticeDistributer} from "../Wrapper/NoticeDistributer";

export default function InfoNotice(props) {
	const navigator = useNavigate()
	const NoticeList = useOutletContext()
	const InfoNoticeList = NoticeList?.length >= 1 ? NoticeList.filter(({Notice}) => Notice.type === 'info') : []
	return (
		<Fragment>
			{InfoNoticeList.length >= 1 ?
				InfoNoticeList.map(({NoticeId,Notice}) => {
					return(
						<NoticeDistributer key={NoticeId} Notice={Notice}/>
					)
				}) :
				<Result
					title="你当前没有消息"
					extra={
						<Button type="primary" key="back" onClick={() => navigator('/user/home')}>
							返回用户主页
						</Button>
					}
				/>
			}
		</Fragment>
	);
}
