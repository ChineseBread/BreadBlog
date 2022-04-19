import {Fragment, useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {message} from "antd";
import Loading from "../components/BreadBlog/utilsComponents/Loading/Loading";
import CustomStorage from "../utils/StorageUtils/CustomStorage";
import UserOperationRequest from "../utils/RequestUtils/UserOperationRequest";
export default function UserComponentsRouterCuard(props) {

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

		return () => CustomStorage.stopHearBeat()
	},[])

	return (
		<Fragment>
			{!pending ? <Outlet/> : <Loading/>}
		</Fragment>
	);
}
