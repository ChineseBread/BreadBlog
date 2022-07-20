import React from "react";
import Editor from "md-editor-rt";
const {MdCatalog} = Editor
function MarkDownContent({content}:any) {

	return (
		<Editor
			previewOnly
			modelValue={content || '> 这个用户很懒什么都没有写'}
			editorId='article-md-preview'
			className='markdown_editor'
		/>
	);
}
function MarkDownCatalog(){
	return(
		<MdCatalog editorId='article-md-preview' scrollElement='#scrollableDiv'/>
	)
}
export {MarkDownContent,MarkDownCatalog}