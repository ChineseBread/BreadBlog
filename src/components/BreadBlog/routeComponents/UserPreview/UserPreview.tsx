import React, {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";
import UserPreviewMinor from "./UserPreviewMinor";
import UserPreviewInfo from "./UserPreviewInfo";
import UserPreviewContext from "./UserPreviewContext";
import Loading from "@utilsComponents/Loading/Loading";
import ErrorPage from "@utilsComponents/Present/ErrorPage";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

export default function UserPreview() {
	const {userid} = useParams()
	const [isPending,setPending] = useState(true)
	const [isError,setError] = useState({status:false,errText:''})

	const [userinfo,setUserInfo] = useState<UserInfo>({name:'',userid:'',level:1})
	useEffect(() => {
		if (userid){
			PublicDataRequest.getUserInfo(userid).then(result => {
				if (result.Ok){
					let {UserInfo:{name,level} = {name:'',level:1}} = result
					setUserInfo({name,userid,level})
				}else{
					setError({status: true,errText: result.Msg || ''})
				}
				setPending(false)
			})
		}else{
			setError({status: true,errText:'用户ID为空'})
		}
	},[])
	return (
		<>
			{
				isPending ? <Loading/> : isError.status ? <ErrorPage errText={isError.errText}/> :
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
