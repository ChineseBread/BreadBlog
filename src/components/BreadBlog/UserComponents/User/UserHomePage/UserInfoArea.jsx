import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Menu, Avatar, Upload, message} from 'antd';
import {EditOutlined, LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import UserLevel from "../../../utilsComponents/User/UserLevel";
import CustomStorage from "../../../../../utils/StorageUtils/CustomStorage";
import {beforeUpload} from "../../../../../utils/ImgUploadUtil";
const {User,Level} = CustomStorage.getAccount()
function UserInfoArea(){
	const navigator = useNavigate()
	const handleChange = key => {
		return () => {
			navigator(`/user/home/${key}`)
		}
	}
	return(
		<div className='user-header-container'>
			<div className='user-avatar-container'>
				<UploadBackGround imgUrl={CustomStorage.getBackGroundUrl()}/>
				<Avatar src={CustomStorage.getAvatarUrl()}/>
			</div>
			<div className='user-info-container shangshou'>
				<UserLevel user={User} level={Level}/>
				<Button type='text' shape='circle' icon={<EditOutlined/>} key="edit-user-info" onClick={() => navigator('/user/profile')}/>
			</div>
			<Menu theme="light" mode="horizontal" defaultSelectedKeys={['all']}>
				<Menu.Item key="all" onClick={handleChange('')}>文章</Menu.Item>
				<Menu.Item key="dynamic" onClick={handleChange('dynamic')}>动态</Menu.Item>
				<Menu.Item key="subscribe" onClick={handleChange('subscribe')}>关注</Menu.Item>
			</Menu>
		</div>
	)
}
function UploadBackGround({imgUrl}){

	const [url,setUrl] = useState(imgUrl)
	const [loading,setLoading] = useState(false)

	const handleChange = info => {
		if (info.file.status === 'uploading') {
			message.loading({content:'上传中',key:'uploading',duration:10})
			setLoading(true)
			return
		}
		if (info.file.status === 'done') {
			if (info.file.response.Ok){
				message.success({content:'上传完成',key:'uploading'})
				setUrl(info.file.response.Path)
			}else{
				message.warn({content:'上传失败',key:'uploading'})
			}
			setLoading(false)
		}
	}
	return(
		<div className='user-background'>
			<ImgCrop rotate aspect={7 / 2} quality={1} modalOk='确认上传' modalCancel='取消' modalTitle='裁剪图片'>
				<Upload
					name="background"
					showUploadList={false}
					action={`/api/upload/background/${CustomStorage.getAccount().Token}`}
					beforeUpload={beforeUpload}
					onChange={handleChange}
					maxCount={1}
				>
					<Button icon={loading ? <LoadingOutlined/> : <UploadOutlined />}/>
				</Upload>
			</ImgCrop>
			<img src={url}/>
		</div>

	)
}
export default React.memo(UserInfoArea,() => true)
