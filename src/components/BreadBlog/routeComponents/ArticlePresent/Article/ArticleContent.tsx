import React, {useEffect} from "react";

export default function ArticleContent({content}:any){
	useEffect(() => {
		let element = document.getElementById('html_render_container')
		element && (element.innerHTML = content || '这个用户很懒什么都没有写')
	},[content])
	return (
		<div className='article-content' id='html_render_container'>
			{/*{ArticleInfo.content || '这个用户很懒什么也没有写'}*/}
		</div>
	);
}
