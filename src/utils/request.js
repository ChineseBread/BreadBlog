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
            // data
            method,
            timeout:10000
        }).then(value => {
            resolve(value.data)
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

export {doRequest,doDataRequest}
