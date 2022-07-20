/**
 * @name BreadBlog
 * @description 博客主界面
 * @version 1.0
 */
import React, {Suspense} from "react";
import {Outlet, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Avatar, BackTop, Dropdown, Input, Layout, Menu} from 'antd';
import {ArrowUpOutlined, SearchOutlined} from "@ant-design/icons";

import UserNoticeIcon from "./UserComponents/User/UserNotice/UserNoticeIcon";
import ContentLoading from "@utilsComponents/Loading/ContentLoading";
import AvatarDropMenu from "@utilsComponents/Present/AvatarDropMenu";

import CustomStorage from "@utils/StorageUtils/CustomStorage";
import logo from "../../static/Logo.png";

const { Header, Content } = Layout;

export default function BreadBlog(){
    const navigator = useNavigate()
    const [,setSearch] = useSearchParams()
    const location = useLocation()
    const handleSearch = ({value}:any) => {

        if (value){
            if (location.pathname !== '/search'){
                navigator(`/search?query=${value}`)
            }else{
                setSearch(`query=${value}`)
            }
        }
    }

    return(

        <Layout className="layout">
            <Header className='box-shadow'>
                <div className='logo_container' onClick={() => navigator('/')}>
                    <img src={logo} alt="Index"/>
                </div>
                <div className="header_nav_container">
                    <Input placeholder='今天想康康什么' maxLength={30} onPressEnter={({target}) => handleSearch(target)} prefix={<SearchOutlined />}/>
                    <div className='navigation'>
                        <Menu theme="light" mode="horizontal">
                            <Menu.Item key="1" onClick={() => navigator('/')}>首页</Menu.Item>
                            <Menu.Item key="4" onClick={() => navigator('/explore')}>
                                探索
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => navigator('/topic')}>话题</Menu.Item>
                            <Menu.Item key="5" onClick={() => navigator('/about')}>关于</Menu.Item>
                        </Menu>
                    </div>
                    <div className='user_container'>
                        <UserNoticeIcon/>
                        <Dropdown overlay={AvatarDropMenu()} placement="bottomLeft" trigger={['click']} arrow>
                            <Avatar src={CustomStorage.getAvatarUrl()} />
                        </Dropdown>
                    </div>
                </div>
            </Header>
            <Content>
                <div className="site-layout-content" >
                    <Suspense fallback={<ContentLoading/>}>
                        <Outlet/>
                    </Suspense>
                    {/*// @ts-ignore*/}
                    <BackTop target={() => document.getElementById('scrollableDiv')}>
                        <div>
                            <ArrowUpOutlined />
                        </div>
                    </BackTop>
                </div>
            </Content>
        </Layout>

    )
}