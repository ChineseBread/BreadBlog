import {useNavigate, useOutletContext} from "react-router-dom";
import {Fragment} from "react";
import {Button, Result} from "antd";
import {NoticeDistributer} from "../Wrapper/NoticeDistributer";

export default function WarnNotice(props) {
	const navigator = useNavigate()
	const NoticeList = useOutletContext()
	const WarnNoticeList = NoticeList?.length >= 1 ? NoticeList.filter(({Notice}) => Notice.type === 'warn') : []
	return (
		<Fragment>
			{WarnNoticeList.length >= 1 ?
				WarnNoticeList.map(({NoticeId,Notice}) => {
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