// import {RequestUtils} from "./index";
import {doRequest} from "../request";
import CustomStorage from "../StorageUtils/CustomStorage";
import debounce from "../debounce";
const errMsg = '服务器异常请稍后'
class UserOperationRequest{
    /**
     * @description 心跳token
     */
    static beforeDoUserOperations():Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await CustomStorage.checkAccount();
                if (result?.Ok){
                    resolve({Ok:true})
                    CustomStorage.doHearBeat();
                }else{
                    resolve({Ok:false,Msg:result?.Msg})
                }
            }catch (e){
                resolve({Ok:false,Msg:'网络异常'})
            }
        })
    }
    private static _doUserOperation(user:string, pwd:string, url:string):Promise<object>{
        return new Promise(async (resolve) => {
            try {
                if (!user || !pwd) {
                    resolve({Ok:false})
                }else{
                    let result:any = await doRequest({url,data:{user,pwd},method:'GET'})
                    if (result?.User) {
                        CustomStorage.saveAccount({...result,user,pwd})
                        resolve({Ok:true})
                    } else {
                        resolve({Ok:false,Msg:result?.Msg || errMsg})
                    }
                }

            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    private static doUserOperation = debounce(this._doUserOperation,2000,true)

    private static _doModifyOperation(token:string,changeContent:any,url:string,type:string):Promise<object>{
        return new Promise(async resolve => {
            try {
                let result:any = await doRequest({url,data:{token,...changeContent},method:'GET'})
                if (result?.Ok){
                    CustomStorage.modifyAccount(changeContent,type)
                    resolve({OK:true})
                }else {
                    resolve({OK:false})
                }
            }catch (e){
                resolve({OK:false})
            }
        })
    }
    private static doModifyOperation = debounce(this._doModifyOperation,2000,true)

    private static doUserFavoriteOperation(url:string,data:object):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url,data,method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    private static doUserLikeOperation(url:string,data:object):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url,data,method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    private static doCommentOperation(url:string,data:object):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url,data,method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    private static doSubCommentOpreation(url:string,data:object):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url,data,method:'GET'})
                resolve({Ok:result?.Ok,Msg:result.Msg || errMsg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static doLogin(user: string, pwd: string): Promise<object> {
       return this.doUserOperation(user,pwd,'auth/login')
    }

    static doRegister(user: string, pwd: string): Promise<object> {
        return this.doUserOperation(user,pwd,"auth/register")
    }
    static doModifyUsePassWord(newpwd: string, oldpwd:string): Promise<object> {
        return this.doModifyOperation(CustomStorage.getAccount().Token,{newpwd,oldpwd},"user/changepwd","password")
    }

    static doModifyUserName(name: string): Promise<object> {
        return this.doModifyOperation(CustomStorage.getAccount().Token,{name},'user/changename','username')
    }

    /**
     * @description 收藏夹
     */
    static updateFav(favnames:string[],articleid:string):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                // let favnamesJSON = JSON.stringify(favnamesArr)
                // let result = await doRequest({url:'fav/update',data:{favnames:favnamesJSON.substring(1,favnamesJSON.length - 1),articleid,token:CustomStorage.getAccount().Token},method:'GET'})
                let result = await doRequest({url:'fav/update',data:{favnames:JSON.stringify(favnames),articleid,token:CustomStorage.getAccount().Token},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg || '服务器异常请稍后...'})
            }catch (e){
                resolve({Ok:false,Msg:'服务器异常请稍后...'})
            }
        })
    }
    static createFav(favname:string):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'fav/create',data:{token:CustomStorage.getAccount().Token,favname},method:'GET'})
                if (result?.Ok){
                    resolve({Ok:true,FavInfo:{favid:result?.FavId,info:result?.Info}})
                }else{
                    resolve({Ok:false,Msg:result?.Msg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    static deleteFav(favname:string):Promise<object>{
        return this.doUserFavoriteOperation('fav/remove', {favname,token:CustomStorage.getAccount().Token})
    }

    static subscribeArticle(favname:string,articleid:string):Promise<object>{
        return this.doUserFavoriteOperation('fav/add',{favname,articleid,token:CustomStorage.getAccount().Token})
    }

    static checkFav(articleid:string):Promise<object>{
        let token = CustomStorage.getAccount().Token;
        if (!token) return Promise.resolve({Ok:false})
        else return new Promise(async (resolve,reject) => {
                try {
                    let result = await doRequest({url:'fav/check',data:{token:CustomStorage.getAccount().Token,articleid},method:'GET'})
                    if (result?.Msg === '文章已收藏') resolve({Ok:true,isFav:true,Favs:result?.Favs || []})
                    else resolve({Ok:true,isFav:false})
                }catch (e){
                    resolve({Ok:false})
                }
            })

    }
    static unSubscribeArticle(articleid:string,favname:string):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'fav/del',data:{token:CustomStorage.getAccount().Token,articleid,favname},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg || errMsg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    /**
     * @description 文章点赞
     */
    static checkLike(articleid:string):Promise<object>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'尚未点赞'})
        else return this.doUserLikeOperation('like/article/check',{token,articleid})
    }

    static likeArticle(articleid:string):Promise<object>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return this.doUserLikeOperation('like/article/add',{token:CustomStorage.getAccount().Token,articleid})
    }

    static unlikeArticle(articleid:string):Promise<object>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return this.doUserLikeOperation('like/article/remove',{token:CustomStorage.getAccount().Token,articleid})

    }

    /**
     * @description 用户评论操作
     * @undetermined 用户评论成功需要给commentid
     */
    static sendComment(comment:string,articleid:string,anonymous:boolean):Promise<object>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'您尚未登录无法发送评论'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'comment/article',data:{comment,articleid,anonymous:anonymous ? 1 : -1,token},method:'POST'})
                if(result.Ok){
                    resolve({Ok:true,commentid:result.CommentId})
                }else{
                    resolve({Ok:false,Msg:result.Msg || errMsg})
                }
                //resolve({Ok:result?.Ok,Msg:result?.Msg || errMsg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static sendSubComment(comment:string,commentsid:string,commentid:string,anonymous:boolean):Promise<object>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'fcomment/push',data:{comment,commentid,commentsid,anonymous:anonymous ? 1 : -1,token},method:'POST'})
                if (result?.Ok){
                    let {FCommentData:{fcommentid,isanonymous,comment,createdtime,username,like}} = result
                    resolve({Ok:true,FComment:{fcommentid,fcommentdata:{isanonymous,comment,createdtime,username,like}}})
                }else{
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     *
     * @param commentsid
     * @param commentid
     * @param anonymous
     * @param comment
     * @param reply 回复对象的fcommentid
     */
    static sendSubCommentReply(commentsid:string,commentid:string,anonymous:boolean,comment:string,reply:string):Promise<object>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'fcomment/reply',data:{commentsid,commentid,anonymous:anonymous ? 1 : -1,comment,reply,token},method:"POST"})
                if (result?.Ok){
                    let {FCommentData:{fcommentid,isanonymous,comment,createdtime,username,like,reply}} = result
                    resolve({Ok:true,FComment:{fcommentid,fcommentdata:{isanonymous,comment,createdtime,username,like,reply}}})
                }else{
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static likeComment(commentsid:string,commentid:string):Promise<object>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return this.doCommentOperation('like/comment/add',{commentsid,commentid,token})
    }
    static unlikeComment(commentsid:string,commentid:string):Promise<object>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return this.doCommentOperation('like/comment/remove',{commentsid,commentid,token})
    }
    static checkComment(commentsid:string,commentid:string){
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return this.doCommentOperation('like/comment/check',{commentsid,commentid,token})
    }

    /**
     * @description 用户追评操作
     */
    static likeSubComment(commentsid:string,commentid:string,fcommentid:string):Promise<object>{
        console.log(fcommentid)
        let token = CustomStorage.getAccount().Token;
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return this.doSubCommentOpreation('like/fcomment/add',{token,commentsid,commentid,fcommentid})
    }
    static unlikeSubComment(commentsid:string,commentid:string,fcommentid:string):Promise<object>{
        let token = CustomStorage.getAccount().Token;
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return this.doSubCommentOpreation('like/fcomment/remove',{token,commentsid,commentid,fcommentid})
    }
    /**
     * @description 用户草稿箱
     */
    static addArticleDraft(title:string,content:string,type:'markdown' | 'common'):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:"draft/add",data:{title:title || '无标题',content:content || '无内容',type,token:CustomStorage.getAccount().Token},method:'GET'})
                resolve({Ok:result?.Ok,DraftId:result?.DraftId})
            }catch (e){
                resolve({Ok:false})
            }
        })
        // else return this.doUserArticleDraftOperation('draft/add',{title,content,type,token})
    }
    private static _updateArticleDraft(draftid:string,title:string,content:string,type:'markdown' | 'common'):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'draft/update',data:{draftid,title:title || '无标题',content:content || '无内容',type,token:CustomStorage.getAccount().Token},method:'GET'})
                resolve({Ok:result?.Ok})
            }catch (e){
                resolve({Ok:false})
            }
        })
        // else return this.doUserArticleDraftOperation('draft/update',{draftid,title,content,type,token})
    }
    static updateArticleDraft = debounce(this._updateArticleDraft,2000,false)
    /**
     * @description 用户草稿箱界面删除操作
     */
    static deleteDraft(draftid:string):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'draft/del',data:{token:CustomStorage.getAccount().Token,draftid},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

}
export default UserOperationRequest;