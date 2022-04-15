import {Fragment, useEffect, useState, useTransition} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import UserOperationRequest from "../../../../utils/RequestUtils/UserOperationRequest";
import {message} from "antd";
import CustomStorage from "../../../../utils/StorageUtils/CustomStorage";
import Loading from "../../../Loading/Loading";
export default function ArticleComponentsRouter(props) {

	const navigator = useNavigate()
	// const [isPending,startTransition] = useTransition()
	// const [startTransition,isPending] = useTransition()
	const [pending,setPending] = useState(true)
	useEffect( () => {
		UserOperationRequest.beforeDoUserOperations().then(result => {
			if (!result?.Ok){
				message.warn(result.Msg)
				navigator('/account')
			}else{
				setPending(false)
			}
		})
		// let result = await UserOperationRequest.beforeDoUserOperations()
		// if (!result?.Ok){
		// 	message.warn(result.Msg)
		// 	navigator('/account')
		// }
		return () => CustomStorage.stopHearBeat()
	},[])

	return (
		<Fragment>
			{!pending ? <Outlet/> : <Loading/>}
		</Fragment>
	);
}
