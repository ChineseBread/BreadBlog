import React, {useContext} from "react";
import UserPreviewContext from "./UserPreviewContext";
import UserDynamics from "@utilsComponents/User/UserDynamics/UserDynamics";

export default function UserPreviewDynamic() {
	const {userid} = useContext(UserPreviewContext)
	return (
		<UserDynamics userid={userid}/>
	);
}
