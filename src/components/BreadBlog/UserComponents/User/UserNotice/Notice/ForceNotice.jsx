import {Fragment} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {Button, Result} from "antd";
import {NoticeDistributer} from "../Wrapper/NoticeDistributer";

export default function ForceNotice(props) {
	const navigator = useNavigate()
	const NoticeList = useOutletContext()
	const ArticleNoticeList = NoticeList?.length >= 1 ? NoticeList.filter(({Notice}) => Notice.type === 'force') : []
	return (
		<Fragment>
			{ArticleNoticeList.length >= 1 ?
				ArticleNoticeList.map(({NoticeId,Notice}) => {
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