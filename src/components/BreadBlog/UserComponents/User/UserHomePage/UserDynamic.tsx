import React from "react";
import UserDynamics from "@utilsComponents/User/UserDynamics/UserDynamics";
import CustomStorage from "@utils/StorageUtils/CustomStorage";

export default function UserDynamic() {
	const {UserID} = CustomStorage.getAccount()
	return (
		<UserDynamics userid={UserID}/>
	);
}
