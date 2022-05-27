import {doDataRequest} from "../request";
import CustomStorage from "../../StorageUtils/CustomStorage";
import errMsg from "../errMsg";
class UserDataRequest {

    //---------------------------//
    static getUserArticle(page:number,sortname:string | undefined):Promise<Result<{ArticleList:UserArticle[],total:number}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let {Token:token,UserID:userid} = CustomStorage.getAccount()
                let result:any = await doDataRequest({url:'article/user',data:{userid,token,page},method:'GET'})
                if (result?.articles){
                    switch (sortname){
                        case "all":
                            resolve({Ok:true,ArticleList:result.articles,total:result.total})
                            break;
                        case "private":
                            //@ts-ignore
                            let privateArticleList = result.articles.filter(article => !article.ispublic)
                            resolve({Ok:true,ArticleList:privateArticleList,total:privateArticleList.length >= 1 ? result.total : -1})
                            break;
                        default:
                        resolve({Ok:true,ArticleList:result.articles,total:result.total})
                    }

                }else {
                    if (result?.articles == null) resolve({Ok:true,ArticleList:[],total:-1})
                    else resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getUserArticleInfo(articleid:string):Promise<Result<{ArticleInfo:UserArticleInfo}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'article/info',data:{articleid,token:CustomStorage.getAccount().Token},method:"GET"})
                if (result?.title){
                    resolve({Ok:true,ArticleInfo:result})
                }else {
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getUserArticleCategory():Promise<Result<{ArticleCateGory:string[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let {Token:token,UserID:userid} = CustomStorage.getAccount()
                let result = await doDataRequest({url:"user/sorts",data:{token,userid},method:'GET'})
                if (result?.length){
                    resolve({Ok:true,ArticleCateGory:result})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getUserArticleByCateGory(page:number,sortname:string):Promise<Result<{ArticleList:UserArticle[],total:number}>>{
        if (sortname === 'all' || sortname === 'private') return this.getUserArticle(page,sortname)
        return new Promise(async (resolve,reject) => {
            try {
                let {Token:token,UserID:userid} = CustomStorage.getAccount()
                let result = await doDataRequest({url:"user/sort",data:{token,userid,sortname,page},method:'GET'})
                if (Object.hasOwn(result,'articles')){
                    let articles = result.articles || []
                    resolve({Ok:true,ArticleList:articles,total:result.total})
                }else {
                    resolve({Ok: false, Msg: result?.Msg || '服务器异常请稍后'})
                }
            }catch (e){
                resolve({Ok:false,Msg:'服务器异常请稍后'})
            }
        })
    }

    static getUserFavorites():Promise<Result<{Favs:UserFavorite[]}>>{
        let token = CustomStorage.getAccount().Token;
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'fav/list',data:{token:CustomStorage.getAccount().Token},method:'GET'})
                if (result?.Ok){
                    resolve({Ok:true,Favs:result.Favs || []})
                }else{
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static getArticlesByFav(page:number,favname:string):Promise<Result<{ArticleList:UserArticle[],total:number}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'fav/get',data:{token:CustomStorage.getAccount().Token,page,favname},method:'GET'})
                if (result?.Articles){
                    resolve({Ok:true,ArticleList:result.Articles,total:result.Count})
                }else {
                    if (result?.Articles === null) resolve({Ok:true,ArticleList:[],total:-1})
                    else resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getUserDrafts(page:number):Promise<Result<{DraftsList:Draft[],total:number}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'draft/list',data:{token:CustomStorage.getAccount().Token,page},method:'GET'})
                if (result?.Data){
                    resolve({Ok:true,total:result?.Count,DraftsList:result?.Data})
                }else{
                    if (result?.Data === null) resolve({Ok:true,total:-1,DraftsList:[]})
                    else resolve({Ok:false,Msg:result?.Msg || '服务器异常请稍后'})
                }
            }catch (e){
                resolve({Ok:false,Msg:'服务器异常请稍后再试'})
            }
        })
    }
    static getUserTrash(page:number):Promise<Result<{TrashList:Trash[],total:number}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'trash/list/all',data:{token:CustomStorage.getAccount().Token,page},method:'GET'})
                if (result?.TrashData){
                    resolve({Ok:true,TrashList:result.TrashData,total:result.Count})
                }else{
                    if (result?.TrashData === null) resolve({Ok:true,TrashList:[],total:0})
                    else resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static getUserNotice():Promise<Result<{NoticeList:Notice[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:"notice/all",data:{token:CustomStorage.getAccount().Token},method:'GET'})
                if (Object.hasOwn(result,'Notices')){
                    let Notices = result.Notices || []
                    resolve({Ok:true,NoticeList:Notices})
                }else{
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static getUserFollows():Promise<Result<{Followings:UserFollow[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'follow/list',data:{token:CustomStorage.getAccount().Token},method:'GET'})
                if (result?.Ok && Object.hasOwn(result,'Followings')){
                    let follows = result.Followings || []
                    resolve({Ok:true,Followings:follows})
                }else {
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }

            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
}
export default UserDataRequest;