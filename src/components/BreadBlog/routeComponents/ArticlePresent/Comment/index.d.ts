declare type CommentsListInfo = {
    CommentsList:PreviewCommentItem[],
    hasMore:boolean
}
declare type SubCommentsListInfo = {
    CommentsList:FCommentItem[],
    hasMore:boolean
}
declare type CommentItem = {
    commentItem:PreviewCommentItem,
    commentsid:string
}