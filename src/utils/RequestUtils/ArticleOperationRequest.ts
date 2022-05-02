// import {ArticleOperation} from "./index";
import {doRequest} from "../request";
import CustomStorage from "../StorageUtils/CustomStorage";
import debounce from "../debounce";
import axios from "axios";

/**
 * @description 用户的文章操作 指在文章编辑见面的文章操作
 */
class ArticleOperationRequest{

    /**
     * @description 撰写文章 创建一个新的文章
     * @content 可以不传默认空串
     */

    private static _createArticle(title: string, content: string | undefined = "", ispublic: 1 | -1,isMarkdown: boolean, publicsort:string | undefined, sortname: string | undefined,tag:string[], description:string): Promise<object> {
        return new Promise(async resolve => {
            try {
                let result = await doRequest({url:isMarkdown ? 'edit/writemd' : 'edit/write',data:{token:CustomStorage.getAccount().Token,title,content,ispublic,sortname},method:'POST'})

                if (result?.Ok){
                    // console.log('创建文章',result)
                    let ArticleID = result.ArticleID;
                    if (tag?.length >= 1){
                        let TagStr = JSON.stringify(tag)
                        await this.addArticleTag(ArticleID,TagStr.substring(1,TagStr.length - 1))
                        //文章创建成功即为成功标签信息和描述信息不造成影响
                    }
                    if (description){
                        await this.setArticleDescription(ArticleID,description);
                    }
                    resolve({Ok:true})
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

    private static doArticleTagOperation(token: string, articleid: string, tags: string, url: string):Promise<object>{
        return new Promise(async resolve => {
            try {
                let result:any = await doRequest({url,data:{token,articleid,tags},method:'GET'})
                resolve({Ok:result?.Ok,Msg:result?.Msg})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static setArticleDescription(articleid:string,description:string):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'description/set',data:{token:CustomStorage.getAccount().Token,articleid,description},method:'POST'})
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
                const form = new FormData()
                form.append('image',file)
                let result = await axios.post(`/api/upload/attach/${CustomStorage.getAccount().Token}`,form,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (result.data.Ok){
                    resolve({Ok:true,path:result.data.Path})
                }else{
                    resolve({Ok:false,Msg:result.data?.Msg || '服务器异常请稍后'})
                }
            }catch (e){
                resolve({Ok:false,Msg:'服务器异常请稍后'})
            }
        })
    }
    static addArticleTag(articleid: string, tags: string): Promise<object> {
        return this.doArticleTagOperation(CustomStorage.getAccount().Token, articleid, tags,'tags/add');
    }

    static removeArticleTag(articleid: string, tag: string): Promise<object> {
        return this.doArticleTagOperation(CustomStorage.getAccount().Token, articleid, tag,'tag/del');
    }

    static modifyArticleCategory(articleid:string,sortname: string): Promise<object> {
        return this.doArticleCategoryOperation(CustomStorage.getAccount().Token, articleid, sortname,'sort/resort')
    }

    static setArticleCategory(articleid: string, sortname: string): Promise<object> {
        return this.doArticleCategoryOperation(CustomStorage.getAccount().Token, articleid, sortname,'sort/set')
    }

    static createArticle = debounce(this._createArticle,500,true)

    static updateArticle = debounce(this._updateArticle,500,true)
}

export default ArticleOperationRequest;
