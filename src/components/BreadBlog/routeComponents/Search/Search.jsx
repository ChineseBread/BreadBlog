import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import ArticleListArea from "../../utilsComponents/Present/ArticleListArea";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";
import {Button, message} from "antd";
import TimeShow from "../../utilsComponents/Present/TimeShow";
import {ArrowLeftOutlined} from "@ant-design/icons";

export default function Search(){
    const [search,setSearch] = useSearchParams()
    const [ArticleListInfo,setArticleListInfo] = useState({ArticleList: [],hasMore:false})
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(true)
    const navigator = useNavigate();
    useEffect(() => {
        message.loading({content:'搜索中...',key:'loading'})
        setLoading(true)
        setPage(1)
        PublicDataRequest.getArticleBySearchParams(search.get('query'),1).then(result => {
            if (result.Ok){
                let {ArticleList,total} = result
                setArticleListInfo({ArticleList,hasMore: ArticleList.length < total})
                message.success({content:'搜索成功',key:'loading'})
            }else{
                message.warn({content:result.Msg,key:'loading'})
            }
            setLoading(false)
        })

    },[search])
    const getMoreArticleList = () => {
        PublicDataRequest.getArticleBySearchParams(search.get('query'),page + 1).then(result => {
            if (result.Ok){
                let {total,ArticleList} = result
                setPage(page => page + 1);
                setArticleListInfo(ArticleListInfo => {
                    return{
                        hasMore: ArticleListInfo.ArticleList.length + ArticleList.length < total,
                        ArticleList: [...ArticleListInfo.ArticleList,...ArticleList]
                    }
                })
            }
        })
    }
    return(
        <div className='search-article-container'>
            <div className='article-list-container' >
                <ArticleListArea
                    ArticleListInfo={ArticleListInfo}
                    loading={loading}
                    getMoreArticleList={getMoreArticleList}
                    scrollTarget='scrollableDiv'
                />
            </div>
            <div className="search-minor-container box-shadow">
                <TimeShow extra={[<Button onClick={() => navigator('/')} icon={<ArrowLeftOutlined/>}/>]}/>
            </div>
        </div>
    )
}