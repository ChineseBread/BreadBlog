import {Fragment} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {Button, Result} from "antd";

export default function ForceNotice(props) {
	const navigator = useNavigate()
	const NoticeList = useOutletContext()
	const ArticleNoticeList = NoticeList?.length >= 1 ? NoticeList.filter(({Notice}) => Notice.type === 'force') : []
	return (
		<Fragment>

		</Fragment>
	);
}