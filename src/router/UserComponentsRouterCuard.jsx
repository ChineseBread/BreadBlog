import {Fragment, useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {message} from "antd";
import Loading from "../components/BreadBlog/utilsComponents/Loading/Loading";
import CustomStorage from "../utils/StorageUtils/CustomStorage";
export default function UserComponentsRouterCuard(props) {

	const navigator = useNavigate()
	const [pending,setPending] = useState(true)
	useEffect(() => {
		CustomStorage.checkAccount().then(result => {
			if (!result.Ok){
				message.warn(result.Msg)
				navigator('/account')
			}else{
				setPending(false)
			}
		})
	},[])
	return (
		<Fragment>
			{!pending ? <Outlet/> : <Loading/>}
		</Fragment>
	);
}
