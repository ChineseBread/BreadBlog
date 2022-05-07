import {useEffect,Suspense} from 'react';
import {BrowserRouter} from "react-router-dom";
import Particles from 'particlesjs/dist/particles.min'
import Loading from "./components/BreadBlog/utilsComponents/Loading/Loading";
import BreadBlogEntry from "./components/BreadBlog";
import CustomStorage from "./utils/StorageUtils/CustomStorage";
import './App.less';
/**
 * @version 1.0
 * @description 基于react开发的博客管理系统
 * @Author Chinesebread
 * @Server Watish
 */
function App() {
    useEffect(() => {
        const width = document.documentElement.clientWidth
        const scale = Math.round(width / 1400)
        const maxParticles = width < 2500 ? (scale > 0 ? scale * 70 : 100) : 0

        Particles.init({
            selector: '#background',
            maxParticles,
            connectParticles:width >= 1000,
            minDistance: 200,
            speed:0.3,
            color:'#434343'
        });

    },[])
    // 假设用户刷新了当前页面,保留会话心跳
    useEffect(() => {
        CustomStorage.doHearBeat()
    },[])

    return (
        <BrowserRouter>
            <div className="App" id='scrollableDiv'>
                <Suspense fallback={<Loading/>} >
                    <BreadBlogEntry/>
                </Suspense>
            </div>
        </BrowserRouter>

    );
}

export default App;
