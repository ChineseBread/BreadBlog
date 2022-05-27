import React from "react";
import UserInfoArea from "./UserInfoArea";
import UserMinorArea from "./UserMinorArea";
import {Outlet} from "react-router-dom";

/**
 * @description 用户主页
 */
export default function UserHomePage(){
	return(
		<div className='user-home-container'>
			<div className='user-card-list-container single-column' >
				<UserInfoArea/>
				<Outlet/>
			</div>
			<div className='user-minor-container'>
				<UserMinorArea/>
			</div>
		</div>
	)
}
