//PublicDataRequest
/**
 * @Author Watish
 * @Author Chinesebread
 */
declare type PublicArticle = Article
declare type Author = {
    username:string,
    userid:string,
    level:number
}
// 用户动态
declare type Dynamics = {
    NewsId:string,
    Time:number,
    Type:'LikeArticle' | 'NewArticle',
    UserId:string,
    Data:{
        Article:Article
    }
}
declare type UserInfo = {
    name:string,
    userid:string,
    level:number
}