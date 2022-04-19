import React, {Fragment, useEffect, useState} from "react";
import {Card, message, Tag} from "antd";
import Banner from "./Banner";
import Nav from "./Nav";
import {nanoid} from "nanoid";
import ArticleListArea from "../../utilsComponents/ArticleListArea";
import TimeShow from "../../utilsComponents/TimeShow";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";

export default function HomePage(){
    useEffect(() => {
        message.loading({content:'获取文章中',key:"loading"})
        // 获取公共文章
        PublicDataRequest.getHomePageData("random").then(result => {
            if (result.Ok){
                setArticleListInfo(ListInfo => {
                    return {
                        ArticleList: result.ArticleList,
                        hasMore: false
                    }
                })
                message.success({content:'文章获取成功',key:'loading'})
            }else {
                message.warn({content:'获取文章失败',key:'loading'})
            }
        })
    },[])

    useEffect(() => {
        // 热门分类
        PublicDataRequest.getHottestArticleCategory().then(result =>{
            if (result?.Ok){
                setCateGoryList(result.HottestCateGory)
            }
        })
    },[])

    const [ArticleCategoryList,setCateGoryList] = useState([])
    const [ArticleListInfo,setArticleListInfo] = useState({ArticleList:[],hasMore:false})

    let changeCategory = ({key}) => {
        message.loading({content:'请稍后',key:'loading',duration:10})
        PublicDataRequest.getHomePageData(key).then(result => {
            if (result?.Ok){
                setArticleListInfo({ ArticleList: result.ArticleList, hasMore: false})
                message.success({content:'获取新文章',key:'loading'})
            }else {
                message.warn({content:'获取文章失败!',key:'loading'})
            }
        })
    }
    let handleClickTag = category => {
        return () => {
            PublicDataRequest.getArticleByCategory(category).then(result => {
                if (result?.Ok){
                    setArticleListInfo({ArticleList: result.ArticleList,hasMore: false})
                    message.success({content:'获取选中分类文章',key:'loading'})
                }else {
                    message.warn({content:'获取文章失败!',key:'loading'})
                }
            })
        }
    }
    return(
        <Fragment>
            <div className='home-page-container'>
                <Banner/>
                <div className='home-page-show-container' id='home-page'>
                    <div className='home-page-major-container'>
                        <div className='home-page-article-header'>
                            <Nav changeCategory={changeCategory}/>
                        </div>
                        <div className='home-page-article-list clear-scroll'>
                            <ArticleListArea ArticleListInfo={ArticleListInfo} loading={false}/>
                        </div>
                    </div>
                    <div className="home-page-minor-container">
                        <div className='home-page-card-item'>
                            <TimeShow/>
                        </div>
                        <div className='home-page-card-item'>
                            <Card title="今天想看什么?">
                                <div className='category-container clear-scroll'>
                                    {ArticleCategoryList.map(category =>{
                                        return(
                                           <Tag onClick={handleClickTag(category.sortname)} key={nanoid()}>{category.sortname} {category.count}</Tag>
                                        )
                                    })}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}