import request from '../utils/http';
import Base64 from '../utils/base64';
import { OSS_URL, OSS_SECRET } from '../config'


export const GetOssToken = data => {
	return request('/token', data, 'POST', false, false, header)
}

export const GetOssUploadList = (data, loading = false) => {
	let header = {
		Authorization: Base64.decode(OSS_SECRET),
		'Content-Type': 'multipart/form-data'
	}
	return request(`${OSS_URL}/upload_history`, data, 'GET', false, loading, header)
}