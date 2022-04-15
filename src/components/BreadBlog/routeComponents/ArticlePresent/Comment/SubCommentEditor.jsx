import TextArea from "antd/es/input/TextArea";
import {Button, Switch} from "antd";
import React from "react";

export default function SubCommentEditor({username}) {
	const changeAnonymous = () => {

	}
	return (
		<div className='comment-editor'>
			<TextArea showCount maxLength={100} placeholder={`回复给${username || '匿名用户'}:`}/>
			<Button htmlType="submit" type="primary">
				回复
			</Button>
			<Switch defaultChecked={true} checkedChildren='公开' unCheckedChildren='私人' onChange={changeAnonymous}/>
		</div>
	)
}