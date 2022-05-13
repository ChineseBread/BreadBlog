import {doRequest, doUploadRequest} from "../request";
import CustomStorage from "../StorageUtils/CustomStorage";
import debounce from "../debounce";

/**
 * @description 用户的文章操作 指在文章编辑见面的文章操作
 */
class ArticleOperationRequest{

    /**
     * @description 撰写文章 创建一个新的文章
     * @content 可以不传默认空串
     */

    private static _createArticle(title: string, content: string | undefined = "", ispublic: 1 | -1,isMarkdown: boolean, publicsort:string | undefined, sortname: string | undefined,tag:string[], description:string,file:File | null): Promise<object> {
        return new Promise(async resolve => {
            try {
                let result = await doRequest({url:isMarkdown ? 'edit/writemd' : 'edit/write',data:{token:CustomStorage.getAccount().Token,title,content,ispublic,sortname},method:'POST'})

                if (result?.Ok){
                    let ArticleID = result.ArticleID;
                    Promise.all([
                        this.addArticleTags(ArticleID,tag),
                        this.setArticleDescription(ArticleID,description),
                        this.setArticleCover(ArticleID,file)
                    ]).then(result => {
                        resolve({Ok:result.length === result.filter(Ok => Ok).length})
                    })
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }

        })
    }
    /**
     * @optional title content ispublic
     * @required articleid
     */

    private static _updateArticle(title:string | undefined, content:string | undefined, ispublic:1 | -1 | undefined,isMarkdown:boolean,publicsort:string,sortname:string,tag:string[],description:string,articleid:string): Promise<object> {
        return new Promise(async resolve => {
            try {
                let url = isMarkdown ? 'edit/updatemd' : 'edit/update'
                Promise.all([
                    this.updateArticleContent(url,title,content,ispublic,articleid),
                    this.modifyArticleCategory(articleid,sortname),
                    this.setArticleDescription(articleid,description),
                ]).then(result =>{
                    resolve({Ok:result.length === result.filter(Ok => Ok).length})
                })
            }catch (e){
                resolve({Ok:false})
            }

        })
    }
    private static updateArticleContent(url:string,title:string | undefined, content:string | undefined, ispublic:1 | -1 | undefined,articleid:string):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url,data:{token:CustomStorage.getAccount().Token,title,content,ispublic,articleid},method:'POST'})
                resolve({Ok:result?.Ok});
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    private static setArticleDescription(articleid:string,description:string):Promise<object>{
        if (!description) return Promise.resolve({Ok:true})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'description/set',data:{token:CustomStorage.getAccount().Token,articleid,description},method:'POST'})
                resolve({Ok:result?.Ok})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    private static addArticleTags(articleid: string, tags: string[]): Promise<object> {
        if (tags.length < 1) return Promise.resolve({Ok:true})
        else return new Promise(async (resolve,reject) => {
            try {
                let tagStr = JSON.stringify(tags)
                let result:any = await doRequest({url:'tags/add',data:{token:CustomStorage.getAccount().Token,articleid,tags:tagStr.substring(1,tagStr.length - 1)},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 设置文章封面
     * @param articleid
     * @param file
     */
    private static setArticleCover(articleid:string,file:File | null):Promise<object>{
        if (!file) return Promise.resolve({Ok:true})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doUploadRequest({url:`article/cover/${articleid}/${CustomStorage.getAccount().Token}`,FormData:{param:'image',file}})
                resolve({Ok:result?.Ok})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    /**
     * @description 文章图片上传
     * @param file
     */
    static uploadImg(file:File):Promise<object>{
        if (file.size / 1024 / 1024 > 5) return Promise.resolve({Ok:false,Msg:'图片不能超过5MB'})
        else return new Promise(async (resolve,reject) => {
            try {
                let result = await doUploadRequest({url:`attach/${CustomStorage.getAccount().Token}`,FormData:{param:'image',file}})
                if (result?.Ok){
                    resolve({Ok:true,path:result.Path})
                }else {
                    resolve({Ok:false,Msg:result?.Msg || '服务器异常请稍后'})
                }
            }catch (e){
                resolve({Ok:false,Msg:'服务器异常请稍后'})
            }
        })
    }

    private static doArticleCategoryOperation(token: string, articleid: string, sortname: string, url: string):Promise<object>{
        return new Promise(async resolve => {
            try {
                let result:any = await doRequest({url,data:{token,articleid,sortname},method:'GET'})
                resolve({Ok:result?.Ok})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @deprecated
     * @private
     */
    private static doArticleTagOperation(token: string, articleid: string, tag: string, url: string):Promise<object>{
        return new Promise(async resolve => {
            try {
                let result:any = await doRequest({url,data:{token,articleid,tag},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @deprecated
     */
    private static addArticleTag(articleid: string, tag: string){
        return this.doArticleTagOperation(CustomStorage.getAccount().Token, articleid, tag,'tag/add');
    }
    /**
     * @deprecated
     * @param articleid
     * @param tag
     */
    private static removeArticleTag(articleid: string, tag: string): Promise<object> {
        return this.doArticleTagOperation(CustomStorage.getAccount().Token, articleid, tag,'tag/del');
    }

    private static modifyArticleCategory(articleid:string,sortname: string): Promise<object> {
        return this.doArticleCategoryOperation(CustomStorage.getAccount().Token, articleid, sortname,'sort/resort')
    }

    private static setArticleCategory(articleid: string, sortname: string): Promise<object> {
        return this.doArticleCategoryOperation(CustomStorage.getAccount().Token, articleid, sortname,'sort/set')
    }

    static createArticle = debounce(this._createArticle,500,true)

    static updateArticle = debounce(this._updateArticle,500,true)
}

export default ArticleOperationRequest;
