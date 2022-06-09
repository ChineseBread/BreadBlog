import React, {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Card, message , Segmented} from "antd";
import UserDataRequest from "@utils/RequestUtils/Data/UserDataRequest";
import getDefaultUrlValue from "@utils/PresentUtils/getDefaultUrlValue";
export default function UserNotice(){
    const navigator = useNavigate()
    const location = useLocation()
    const [loading,setLoading] = useState(true)
    const [NoticeList,setNoticeList] = useState<Notice[]>([])
    useEffect(() => {
       UserDataRequest.getUserNotice().then(result => {
           if (result.Ok){
               result.NoticeList && setNoticeList(result.NoticeList)
           }else{
               message.warn(result.Msg)
           }
           setLoading(false)
       })
    },[])
    const onChange = (value:any) => {
        navigator(`/user/notice/${value}`)
    }
    return(
        <div className='user-notice-container'>
            <Card title='消息中心' className='user-notice-card' loading={loading} extra={[
                <Segmented
                    key='choice'
                    onChange={onChange}
                    // @ts-ignore
                    defaultValue={getDefaultUrlValue(location.pathname,/info|warn|force/,'info')}
                    options={[
                        {
                            label: '通知',
                            value: 'info',
                        },
                        {
                            label: '重要',
                            value: 'force',
                        },
                        {
                            label: '警告',
                            value: 'warn',
                        }
                    ]}
                />
            ]}>
                <Outlet context={{NoticeList,pathname:location.pathname}}/>
            </Card>
        </div>
    )
}