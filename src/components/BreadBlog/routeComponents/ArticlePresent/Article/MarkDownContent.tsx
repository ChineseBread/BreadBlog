import React from "react";
import Editor from "md-editor-rt";
const {Catalog} = Editor
function MarkDownContent({content}:any) {

	return (
		<Editor
			previewOnly
			modelValue={content || '> 这个用户很懒什么都没有写'}
			editorId='article-md-preview'
			editorClass='markdown_editor'
		/>
	);
}
function MarkDownCatalog(){
	return(
	// @ts-ignore
		<Catalog editorId='article-md-preview' scrollElement={() => document.getElementById('scrollableDiv')}/>
	)
}
export {MarkDownContent,MarkDownCatalog}