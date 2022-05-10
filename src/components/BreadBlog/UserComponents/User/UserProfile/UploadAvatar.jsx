import React, {useState} from "react";
import { Upload, message } from 'antd';
import ImgCrop from "antd-img-crop";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {beforeUpload, getBase64} from "../../../../../utils/ImgUploadUtil";

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
		<ImgCrop rotate quality={1} modalOk='确认上传' modalCancel='取消' modalTitle='裁剪图片'>
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
		</ImgCrop>

	)
}