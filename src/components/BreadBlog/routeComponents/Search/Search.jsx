import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import ArticleListArea from "../../utilsComponents/Present/ArticleListArea";
import PublicDataRequest from "../../../../utils/RequestUtils/PublicDataRequest";
import {message} from "antd";
import TimeShow from "../../utilsComponents/Present/TimeShow";

export default function Search(){
    const [search,setSearch] = useSearchParams()
    const [ArticleListInfo,setArticleListInfo] = useState({ArticleList: [],hasMore:true})
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        setPage(1)
        PublicDataRequest.getArticleBySearchParams(search.get('query'),1).then(result => {
            if (result.Ok){
                let {ArticleList,total} = result
                setArticleListInfo({ArticleList,hasMore: ArticleList.length < total})
            }else{
                message.warn(result.Msg)
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
            <div className="search-minor-container">
                <TimeShow/>
            </div>
        </div>
    )
}