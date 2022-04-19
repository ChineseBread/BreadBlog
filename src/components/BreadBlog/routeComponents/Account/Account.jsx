/**
 * @description 用户注册与登录
 */
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import background from '../../../../static/bg.jpg'
import CustomStorage from "../../../../utils/StorageUtils/CustomStorage";
import UserOperationRequest from "../../../../utils/RequestUtils/UserOperationRequest";
import "../../less/routeComponents/Account.less"

export default function Login(){
	const navigator = useNavigate()

	useEffect(() => {
		setTimeout(async () => {
			let check = await CustomStorage.checkAccount()
			if (check.Ok){
				message.success('您已经登录!')
				navigator(-1)
			}
		},500)
	},[])

	let [userInfo,setUserInfo] = useState({username:'', password:''})
	let [active,setActive] = useState("login")

	let changeState = state => {
		return () => {
			setActive(state)
			setUserInfo({username:'',password:''})
		}
	}

	let handleForm = () =>{
		return async () => {

			let {username,password} = userInfo
			// console.log(location)


			if (!(username && password)){
				message.warn("请输入用户名和密码")
				return;
			}
			let result;
			message.loading({content:'请稍后...',key:'loading',duration:10})

			switch (active){
				case "login" :
					result = await UserOperationRequest.doLogin(username,password)
					if (result?.Ok){
						message.success({content:'登录成功!',key:'loading'})
						navigator(-1)
					}else {
						message.error({content:result.Msg,key:'loading'})
					}
					break;
				case "register" :
					result = await UserOperationRequest.doRegister(username,password)
					if (result?.Ok){
						message.success({content:"注册成功!",key:'loading'})
						navigator(-1)
					}else {
						message.error({content:result.Msg,key:'loading'})
					}
					break;
			}

		}

	}
	return(
		<div className="User_Container">
			<div className="container">
				<img src={background}/>
				<div className="panel">
					<div className="content login">
						<div className="switch">
							<span onClick={changeState('login')} className={`${(active === "login" && "active") || ""}`}>登陆</span>
							<span>/</span>
							<span onClick={changeState('register')} className={`${(active === "register" && "active") || ""}`}>注册</span>
						</div>
						<div className='form'>
							<div>
								<div className="input">
									<input maxLength={20} type="text" onKeyPress={({code}) => code === 'Enter' && handleForm()()} value={userInfo.username} className={`${(userInfo.username && "hasValue") || ""}`} onChange={({target:{value}}) => setUserInfo({...userInfo,username:value}) } />
									<label>用户名</label>
								</div>
								<div className="input">
									<input maxLength={20} type="password" onKeyPress={({code}) => code === 'Enter' && handleForm()()}  value={userInfo.password} className={`${(userInfo.password && "hasValue") || ""}`} onChange={({target:{value}})=> setUserInfo({...userInfo,password:value})}/>
									<label>密码</label>
								</div>
							</div>
							<button type="button" onClick={handleForm()}>{(active === "login" && "登录") || "注册"}</button>
							<button type="button" onClick={() => navigator('/')}>回到主页</button>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}