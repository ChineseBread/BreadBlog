import {lazy, useEffect,Suspense} from 'react';
import {BrowserRouter} from "react-router-dom";
import Particles from 'particlesjs/dist/particles.min'
import Loading from "./components/BreadBlog/utilsComponents/Loading/Loading";
import ParticleCanvas from "./components/BreadBlog/utilsComponents/Present/ParticleCanvas";
import './App.less';
import CustomStorage from "./utils/StorageUtils/CustomStorage";
/**
 * @version 1.0
 * @description 基于react开发的博客管理系统
 * @Author Chinesebread
 * @Server Watish
 */
const Index = lazy(() => import('./components/BreadBlog/index'))
function App() {
    useEffect(() => {
        Particles.init({
            selector: '.background',
            maxParticles: 70,
            connectParticles:true,
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
            <div className="App">
                <ParticleCanvas/>
                {/*<Loading/>*/}
                <Suspense fallback={<Loading/>} >
                    <Index/>
                </Suspense>
            </div>
        </BrowserRouter>

    );
}

export default App;
