import React from "react";
import Editor from "md-editor-rt";
function MarkDownContent({content}) {

	return (
		<Editor previewOnly={true} editorClass='markdown_editor' modelValue={content || '> 这个用户很懒什么都没有写'} />
	);
}
export default React.memo(MarkDownContent,(prevProps, nextProps) => prevProps.content === nextProps.content)