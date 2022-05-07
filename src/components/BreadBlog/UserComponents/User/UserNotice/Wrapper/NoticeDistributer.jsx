import React from "react";
import SensArticle from "./SensArticle";
import SensComment from "./SensComment";
import SensFcomment from "./SensFcomment";
import NewComment from "./NewComment";
import NewFcomment from "./NewFcomment";
import NewLike from "./NewLike";
import BeSelectedAsHotArticle from "./BeSelectedAsHotArticle";
import BeSelectedAsHotAuthor from "./BeSelectedAsHotAuthor";

const NoticeContext = React.createContext(null)
const map = {
	'SensArticle': <SensArticle/>,
	'SensCmt': <SensComment/>,
	'SensFCmt': <SensFcomment/>,
	'NewCmt': <NewComment/>,
	'NewFCmt': <NewFcomment/>,
	'NewLike': <NewLike/>,
	'HotArticle': <BeSelectedAsHotArticle/>,
	'HotAuthor': <BeSelectedAsHotAuthor/>
}

/**
 * @description 消息组件派发器
 * @param Notice
 * @returns {JSX.Element}
 * @constructor
 */
function NoticeDistributer({Notice}) {
	return (
		<NoticeContext.Provider value={Notice}>
			{map[Notice.theme]}
		</NoticeContext.Provider>
	)
}
export {NoticeContext,NoticeDistributer}