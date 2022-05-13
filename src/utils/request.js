import axios from "axios";
import qs from 'qs'
function doRequest({url,data,method}){
    data = getQueryData(data)
    return new Promise((resolve, reject) => {
        axios.request({
            url:`/api/${url}?${data}`,
            // data,
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
            url:`/data/${url}?${data}`,
            // data,
            // _data,
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
function getQueryData(data){
    return qs.stringify(data,{encoder:function (str, defaultEncoder, charset, type){
            if (type === 'value' || type === 'key') return encodeURIComponent(str);
        }})
}
/*function _multipleRequest(requestArr){
    let resultArr = requestArr.map(request => {
        return doRequest(request)
    })
    return Promise.all(requestArr)
}*/
//let debounceRequest = debounce(doRequest,500,true)

// let multipleRequest = debounce(_multipleRequest,500,true)
export {doRequest,doDataRequest,doUploadRequest}