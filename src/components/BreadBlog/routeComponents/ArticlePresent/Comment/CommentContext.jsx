import React from "react";
export const CommentContext = React.createContext({commentid:'',commentsid:'',setSubCommentsListInfo:CommentsInfo => {}});

export function CommentContextProvider({value,children}) {
	return (
		<CommentContext.Provider value={value}>
			{children}
		</CommentContext.Provider>
	);
}
