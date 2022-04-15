/**
 * @function 定义后端接口数据
 * @version 1.0
 * @Author Watish
 * @Author Chinesebread
 * @deprecated 该定义文件不作为utils约束规范,仅在开发初期作为参考
 */

/**
 * @description 用户登录接口
 */
export declare interface UserOperation{

    doLogin(user:string,pwd:string):Promise<T>,

    doRegister(user:string,pwd:string):Promise<T>,

    doModifyUserName(name:string):Promise<T>,

    doModifyUsePassWord(newpwd:string,oldpwd:string):Promise<T>,

}

/**
 * @description 博客文章操作
 */
export declare interface ArticleOperation{

    setArticleCategory(articleid:string,sortname:string):Promise<T>,

    modifyArticleCategory(articleid:string,sortname:string):Promise<T>,

    addArticleTag(articleid,tag:string):Promise<T>,

    removeArticleTag(articleid:string,tag:string):Promise<T>,

    createArticle(title:string,content:string,ispublic:1 | -1,isMarkdown: 1 | -1,sortname: string,customSortName:string | undefined,tags:string[]):Promise<T>

    updateArticle(title:string | undefined, content:string | undefined,ispublic:1 | -1 | undefined,articleid:string):Promise<T>

}
declare type account = {
    User:string,
    Token:string,
    UserID:string,
    user:string,
    pwd:string
}
export declare interface customStorageUtils{
    getAccount():account,
    saveAccount(account:account):void,
    modifyAccount(changeContent:any,type:string):void
    getDrafts():object,
    saveDrafts(drafts:string):void
}
