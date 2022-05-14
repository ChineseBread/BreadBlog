import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, message, Skeleton} from "antd";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";
import UserLevel from "../../../utilsComponents/User/UserLevel";
import SubscribeBtn from "../../../utilsComponents/User/SubscribeBtn";
import PublicDataRequest from "../../../../../utils/RequestUtils/PublicDataRequest";

export default function UserSubscribe(props) {
	const navigator = useNavigate()
	const [follows,setFollows] = useState([])
	const [loading,setLoading] = useState(true)
	useEffect(() => {
		UserDataRequest.getUserFollows().then(result => {
			if (result.Ok){
				setFollows(result.Followings)
			}else {
				message.warn(result.Msg)
			}
			setLoading(false)
		})
	},[])
	const checkUser = userid => {
		return () => navigator(`/preview/${userid}`)
	}
	return (
		<div className='user-subscribe-list'>
			{loading ?
				<Card title="请稍后">
					<Skeleton active/>
				</Card> :
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
				<div className='user-subscribe-item'>该用户没有关注</div>
			}
		</div>
	);
}
