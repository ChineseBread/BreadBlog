import {useEffect,Suspense} from 'react';
import {BrowserRouter} from "react-router-dom";
import Loading from "./components/BreadBlog/utilsComponents/Loading/Loading";
import BreadBlogEntry from "./components/BreadBlog";
import CanvasInit from "./utils/PresentUtils/ParticlesUtils";
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
        CanvasInit()
    },[])
    // 假设用户刷新了当前页面,保留会话心跳
    useEffect(() => {
        CustomStorage.doHearBeat()
    },[])

    return (
        <BrowserRouter>
            <div className="App clear-scroll" id='scrollableDiv'>
                <Suspense fallback={<Loading/>} >
                    <BreadBlogEntry/>
                </Suspense>
            </div>
        </BrowserRouter>

    );
}

export default App;
