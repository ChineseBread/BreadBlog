import React, {useState} from "react";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
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
export default function UploadAvatar({token}){

	const [loading,setLoading] = useState(false)
	const [imageUrl,setUrl] = useState('')

	const handleChange = info => {
		if (info.file.status === 'uploading') {
			setLoading(true)
			return
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			if (info.file.response.Ok){
				message.success('修改头像成功')
			}else{
				message.warn('上传失败')
			}
			getBase64(info.file.originFileObj, imageUrl =>{
					setUrl(imageUrl)
					setLoading(false)
				}
			);
		}
	}

	return(
		<Upload
			name="logo"
			listType="picture-card"
			className="avatar-uploader"
			showUploadList={false}
			action={`/api/upload/logo/${token}`}
			beforeUpload={beforeUpload}
			onChange={handleChange}
		>
			{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> :
			<div>
				{loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}>点击上传头像</div>
			</div>
			}
		</Upload>
	)
}