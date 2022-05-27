// UserDataRequest
/**
 * @Author Watish
 * @Author Chinesebread
 */
declare type UserArticle = Article
declare type UserArticleInfo = {tags:string[],content:string} & Article
declare type Draft = {
    DraftId:string,
    Versions:{
        VersionId:string,
        Data:{
            title:string,
            time:string,
            content:string,
            type:string
        }
    }[]
}
declare type Trash = {
    TrashId:string,
    DeletedTime:string,
    TrashData:Exclude<Article,{pv:number, likes:number, comments:number, cover:string | boolean}>
}
declare type Notice = {
    NoticeId:string,
    Notice:{
        title:string,
        type:'warn' | 'info' | 'force',
        theme:'SensCmt' | 'SensArticle'| 'NewCmt' |
              'NewFCmt' | 'NewLike' | 'HotArticle' | 'HotAuthor' | 'NewFans'
        time:string,
        data:SensCmt | SensFCmt | NewCmt | NewFCmt | NewLike
    }
}
declare type SensArticle = {
    ArticleId:string,
}
declare type SensCmt = {
    // SensCmt
    ArticleId:string,
    Title:string,
    CommentsId:string,
    CommentId:string
}
declare type SensFCmt = {
    // SensFCmt
    FCommentsId:string,
    FCommentId:string
}
declare type NewCmt = {
    // NewCmt
    ArticleId:string,
    Title:string,
    Anonymous:boolean,
    UserId:string,
    UserName:string,
    CommentId:string,
    CommentsId:string,
    Comment:string
}
declare type NewLike = {
    //NewLike
    Article:string,
    Title:string,
    UserId:string,
    UserName:string,
    Msg:string
}

declare type NewFCmt = {
    //NewFCmt
    FCommentId:string,
    CommentId:string,
    CommentsId:string,
    Anonymous:boolean,
    UserId:string,
    UserName:string,
    Fcomment:string
}
declare type NewFans = {
    UserId:string,
    UserName:string
}
declare type UserFollow = {
    UserId:string,
    UserName:string,
    UserLevel:number
}
//
declare type UserFavorite = {
    favid:string,
    info:{
        name:string,
        createdtime:number,
        lastupdated:number
    }
}
declare type CheckUserFavorite = {
    favname:string,
    favid:string
}