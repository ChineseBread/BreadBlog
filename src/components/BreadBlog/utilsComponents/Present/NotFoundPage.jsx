import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

export default function NotFoundPage({errText}) {
	const navigator = useNavigate()
	return (
		<div className='err-page-container'>
			<Result
				status="404"
				title="404"
				subTitle={errText}
				extra={<Button type="ghost" onClick={() => navigator('/')}>返回主页</Button>}
			/>
		</div>
	);
}
