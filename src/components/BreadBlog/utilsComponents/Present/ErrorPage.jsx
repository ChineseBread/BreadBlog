import {Button, Result} from "antd";
import { useNavigate } from "react-router-dom";
import errMsg from "@utils/RequestUtils/errMsg";
export default function ErrorPage({errText}) {
	const navigator = useNavigate()
	return (
		<div className='err-page-container'>
			<Result
				status={errText === errMsg ? '500' : '404'}
				title={errText === errMsg ? "500" : "404"}
				subTitle={errText}
				extra={<Button type="ghost" onClick={() => navigator('/')}>返回主页</Button>}
			/>
		</div>
	);
}
