import axios from "axios";
import qs from 'qs'
/**
* @description type your own api url here all requests will be send by functions below
*/
function doRequest({url,data,method}){
    data = getQueryData(data)
    return new Promise((resolve, reject) => {
        axios.request({
            // url:`http://server.watish.xyz:5017/api/${url}?${data}`,
            url:`/api/${url}?${data}`,
            method,
            timeout:10000
        }).then(value => {
            resolve(value.data)
        },reason => {
            reject(reason)
        })
    })
}
function doDataRequest({url,data,method}){
    data = getQueryData(data)
    return new Promise((resolve, reject) => {
        axios.request({
            // url:`http://server.watish.xyz:5017/data/${url}?${data}`,
            url:`/data/${url}?${data}`,
            method,
            timeout:10000
        }).then(value => {
            resolve(value.data)
        },reason => {
            reject(reason)
        })
    })
}

/**
 * @description 上传图片使用的方法
 */
function doUploadRequest({url,FormData:{param,file}}){
    return new Promise((resolve,reject) => {
        const formdata = new FormData()
        formdata.append(param,file)
        axios.request({
            // url:`http://server.watish.xyz:5017/api/upload/${url}`,
            url:`/api/upload/${url}`,
            data:formdata,
            method:'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout:10000
        }).then(result => {
            resolve(result.data)
        },reason => {
            reject(reason)
        })
    })
}
function getQueryData(data) {
    return qs.stringify(data, {
        encoder: function (str, defaultEncoder, charset, type) {
            if (type === 'value' || type === 'key') return encodeURIComponent(str);
        }
    })
}
export {doRequest,doDataRequest,doUploadRequest}
