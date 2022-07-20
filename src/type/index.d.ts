//basic response
/**
 * @Author Watish
 * @Author Chinesebread
 */
declare type Result<T> = {Ok:boolean,Msg?:string} & {[P in keyof T]?:T[P]}
// common data
declare type Article = {
    articleid:string,
    description:string,
    sortname:string,
    authorid:string,
    title:string,
    pv:number,
    likes:number,
    comments:number,
    cover:string | boolean,
    createdtime:number,
    commentsid:string,
    ispublic:boolean,
    type:string
}
declare type ListInfo<T> = {[P in  keyof T]:T[P]} & {hasMore:boolean}