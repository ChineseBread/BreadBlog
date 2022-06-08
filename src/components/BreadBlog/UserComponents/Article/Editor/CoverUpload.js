import React, {useState} from "react";
import {Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import {beforeUpload, getBase64} from "@utils/PresentUtils/ImgUploadUtil";

function CoverUpload({setFile}){

	const [imageUrl,setUrl] = useState('')

	const handleChange = info => {
		getBase64(info.file.originFileObj, imageUrl =>{
				setUrl(imageUrl)
				setFile(info.file.originFileObj)
			}
		);
	}
	return(
		<div className='cover-upload-container'>
			<div className='cover-upload-advice'>
				建议上传大小200 * 123px
			</div>
			<div className='cover-upload'>
				<ImgCrop rotate aspect={200 / 123} quality={1} modalOk='确认上传' modalCancel='取消' modalTitle='裁剪图片'>
					<Upload
						name="logo"
						listType="picture-card"
						className="cover-upload-picture"
						showUploadList={false}
						beforeUpload={beforeUpload}
						onChange={handleChange}
					>
						{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> :
							<div>
								<UploadOutlined/>
								上传封面
							</div>
						}
					</Upload>
				</ImgCrop>
			</div>
		</div>

	)

}
export default CoverUpload