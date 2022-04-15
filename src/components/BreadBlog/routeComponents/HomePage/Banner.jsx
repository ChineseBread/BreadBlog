import {useNavigate} from "react-router-dom";
import {Button} from "antd";
import {DownOutlined} from "@ant-design/icons";
import React from "react";
import CustomStorage from "../../../../utils/StorageUtils/CustomStorage";

function _HomePageBanner(){
	let navigator = useNavigate()
	let toBottom = () => {
		setTimeout(()=>{
			let element = document.getElementById('home-page')
			element.scrollIntoView({behavior:'smooth',block:'start'})
		},400)
	}
	return(
		<div className='home-page-banner'>
			<div className='banner-content'>
				<div className='text-container'>
					<div className='blog-title'><span>BreadBlog</span></div>
					<div className='blog-description'>简约 方便</div>
					<div>
						{CustomStorage.getAccount().User ?
							<Button type='ghost' onClick={() => navigator('/user/home')}>我的主页</Button> :
							<Button type='ghost' onClick={() => navigator('/account')}>点击登录</Button>
						}
					</div>
				</div>
			</div>
			<div>
				<DownOutlined onClick={toBottom}/>
			</div>
		</div>
	)
}
export default React.memo(_HomePageBanner,() => true)