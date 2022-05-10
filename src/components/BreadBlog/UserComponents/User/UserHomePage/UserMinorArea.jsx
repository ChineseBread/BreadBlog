import React, {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {Card, Tag} from "antd";
import {EditOutlined, FolderOpenOutlined, StarOutlined} from "@ant-design/icons";
import {nanoid} from "nanoid";
import TimeShow from "../../../utilsComponents/Present/TimeShow";

export default function UserMinorArea({CategoryList,changeCategory}) {
	const navigator = useNavigate()
	return (
		<div className='user-card-container'>
			<div className='user-minor-card box-shadow'>
				<div className='minor-card-content-container'>
					<TimeShow actions={[
						<div className='user-actions' onClick={() => navigator('/user/collections/show')}>
							<StarOutlined key='subscribe' style={{marginRight:'15px'}} />
							收藏夹
						</div>,
						<div className='user-actions' onClick={() => navigator('/article/edit/md')}>
							<EditOutlined key="edit" style={{marginRight:'15px'}} />
							写文章
						</div>

					]}/>
				</div>
			</div>
			{useMemo(() => {
				return(
					<div className='user-minor-card box-shadow'>
						<div className='minor-card-content-container'>
							<Card title='文章分类' actions={[<div onClick={() => navigator('/user/article/manage')}>
								<div className='user-actions'>
									<FolderOpenOutlined key='folder' style={{marginRight:'15px'}} />
									文章管理
								</div>
							</div>]}>
								<div className='tags-list-container'>
									{CategoryList.map(category => {
										return(
											<Tag key={nanoid()} onClick={changeCategory(category)}>{category}</Tag>
										)
									})}
								</div>
							</Card>
						</div>
					</div>
				)
			},[CategoryList])}
		</div>
	);
}