import Editor from "md-editor-rt";

export default function MarkDownContent({content}) {

	return (
		<Editor previewOnly={true} editorClass='markdown_editor' modelValue={content || '> 这个用户很懒什么都没有写'} />
	);
}
