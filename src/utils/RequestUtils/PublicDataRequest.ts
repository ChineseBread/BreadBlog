import {doDataRequest} from "../request";
import CustomStorage from "../StorageUtils/CustomStorage";
import debounce from "../debounce";

const errMsg = '服务器异常请稍后';
class PublicDataRequest{
    //----------------------------//
    /**
     * @description 公开数据接口 不给token
     */
    static getArticle(page:number):Promise<object>{
        return new Promise( async resolve => {
            try {
                let result = await doDataRequest({url:'article/user',data: {user:CustomStorage.getAccount().user,page},method:'GET'})
                if (result?.length){
                    resolve({Ok:true,ArticleList:result})
                }else {
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
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
                resolve({Ok:false})
            }
        })
    }
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
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
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
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
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
                if (result?.length){
                    resolve({Ok:true,HottestCateGory:result})
                }else {
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
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
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
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
    static getArticleComment(articleid:string){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'article/comments',data:{articleid},method:'GET'})
                if (result?.Comments?.length){
                    resolve({Ok:true,CommentsList:result.Comments,CommentsId:result.CommentsId})
                }else {
                    if (result?.Comments == null){
                        resolve({Ok:true,CommentsList:[]})
                    }else{
                        resolve({Ok:false})
                    }

                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getArticleSubComment(page:number,commentsid:string,commentid:string):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'fcomment/list',data:{page,commentsid,commentid},method:'GET'})
                if (result?.Ok && result?.FComments?.fcomments){
                    let {FComments:{count,fcomments}} = result
                    resolve({Ok:true,SubComments:{total:count,CommentsList:fcomments}})
                }else{
                    if (result.FComments === null) resolve({Ok:true,SubComments:{total:0,CommentsList:[]}})
                    else resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

}
export default PublicDataRequest;