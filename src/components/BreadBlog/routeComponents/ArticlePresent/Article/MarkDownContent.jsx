import React from "react";
import Editor from "md-editor-rt";
const { Catalog } = Editor
function MarkDownContent({content}) {

	return (
		<Editor
			previewOnly={true}
			editorClass='markdown_editor'
			modelValue={content || '> 这个用户很懒什么都没有写'}
			editorId='article-md-preview'
		/>
	);
}
function MarkDownCatalog(){
	return(
		<Catalog editorId='article-md-preview' scrollElement={() => document.getElementById('scrollableDiv')}/>
	)
}
export {MarkDownContent,MarkDownCatalog}