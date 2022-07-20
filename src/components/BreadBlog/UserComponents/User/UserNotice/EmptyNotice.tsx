import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {SmileOutlined} from "@ant-design/icons";

export default function EmptyNotice() {
	const navigator = useNavigate()
	return (
		<Result
			title="没有消息哦"
			icon={<SmileOutlined/>}
			extra={
				<Button type="primary" key="console" onClick={() => navigator('/user/home')}>
					返回用户页
				</Button>
			}

		/>

	);
}
