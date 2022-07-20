import {doDataRequest, doRequest} from "../request";
import debounce from "../../debounce";
import errMsg from "../errMsg";

class PublicDataRequest{
    //----------------------------//
    /**
     * @description 获取用户信息
     * @param userid
     */
    static getUserInfo(userid:string):Promise<Result<{UserInfo:UserInfo}>>{

        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'user/info',data:{userid},method:'GET'})
                if (result?.name){
                    resolve({Ok:true,UserInfo:result})
                }else {
                    resolve({Ok:false,Msg:result.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }

        })
    }
    /**
     * @description 公开数据接口 不给token 用于其他用户访问该用户 不可访问其私人文章
     */
    static getUserArticle(userid:string,page:number):Promise<Result<{ArticleList:PublicArticle[],total:number}>>{
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
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     * @description 获取用户关注
     * @param userid
     */
    static getUserFollows(userid:string):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'follow/user',data:{userid},method:'GET'})
                if (result?.Ok){

                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     * @description 获取用户动态
     * @param userid 用户id
     */
    static getUserDynamics(userid:string):Promise<Result<{Dynamics:Dynamics[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'user/news/get',data:{userid,start:1,end:Date.now() / 1000},method:'GET'})
                if (result?.Ok && Object.hasOwn(result,'News')){
                    const dynamics = result.News || []
                    resolve({Ok:true,Dynamics:dynamics})
                }else {
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }
            catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static getUserArticleCategory(userid:string):Promise<Result<{ArticleCateGory:string[]}>>{
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
    static getUserArticleByCateGory(userid:string,page:number,sortname:string):Promise<Result<{ArticleList:PublicArticle[],total:number}>>{
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
     * @description 简单文本搜索 用于搜索界面
     * @param keyword
     * @param page
     */
    static getArticleBySearchParams(keyword:string,page:number):Promise<Result<{ArticleList:PublicArticle[],total:number}>>{
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
    static getArticleByCategory(sortname:string):Promise<Result<{ArticleList:PublicArticle[]}>>{
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
    private static getRandomArticle():Promise<Result<{ArticleList:PublicArticle[]}>>{
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
    private static getHottestArticle():Promise<Result<{ArticleList:PublicArticle[]}>>{
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
    private static getNewestArticle():Promise<Result<{ArticleList:PublicArticle[]}>>{
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
    static getHottestArticleCategory():Promise<Result<{HottestCateGory:string[]}>>{
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

    static getHottestAuthor():Promise<Result<{AuthorList:Author[]}>>{
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
            default:
                //do nothing
                return new Promise(resolve => {
                    resolve({})
                })
        }
    }
    static getHomePageData = debounce(this._getHomePageData,500,true)

    static getUserAvatarUrl(userid:string|undefined):string{
        return `/data/logo/${userid}`
    }
    static getUserBackgroundUrl(userid:string):string{
        return `/data/background/${userid}`
    }
}
export default PublicDataRequest;