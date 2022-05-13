import debounce from "../debounce";
import {doRequest} from "../request";
import CustomStorage from "./CustomStorage";

class ArticleDraftStorage{

    static draftid:string = ''

    private static async _createArticleDraft(title:string,content:string,type:'markdown' | 'common'){
        let result:any = await this.addArticleDraft(title,content,type)
        if (result?.Ok) this.saveArticleDraftID(result.DraftId);
    }

    private static _updateArticleDraft(title:string,content:string,type:'markdown' | 'common'):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'draft/update',data:{draftid:this.draftid,title:title || '无标题',content:content || '无内容',type,token:CustomStorage.getAccount().Token},method:'GET'})
                resolve({Ok:result?.Ok})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static saveArticleDraftID(draftid:string){
        this.draftid = draftid
    }

    /**
     * @description 添加用户草稿
     */
    private static addArticleDraft(title:string,content:string,type:'markdown' | 'common'):Promise<object>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:"draft/add",data:{title:title || '无标题',content:content || '无内容',type,token:CustomStorage.getAccount().Token},method:'GET'})
                resolve({Ok:result?.Ok,DraftId:result?.DraftId})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static createArticleDraft = debounce(this._createArticleDraft,2000,true)
    static updateArticleDraft = debounce(this._updateArticleDraft,2000,false)
}
export default ArticleDraftStorage
