import UserOperationRequest from "../RequestUtils/UserOperationRequest";
import debounce from "../debounce";

class ArticleDraftStorage{

    static draftid:string = ''

    private static async _createArticleDraft(title:string,content:string,type:'markdown' | 'common'){
        let result:any = await UserOperationRequest.addArticleDraft(title,content,type)
        if (result?.Ok) ArticleDraftStorage.draftid = result.DraftId;
    }
    static createArticleDraft = debounce(this._createArticleDraft,2000,true)

    static saveArticleDraftID(draftid:string){
        ArticleDraftStorage.draftid = draftid
    }
    static updateArticleDraft(title:string,content:string,type:'markdown' | 'common'){
        if (ArticleDraftStorage.draftid) UserOperationRequest.updateArticleDraft(ArticleDraftStorage.draftid,title,content,type)
    }
}
export default ArticleDraftStorage