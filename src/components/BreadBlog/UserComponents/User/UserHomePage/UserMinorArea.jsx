import React, {Fragment} from "react";
import TimeShow from "../../../utilsComponents/TimeShow";
import {EditOutlined, StarOutlined} from "@ant-design/icons";
import {Card, Tag} from "antd";
import {nanoid} from "nanoid";
import {useNavigate} from "react-router-dom";

function UserMinorArea({ArticleCategoryList,changeCategory}) {
	const navigator = useNavigate()
	return (
		<Fragment>
			<div className='user-minor-card'>
				<div className='minor-card-content-container'>
					<TimeShow actions={[
						<div onClick={() => navigator('/user/collections/show')}>
							<StarOutlined key='subscribe' style={{marginRight:'15px'}} />
							收藏夹
						</div>,
						<div onClick={() => navigator('/article/edit/md')}>
							<EditOutlined key="edit" style={{marginRight:'15px'}} />
							写文章
						</div>

					]}/>
				</div>
			</div>
			<div className='user-minor-card'>
				<div className='minor-card-content-container'>
					<Card title='文章分类'>
						<div className='tags-list-container'>
							{ArticleCategoryList.filter(category => category && category.trim()).map(category => {
								return(
									<Tag color='#85a5ff' key={nanoid()} onClick={changeCategory(category)}>{category}</Tag>
								)
							})}
						</div>
					</Card>
				</div>
			</div>
		</Fragment>
	);
}
export default React.memo(UserMinorArea,(prevProps, nextProps) => prevProps.ArticleCategoryList.length === nextProps.ArticleCategoryList.length)