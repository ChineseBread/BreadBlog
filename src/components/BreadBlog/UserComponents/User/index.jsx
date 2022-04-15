import React, {Fragment, useEffect, Suspense, useState} from "react";
import {message} from "antd";
import {Outlet,useNavigate} from "react-router-dom";
import CustomStorage from "../../../../utils/StorageUtils/CustomStorage";
import ContentLoading from "../../../Loading/ContentLoading";
import UserOperationRequest from "../../../../utils/RequestUtils/UserOperationRequest";
export default function UserComponentsRouter(props) {
	const navigator = useNavigate()
	// const location = useLocation()
	// const [isPending,startTransition] = useTransition()
	// const [startTransition,isPending] = useTransition()
	const [pending,setPending] = useState(true)
	useEffect(() => {
		UserOperationRequest.beforeDoUserOperations().then(result => {
				if (!result?.Ok){
					message.warn(result.Msg)
					navigator('/account')
				}else{
					setPending(false)
				}
		})
		// startTransition(async () => {
		// 	let result = await UserOperationRequest.beforeDoUserOperations()
		// 	if (!result?.Ok){
		// 		message.warn(result.Msg)
		// 		navigator('/account')
		// 	}
		// })
		return () => CustomStorage.stopHearBeat()
	},[])
	return (
		<Fragment>
			<Suspense fallback={<ContentLoading/>}>
				{!pending ? <Outlet/> : <ContentLoading/>}
			</Suspense>
		</Fragment>
	);
}
