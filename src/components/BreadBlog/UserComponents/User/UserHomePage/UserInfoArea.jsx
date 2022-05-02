import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Menu, Avatar, Upload, message} from 'antd';
import {EditOutlined, LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import UserLevel from "../../../utilsComponents/User/UserLevel";
import CustomStorage from "../../../../../utils/StorageUtils/CustomStorage";

function UserInfoArea({changeCategory}){
	const navigator = useNavigate()
	return(
		<div className='user-header-container'>
			<div className='user-avatar-container'>
				<UploadBackGround imgUrl={CustomStorage.getBackGroundUrl()}/>
				<Avatar src={CustomStorage.getAvatarUrl()}/>
			</div>
			<div className='user-info-container shangshou'>
				<UserLevel user={CustomStorage.getAccount().User}/>
				<Button type='text' shape='circle' icon={<EditOutlined/>} key="edit-user-info" onClick={() => navigator('/user/profile')}/>
			</div>
			<Menu theme="light" mode="horizontal" defaultSelectedKeys={'article'}>
				<Menu.Item key="all"  onClick={changeCategory('all')}>所有文章</Menu.Item>
				<Menu.Item key="private" onClick={changeCategory('private')}>私人文章</Menu.Item>
			</Menu>
		</div>
	)
}
function UploadBackGround({imgUrl}){

	const [url,setUrl] = useState(imgUrl)
	const [loading,setLoading] = useState(false)

	const beforeUpload = file => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('仅支持jpeg或png格式图片上传');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('图片大小需小于2MB');
		}
		return isJpgOrPng && isLt2M;
	}
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
