import React from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM from "react-dom";
import App from './App';
import './index.css';
// import reportWebVitals from './reportWebVitals';
console.log('欢迎使用BreadBlog博客系统')
createRoot(document.getElementById('root')).render(<App/>)
// ReactDOM.render(
//     <App />,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
