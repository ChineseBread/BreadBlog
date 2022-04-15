import {lazy, useEffect,Suspense} from 'react';
import {BrowserRouter} from "react-router-dom";
import Particles from 'particlesjs/dist/particles.min'
import Loading from "./components/Loading/Loading";
import ParticleCanvas from "./components/BreadBlog/utilsComponents/ParticleCanvas";
// App中无样式设置
// import './App.less';
/**
 * @version 1.0
 * @description 基于react开发的博客管理系统
 * @Author Chinesebread
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
