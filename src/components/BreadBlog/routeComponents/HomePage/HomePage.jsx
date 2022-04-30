import React, {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "antd";
import CustomStorage from "../../../../utils/StorageUtils/CustomStorage";
function HomePage(){
    const navigator = useNavigate()
    return(
        <Fragment>
            <div className='home-page-container'>
                <div className='home-page-banner'>
                    <div className='banner-content'>
                        <div className='text-container'>
                            <div className='blog-title'><span>BreadBlog</span></div>
                            <div className='blog-description'>简约 方便</div>
                            <div>
                                {CustomStorage.getAccount().User ?
                                    <Button type='ghost' onClick={() => navigator('/user/home')}>我的主页</Button> :
                                    <Button type='ghost' onClick={() => navigator('/account')}>点击登录</Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default React.memo(HomePage,() => true)