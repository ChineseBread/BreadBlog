// 图片上传使用的utils
import {message} from "antd";

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
export {getBase64,beforeUpload}