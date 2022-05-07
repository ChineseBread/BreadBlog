/**
 * @description 敏感评论提示
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import {useContext} from "react";
import moment from "moment/moment";
import {NoticeContext} from "./NoticeDistributer";
import {Avatar, Comment} from "antd";
import CustomStorage from "../../../../../../utils/StorageUtils/CustomStorage";
export default function SensComment() {
	const {title,time} = useContext(NoticeContext)
	return (
		<div className='sens-comment-container notice-item'>
			<Comment
				author={CustomStorage.getAccount().User}
				avatar={<Avatar src={CustomStorage.getAvatarUrl()} />}
				content={
					<>
						<p className='warn-content'>
							{`警告:${title}!`}
						</p>
						<p className='sens-comment-content'>
							{`您${moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')}时在文章下的评论包含敏感词,已被删除!`}
						</p>
					</>
				}
				datetime={
					<span>{moment().fromNow()}</span>
				}
			/>
		</div>
	);
}
