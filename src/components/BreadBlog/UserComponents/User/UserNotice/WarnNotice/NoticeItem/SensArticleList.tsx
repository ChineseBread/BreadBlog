import {useNavigate, useOutletContext} from "react-router-dom";
import {Avatar, Comment} from "antd";
import EmptyNotice from "../../EmptyNotice";
import CustomStorage from "@utils/StorageUtils/CustomStorage";
import {getTimeFromNow} from "@utils/PresentUtils/TimeUtils";

export default function SensArticleList() {
	const {NoticeList} = useOutletContext<{NoticeList:Notice[]}>()
	const list = NoticeList.filter(({Notice}) => Notice.theme === 'SensArticle')
	return (
		<div className='article-warn-container'>
			{list.length >= 1 ? list.map(({NoticeId,Notice}) => {
				return <SensArticle key={NoticeId} Notice={Notice}/>
			}) : <EmptyNotice/>}
		</div>
	);
}
	function SensArticle({Notice:{time,data:{ArticleId}}}:any){
	const navigator = useNavigate()
	const checkArticle = () => {
		navigator(`/post?articleid=${ArticleId}`)
	}
	return (
		<div className='article-info-item' >
			<Comment
				author={CustomStorage.getAccount().User}
				avatar={<Avatar src={CustomStorage.getAvatarUrl()} />}
				content={
					<p>
						您ID为<span className='article-name' onClick={checkArticle}>{ArticleId}</span>的文章存在敏感言论,已经更改为私人文章
					</p>
				}
				datetime={
					<span>{getTimeFromNow(time)}</span>
				}
			/>
		</div>
	)
}
