import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, message, Result} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import UserPreviewContext from "./UserPreviewContext";
import UserLevel from "@utilsComponents/User/UserLevel";
import SubscribeBtn from "@utilsComponents/User/SubscribeBtn";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

export default function UserPreviewSubscribe() {
	const navigator = useNavigate()
	const {userid} = useContext(UserPreviewContext)
	const [follows,setFollows] = useState([])
	const [loading,setLoading] = useState(true)
	useEffect(() => {
		PublicDataRequest.getUserFollows(userid).then(result => {
			if (result.Ok){
				setFollows(result.Followings)
			}else {
				message.warn(result.Msg)
			}
			setLoading(false)
		})
	},[])

	const checkUser = (userid:string) => {
		return () => navigator(`/preview/${userid}`)
	}
	return (
		<div className='user-subscribe-list'>
			{loading ?
				<Card title="请稍后" loading={true}/> :
				follows.length >= 1 ? follows.map(({UserId,UserName,UserLevel:level}) => {
						return (
							<div key={UserId} className='user-subscribe-item'>
								<div className='author-list-item' onClick={checkUser(UserId)}>
									<Avatar src={PublicDataRequest.getUserAvatarUrl(UserId)}/>
									<UserLevel user={UserName} level={level}/>
								</div>
								<div>
									<SubscribeBtn userid={UserId} type='default'/>
								</div>
							</div>
						)
					}) :
					<Result
						icon={<SmileOutlined />}
						title="该用户没有关注"
					/>
			}
		</div>
	);
}

