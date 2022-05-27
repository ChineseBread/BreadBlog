import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button, message} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import ArticleListArea from "@utilsComponents/Present/ArticleListArea";
import TimeShow from "@utilsComponents/Present/TimeShow";
import PublicDataRequest from "@utils/RequestUtils/Data/PublicDataRequest";

export default function Search(){
    const [search,] = useSearchParams()
    const navigator = useNavigate()
    const [ArticleListInfo,setArticleListInfo] = useState<ListInfo<{ArticleList:PublicArticle[]}>>({ArticleList: [],hasMore:false})
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        message.loading({content:'搜索中...',key:'loading'})
        setLoading( true)
        setPage(1)
        const query = search.get('query')
        query && PublicDataRequest.getArticleBySearchParams(query,1).then(result => {
            if (result.Ok){
                let {ArticleList = [],total = 0} = result
                setArticleListInfo({ArticleList,hasMore: ArticleList.length < total})
                message.success({content:'搜索成功',key:'loading'})
            }else{
                message.warn({content:result.Msg,key:'loading'})
            }
            setTimeout(() => {
                setLoading(false)
            },1000)
        })
        setLoading(false)

    },[search])
    const getMoreArticleList = () => {
        const query = search.get('query')
        query && PublicDataRequest.getArticleBySearchParams(query,page + 1).then(result => {
            if (result.Ok){
                let {total = 0,ArticleList = []} = result
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
            <div className='article-list-container single-column'>
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