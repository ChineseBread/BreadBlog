declare type PreviewArticleInfo = {
    authorname:string,
    articleid:string,
    description:string,
    sortname:string,
    authorid:string,
    title:string,
    createdtime:number,
    commentsid:string,
    ispublic:boolean,
    tags:string[],
    content:string,
    type:string
}
declare type PreviewCommentItem = {
    CommentId:string,
    CommentData:{
        isanonymous:boolean,
        userid:string,
        username:string,
        comment:string,
        createdtime:number,
        fcomments:string,// 追评id
        // 会出现数字转为string的bug
        like:any,
    },
    FcommentCount:number,
    // HotFCommentsData:Array | null,
    isliked:boolean
}
declare type FCommentItem = {
    fcommentid: string,
    replydata?: {
        // 存在敏感内容则会被删除
        isanonymous?: boolean,
        userid?: string,
        comment?: string,
        createdtime?: number,
        reply?: string,
        username: string,
        like: any,
        replyid: string
    },
    fcommentdata: {
        isanonymous: boolean,
        comment: string,
        createdtime: number,
        username:string,
        like: any,
        reply?: string,
        userid?: string,
    },
    isliked?: boolean
}