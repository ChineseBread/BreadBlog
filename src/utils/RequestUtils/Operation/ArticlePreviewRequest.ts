import {doRequest} from "../request";
import errMsg from "../errMsg";
import CustomStorage from "../../StorageUtils/CustomStorage";

/**
 * @description 浏览文章界面的请求
 */
class ArticlePreviewRequest{

    private static doUserLikeOperation(url:string,articleid:string):Promise<Result<any>>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url,data:{token,articleid},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    private static doCommentOperation(url:string,data:object):Promise<Result<any>>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url,data:{...data,token},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    private static doSubCommentOpreation(url:string,data:object):Promise<Result<any>>{
        let token = CustomStorage.getAccount().Token;
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url,data:{...data,token},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result.Msg || errMsg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    /**
     * @description 更新对文章的收藏
     */
    static updateFav(favnames:string[],articleid:string):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'fav/update',data:{favnames:JSON.stringify(favnames),articleid,token:CustomStorage.getAccount().Token},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg || '服务器异常请稍后...'})
            }catch (e){
                resolve({Ok:false,Msg:'服务器异常请稍后...'})
            }
        })
    }

    /**
     * @description 检查是否收藏了某个文章
     * @param articleid
     */
    static checkFav<T>(articleid:string):Promise<Result<{isFav:boolean,Favs:T[]}>>{
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

    /**
     * @description 收藏文章
     * @param favname
     * @param articleid
     */
    static subscribeArticle(favname:string,articleid:string):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'fav/add',data:{favname,articleid,token:CustomStorage.getAccount().Token},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg || errMsg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     * @description 取消收藏文章
     * @param articleid
     * @param favname
     */
    static unsubscribeArticle(articleid:string,favname:string):Promise<Result<any>>{
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
    static checkLike(articleid:string):Promise<Result<any>>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'尚未点赞'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'like/article/check',data:{token,articleid},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg || '尚未点赞'})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static likeArticle(articleid:string):Promise<Result<any>>{
        return this.doUserLikeOperation('like/article/add',articleid)
    }

    static unlikeArticle(articleid:string):Promise<Result<any>>{
        return this.doUserLikeOperation('like/article/remove',articleid)
    }
    /**
     * @description 用户评论操作
     * @undetermined 用户评论成功需要给commentid
     */
    static sendComment(comment:string,articleid:string,anonymous:boolean):Promise<Result<{ CommentId:string }>>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'您尚未登录无法发送评论'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'comment/article',data:{comment,articleid,anonymous:anonymous ? 1 : -1,token},method:'POST'})
                if(result.Ok){
                    resolve({Ok:true,CommentId:result.CommentId})
                }else{
                    resolve({Ok:false,Msg:result.Msg || errMsg})
                }
                //resolve({Ok:result?.Ok,Msg:result?.Msg || errMsg})
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }

    /**
     * @description 回复评论
     * @param comment
     * @param commentsid
     * @param commentid
     * @param anonymous
     */
    static sendSubComment(comment:string,commentsid:string,commentid:string,anonymous:boolean):Promise<Result<{FComment:FCommentItem}>>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'fcomment/push',data:{comment,commentid,commentsid,anonymous:anonymous ? 1 : -1,token},method:'POST'})
                if (result?.Ok){
                    let {FCommentData:{fcommentid,isanonymous,comment,createdtime,username,like}} = result
                    resolve({Ok:true,FComment:{fcommentid,fcommentdata:{isanonymous,comment,createdtime,username,userid:CustomStorage.getAccount().UserID,like}}})
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
    static sendSubCommentReply(commentsid:string,commentid:string,anonymous:boolean,comment:string,reply:string):Promise<Result<{FComment:FCommentItem}>>{
        let token = CustomStorage.getAccount().Token
        if (!token) return Promise.resolve({Ok:false,Msg:'请先登录'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'fcomment/reply',data:{commentsid,commentid,anonymous:anonymous ? 1 : -1,comment,reply,token},method:"POST"})
                if (result?.Ok){
                    let {FCommentData,ReplyData} = result
                    resolve({Ok:true,FComment:{fcommentid:FCommentData.fcommentid,fcommentdata:FCommentData,replydata:ReplyData}})
                }else{
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
    static likeComment(commentsid:string,commentid:string):Promise<Result<any>>{
        return this.doCommentOperation('like/comment/add',{commentsid,commentid})
    }
    static unlikeComment(commentsid:string,commentid:string):Promise<Result<any>>{
        return this.doCommentOperation('like/comment/remove',{commentsid,commentid})
    }
    static checkComment(commentsid:string,commentid:string):Promise<Result<any>>{
        return this.doCommentOperation('like/comment/check',{commentsid,commentid})
    }

    /**
     * @description 用户追评操作
     */
    static likeSubComment(commentsid:string,commentid:string,fcommentid:string):Promise<Result<any>>{
        return this.doSubCommentOpreation('like/fcomment/add',{commentsid,commentid,fcommentid})
    }
    static unlikeSubComment(commentsid:string,commentid:string,fcommentid:string):Promise<Result<any>>{
        return this.doSubCommentOpreation('like/fcomment/remove',{commentsid,commentid,fcommentid})
    }
}
export default ArticlePreviewRequest