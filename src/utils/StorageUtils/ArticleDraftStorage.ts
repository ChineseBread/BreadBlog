import UserOperationRequest from "../RequestUtils/UserOperationRequest";

class ArticleDraftStorage{
    static draftid:string = ''

    static async createArticleDraft(title:string,content:string,type:'markdown' | 'common'){
        let result:any = await UserOperationRequest.addArticleDraft(title,content,type)
        if (result?.Ok) ArticleDraftStorage.draftid = result.DraftId;
    }
    static saveArticleDraftID(draftid:string){
        ArticleDraftStorage.draftid = draftid
    }
    static updateArticleDraft(title:string,content:string,type:'markdown' | 'common'){
        if (ArticleDraftStorage.draftid) UserOperationRequest.updateArticleDraft(ArticleDraftStorage.draftid,title,content,type)
    }
}
export default ArticleDraftStorage