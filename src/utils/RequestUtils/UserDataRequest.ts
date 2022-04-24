import {doDataRequest} from "../request";
import CustomStorage from "../StorageUtils/CustomStorage";
const errMsg = '服务器异常请稍后'
class UserDataRequest {

    //---------------------------//
    static getUserArticle(page:number,sortname:string | undefined):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'article/user',data:{user:CustomStorage.getAccount().user,token:CustomStorage.getAccount().Token,page},method:'GET'})
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
    static getUserArticleInfo(articleid:string):Promise<object>{
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
    static getUserArticleCategory():Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:"user/sorts",data:{token:CustomStorage.getAccount().Token},method:'GET'})
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
    static getUserArticleByCateGory(page:number,sortname:string):Promise<object>{
        if (sortname === 'all' || sortname === 'private') return this.getUserArticle(page,sortname)
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:"user/sort",data:{token:CustomStorage.getAccount().Token,sortname},method:'GET'})
                if (result?.articles){
                    resolve({Ok:true,ArticleList:result.articles,total:result.total})
                }else {
                    if (result?.articles == null) resolve({Ok:true,ArticleList:[],total:-1})
                    resolve({Ok:false,Msg:result?.Msg || '服务器异常请稍后'})
                }
            }catch (e){
                resolve({Ok:false,Msg:'服务器异常请稍后'})
            }
        })
    }
    //------------------
    // static getUserInfo(userid:string){
    //
    //     return new Promise(async (resolve,reject) => {
    //         try {
    //             let user = await CustomStorage.getUserInfoByID(userid);
    //             if (user){
    //                 resolve({Ok:true,UserInfo:user})
    //             }else{
    //                 let result = await doDataRequest({url:'user/info',data:{userid},method:'GET'})
    //                 if (result?.name){
    //                     CustomStorage.addUserInfo(result).then(() => {
    //                         resolve({Ok:true,UserInfo:result})
    //                     })
    //                 }else {
    //                     resolve({Ok:false})
    //                 }
    //             }
    //
    //         }catch (e){
    //             resolve({Ok:false})
    //         }
    //
    //     })
    // }
    static getUserFavorites():Promise<object>{
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
    static getArticlesByFav(page:number,favname:string):Promise<object>{
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
    static getUserDrafts(page:number):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'draft/list',data:{token:CustomStorage.getAccount().Token,page},method:'GET'})
                if (result?.Data){
                    resolve({Ok:true,total:result?.Count,DraftsList:result?.Data})
                }else{
                    if (result?.Data === null) resolve({Ok:true,total:-1,DraftSList:[]})
                    else resolve({Ok:false,Msg:result?.Msg || '服务器异常请稍后'})
                }
            }catch (e){
                resolve({Ok:false,Msg:'服务器异常请稍后再试'})
            }
        })
    }
}
export default UserDataRequest;