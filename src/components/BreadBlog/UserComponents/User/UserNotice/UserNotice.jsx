import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {Card, message , Segmented, Skeleton} from "antd";
import {BellOutlined, ExclamationCircleOutlined, WarningOutlined} from "@ant-design/icons";
import UserDataRequest from "../../../../../utils/RequestUtils/UserDataRequest";
export default function UserNotice(){
    const navigator = useNavigate()
    const [loading,setLoading] = useState(true)
    const [NoticeList,setNoticeList] = useState([])
    useEffect(() => {
       UserDataRequest.getUserNotice().then(result => {
           if (result.Ok){
               setNoticeList(result.NoticeList)
           }else{
               message.warn(result.Msg)
           }
           setLoading(false)
       })
    },[])
    const onChange = value => {
        navigator(`/user/notice/${value}`)
    }
    return(
        <div className='user-notice-container'>
            <Card title='通知消息' className='user-notice-card' extra={[
                <Segmented
                    key='choice'
                    onChange={onChange}
                    options={[
                        {
                            label: '通知',
                            value: 'info',
                            icon: <BellOutlined />,
                        },
                        {
                            label: '重要',
                            value: 'force',
                            icon: <ExclamationCircleOutlined/>,
                        },
                        {
                            label: '警告',
                            value: 'warn',
                            icon: <WarningOutlined />,
                        }
                    ]}
                />
            ]}>
                <Skeleton loading={loading}>
                    <Outlet context={NoticeList}/>
                </Skeleton>
            </Card>
        </div>
    )
}