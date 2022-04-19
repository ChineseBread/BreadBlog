/**
 * @name BreadBlog
 * @description 博客主界面
 * @version 1.0
 */
import React, {Suspense} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {Avatar, BackTop, Badge, Dropdown, Input, Layout, Menu} from 'antd';
import {ArrowUpOutlined, CommentOutlined, SearchOutlined} from "@ant-design/icons";

import ContentLoading from "./utilsComponents/Loading/ContentLoading";
import AvatarDropMenu from "./utilsComponents/AvatarDropMenu";

import CustomStorage from "../../utils/StorageUtils/CustomStorage";
import logo from "../../static/Logo.png";
import './less/index.less'

const { Header, Content } = Layout;

export default function BreadBlog(){
    const navigator = useNavigate()

    let handleSearch = ({value}) => {
        navigator(`/search?query=${value}`)
    }
    return(

        <Layout className="layout">
            <Header>
                <div className='logo_container' onClick={() => navigator('/')}>
                    <img src={logo} alt="Index"/>
                </div>
                <div className="header_nav_container">
                    <Input placeholder='今天想康康什么' maxLength={30} onPressEnter={({target}) => handleSearch(target)} prefix={<SearchOutlined />}/>
                    <div className='navigation'>
                        <Menu theme="light" mode="horizontal">
                            <Menu.Item key="1" onClick={() => navigator('/')}>首页</Menu.Item>
                            <Menu.Item key="2" onClick={() => navigator('/hotspot')}>热点</Menu.Item>
                            <Menu.Item key="3" onClick={() => navigator('/news')}>话题</Menu.Item>
                            <Menu.Item key="4" >
                                <a href="https://www.baidu.com">
                                    BreadNote
                                </a>
                            </Menu.Item>
                            <Menu.Item key="5" onClick={() => navigator('/about')}>关于</Menu.Item>
                        </Menu>
                    </div>
                    <div className='user_container'>
                        <Badge count={5} overflowCount={99} size='small'>
                            <CommentOutlined onClick={() => navigator('/comments')} />
                        </Badge>
                        <Dropdown overlay={AvatarDropMenu()} placement="bottomLeft" trigger={['click']} arrow>
                            <Avatar size={40} src={CustomStorage.getAvatarUrl()} />
                        </Dropdown>
                    </div>
                </div>
            </Header>
            <Content>
                <div className="site-layout-content" id='scrollableDiv'>
                    <Suspense fallback={<ContentLoading/>}>
                        <Outlet/>
                    </Suspense>
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