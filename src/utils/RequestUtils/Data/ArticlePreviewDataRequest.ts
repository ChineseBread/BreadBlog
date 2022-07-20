import CustomStorage from "../../StorageUtils/CustomStorage";
import {doDataRequest} from "../request";
import errMsg from "../errMsg";

class ArticlePreviewDataRequest{
    /**
     * @description 文章展示页获取文章信息
     * @param articleid
     */
    static getArticleInfo(articleid:string):Promise<Result<{ArticleInfo:PreviewArticleInfo}>>{
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
     * @description 获取文章评论 需要分页
     * @param articleid
     * @param page
     * @deprecated 没有返回isliked参数
     */
    static getArticleComment(articleid:string,page:number):Promise<Result<{CommentsList:Comment[],total:number}>>{
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
     * @param commentsid
     * @param page
     */
    static getArticleComments(commentsid:string,page:number):Promise<Result<{CommentsList:PreviewCommentItem[],total:number}>>{
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
     * @description 传token则作为是否点赞的依据
     */
    static getArticleSubComment(page:number,commentsid:string,commentid:string):Promise<Result<{SubComments:{total:number,CommentsList:FCommentItem[]}}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let token = CustomStorage.getAccount().Token;
                let data = token ? {page,commentsid,commentid,token} : {page,commentsid,commentid}
                let result = await doDataRequest({url:'fcomment/list',data,method:'GET'})
                if (result?.Ok && Object.hasOwn(result.FComments,'fcomments')){
                    let count = result.FComments.count
                    let fcomments = result.FComments.fcomments || []
                    resolve({Ok:true,SubComments:{total:count,CommentsList:fcomments}})
                }else{
                    resolve({Ok:false,Msg:result?.Msg || errMsg})
                }
            }catch (e){
                resolve({Ok:false,Msg:errMsg})
            }
        })
    }
}
export default ArticlePreviewDataRequest