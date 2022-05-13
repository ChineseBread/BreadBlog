import {doDataRequest} from "../request";
import CustomStorage from "../StorageUtils/CustomStorage";
import debounce from "../debounce";
import errMsg from "./errMsg";
class PublicDataRequest{
    //----------------------------//
    /**
     * @description 公开数据接口 不给token 用于其他用户访问该用户 不可访问其私人文章
     */
    static getUserArticle(userid:string,page:number):Promise<object>{
        return new Promise( async resolve => {
            try {
                let result = await doDataRequest({url:'article/user',data: {userid,page},method:'GET'})
                if (result?.articles){
                    resolve({Ok:true,ArticleList:result.articles,total:result.total})
                }else {
                    if (result?.articles == null) resolve({Ok:true,ArticleList:[],total:-1})
                    else resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getUserArticleCategory(userid:string):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'user/sorts',data:{userid},method:'GET'})
                if (result?.length){
                    resolve({Ok:true,ArticleCateGory:result})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static getUserArticleByCateGory(userid:string,page:number,sortname:string):Promise<object>{
        if (sortname === 'all') return this.getUserArticle(userid,page)
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:"user/sort",data:{page,userid,sortname},method:'GET'})
                if (Object.hasOwn(result,'articles')){
                    let articles = result.articles || []
                    resolve({Ok:true,ArticleList:articles,total:result.total})
                }else {
                    resolve({Ok: false, Msg: result?.Msg || '服务器异常请稍后'})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    /**
     * @description 文章展示页获取文章信息
     * @param articleid
     */
    static getArticleInfo(articleid:string):Promise<object>{
        return new Promise(async resolve => {
            try {
                let token = CustomStorage.getAccount().Token;
                let data = token ? {articleid,token} : {articleid}
                let result = await doDataRequest({url:'article/info',data,method:'GET'})
                if (result?.title){
                    resolve({Ok:true,ArticleInfo:result})
                }else {
                    resolve({Ok:false,Msg:result?.Msg || '获取文章信息失败'})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     * @description 简单文本搜索 用于搜索界面
     * @param keyword
     * @param page
     */
    static getArticleBySearchParams(keyword:string,page:number):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:"search/simple",data:{keyword,page},method:'GET'})
                if (result?.Results){
                    resolve({Ok:true,ArticleList:result.Results,total:result.Count})
                }else{
                    if (result?.Results == null) resolve({Ok:true,ArticleList:[],total:0})
                    else resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    /**
     * @description 根据选取最热分类获取文章
     * @param sortname 最热分类
     */
    static getArticleByCategory(sortname:string):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'hot/sort',data:{sortname},method:'GET'})
                if (result?.articles?.length){
                    resolve({Ok:true,ArticleList:result.articles})
                }else {
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    /**
     * @description 随机文章
     */
    private static getRandomArticle():Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'article/public/rand',data:{},method:'GET'})
                if (result?.length){
                    resolve({Ok:true,ArticleList:result})
                }else {
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     * @description 最热文章
     */
    private static getHottestArticle():Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'hot/articles',data:{},method:'GET'})
                if (result?.length){
                    resolve({Ok:true,ArticleList:result})
                }else {
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     *@description 最新的文章
     */
    private static getNewestArticle():Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'article/public/new',data:{},method:'GET'})
                if (result?.length){
                    resolve({Ok:true,ArticleList:result})
                }else {
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }

        })
    }
    /**
     * @description 最热的几个分类
     */
    static getHottestArticleCategory():Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'hot/sorts',data:{},method:'GET'})
                if (result?.HotSorts?.length){
                    resolve({Ok:true,HottestCateGory:result.HotSorts})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }

        })
    }

    static getHottestAuthor():Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'hot/authors',data:{},method:'GET'})
                if (result?.length){
                    resolve({Ok:true,AuthorList:result})
                }else {
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    private static _getHomePageData(category:string):Promise<object>{
        switch (category){
            // 待定
            case "newest":
                return this.getNewestArticle()
            case "hottest":
                return this.getHottestArticle()
            case "random":
                return this.getRandomArticle()
            // case "sort":
            //     return this.getHottestArticleCategory()
            default:
                //do nothing
                return new Promise(resolve => {
                    resolve({})
                })
        }
    }
    static getHomePageData = debounce(this._getHomePageData,500,true)

    /**
     * @description 获取文章评论 需要分页
     * @param articleid
     * @param page
     * @deprecated 没有返回isliked参数
     */
    static getArticleComment(articleid:string,page:number){
        return new Promise(async (resolve,reject) => {
            try {
                let token = CustomStorage.getAccount().Token;
                let data = token ? {articleid,page,token} : {articleid,page}
                let result = await doDataRequest({url:'article/comments',data,method:'GET'})
                if (result?.Comments?.length){
                    resolve({Ok:true,CommentsList:result.Comments,total:result.Count})
                    // resolve({Ok:true,CommentsList:result.Comments,CommentsId:result.CommentsId,total:result.Count})
                }else {
                    if (result?.Comments == null){
                        resolve({Ok:true,CommentsList:[],total:-1})
                    }else{
                        resolve({Ok:false})
                    }

                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @Response
     "CommentId": "1650286064382c4ddfcf60a778",
     "CommentData": {
        "isanonymous": false,
        "userid": "ce356f323920a2196108e9057a2bcf94",
        "comment": "4444",
        "createdtime": 1650286064,
        "fcomments": "F1650362405b8de63f142744ab5",
        "inrank": true,
        "like": 1,
        "username": "admin"
        },
        "FcommentCount": 1,
        "HotFCommentsData": null
     * @param commentsid
     * @param page
     */
    static getArticleComments(commentsid:string,page:number){
        return new Promise(async (resolve,reject) => {
            try {
                let token = CustomStorage.getAccount().Token;
                let data = token ? {commentsid,page,token} : {commentsid,page}
                let result = await doDataRequest({url:'comments/get',data,method:'GET'})
                // 没有数据就给commentsid和空数组
                if (result?.CommentsData){
                    resolve({Ok:true,CommentsList:result.CommentsData,total:result.TotalCount})
                }else {
                    if (result?.CommentsData === null) resolve({Ok: true, total: 0, CommentsList: []})
                    else resolve({Ok: false, Msg: result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    /**
     * @Response
     "fcommentid": "f1650177482673e82482b4ea5aa",
     "replydata": {
        "isanonymous": false,
        "userid": "ce356f323920a2196108e9057a2bcf94",
        "comment": "测试渲染",
        "createdtime": 1649944325,
        "username": "admin",
        "like": 1,
        "replyid": "f1649944325fd800ebf1ccd85c3"
    },
     "fcommentdata": {
        "isanonymous": false,
        "userid": "a3da316e135bbb098dcbde07b9019c4a",
        "comment": "你渲染个鸡儿",
        "createdtime": 1650177482,
        "reply": "f1649944325fd800ebf1ccd85c3",
        "username": "Chinesebread",
        "like": -3
    }
     * @description 传token则作为是否点赞的依据
     */
    static getArticleSubComment(page:number,commentsid:string,commentid:string):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let token = CustomStorage.getAccount().Token;
                let data = token ? {page,commentsid,commentid,token} : {page,commentsid,commentid}
                // let data = {page,commentsid,commentid}
                let result = await doDataRequest({url:'fcomment/list',data,method:'GET'})
                if (result?.Ok && result?.FComments?.fcomments){
                    let {FComments:{count,fcomments}} = result
                    resolve({Ok:true,SubComments:{total:count,CommentsList:fcomments}})
                    // resolve({Ok:true,CommentsList:result.FComments})
                }else{
                    if (result.FComments === null) resolve({Ok:true,SubComments:{total:0,CommentsList:[]}})
                    // if (result.FComments === null) resolve({Ok:true,CommentsList:[]})
                    else resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

}
export default PublicDataRequest;