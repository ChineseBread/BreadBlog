import React, {useEffect, useState} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import UserPreviewMinor from "./UserPreviewMinor";
import UserPreviewInfo from "./UserPreviewInfo";
import UserPreviewContext from "./UserPreviewContext";
import Loading from "../../utilsComponents/Loading/Loading";
import NotFoundPage from "../../utilsComponents/Present/NotFoundPage";
import UserDataRequest from "../../../../utils/RequestUtils/UserDataRequest";

export default function UserPreview(props) {
	const {userid} = useParams()
	const navigator = useNavigate()
	const [isPending,setPending] = useState(true)
	const [isError,setError] = useState({status:false,errText:''})

	const [userinfo,setUserInfo] = useState({username:'',userid:''})
	useEffect(() => {
		UserDataRequest.getUserInfo(userid).then(result => {
			if (result.Ok){
				setUserInfo({username: result.UserInfo.name,userid})
			}else{
				setError({status: true,errText: result.Msg})
			}
			setPending(false)
		})
	},[])
	return (
		<>
			{
				isPending ? <Loading/> : isError.status ? <NotFoundPage errText={isError.errText}/> :
					<UserPreviewContext.Provider value={{...userinfo}}>
						<div className='user-home-container'>
							<div className='user-card-list-container single-column' >
								<UserPreviewInfo/>
								<Outlet/>
							</div>
							<div className='user-minor-container'>
								<UserPreviewMinor/>
							</div>
						</div>
					</UserPreviewContext.Provider>
			}
		</>

	);
}
