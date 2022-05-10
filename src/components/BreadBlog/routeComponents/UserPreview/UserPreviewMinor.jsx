import React, {useMemo} from "react";
import {Card, Tag} from "antd";
import {nanoid} from "nanoid";
import TimeShow from "../../utilsComponents/Present/TimeShow";
import {UnorderedListOutlined} from "@ant-design/icons";

export default function UserPreviewMinor({ArticleCategoryList,changeCategory}) {
	return (
		<div className='user-card-container'>
			<div className='user-minor-card box-shadow'>
				<div className='minor-card-content-container'>
					<TimeShow/>
				</div>
			</div>
			{useMemo(() => {
				return(
					<div className='user-minor-card box-shadow'>
						<div className='minor-card-content-container'>
							<Card title='文章分类'>
								<div className='tags-list-container'>
									<Tag icon={<UnorderedListOutlined />} onClick={changeCategory('all')}>全部文章</Tag>
									{ArticleCategoryList.map(category => {
										return(
											<Tag key={nanoid()} onClick={changeCategory(category)}>{category}</Tag>
										)
									})}
								</div>
							</Card>
						</div>
					</div>
				)
			},[ArticleCategoryList])}
		</div>
	);
}