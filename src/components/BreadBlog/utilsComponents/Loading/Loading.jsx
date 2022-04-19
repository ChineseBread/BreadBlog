/**
 * @description Loading组件 所有异步加载全部使用
 */
import {useEffect, useState} from "react";
import Logo from '../../../../static/Logo.png'
import './Loading.less'
export default function Loading(){

    let [subTitle,setSubTitle] = useState("努力加载中...")
    useEffect(()=>{
        let timer = setTimeout(()=>{
            setSubTitle("如若加载时间过长请刷新重试...")
        },10000)
        return () => {
            clearTimeout(timer)
        }
    },[subTitle])

    return(
        <div className='loading_container'>
            <div>
                <img src={Logo}/>
                <span className='subtitle'>
					{subTitle}
				</span>
            </div>
        </div>
    )
}