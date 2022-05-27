import {Fragment, useMemo, useState} from "react";
import {message} from "antd";
import Editor from 'md-editor-rt';
import {emojis, MarkDownExtension, toolbars} from "./DataSource";
import {HighlightOutlined, SmileOutlined} from "@ant-design/icons";
import ArticleOperationRequest from "@utils/RequestUtils/Operation/ArticleOperationRequest";

export default function MarkDownEditor(props){
    let {text,setText} = props
    const [emojiVisible, setEmojiVisible] = useState(false);

    const emojiHandler = (emoji) => {
        // 获取输入框
        const textarea = document.querySelector('#md-prev-textarea');
        // 获取选中的内容
        const selection = window.getSelection()?.toString();
        // 获取鼠标位置
        const endPoint = textarea.selectionStart;

        // 根据鼠标位置分割旧文本
        // 前半部分
        const prefixStr = textarea.value.substring(0, endPoint);
        // 后半部分
        const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

        setText(`${prefixStr}${emoji}${suffixStr}`);

        setTimeout(() => {
            textarea.setSelectionRange(endPoint, endPoint + 1);
            textarea.focus();
        }, 0);
    };
    const markHandler = () => {
        // 获取输入框
        const textarea = document.querySelector('#md-prev-textarea');
        // 获取选中的内容
        const selection = window.getSelection()?.toString();
        // 获取鼠标位置
        const endPoint = textarea.selectionStart;

        // 生成标记文本
        const markStr = `@${selection}@`;

        // 根据鼠标位置分割旧文本
        // 前半部分
        const prefixStr = textarea.value.substring(0, endPoint);
        // 后半部分
        const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

        setText(`${prefixStr}${markStr}${suffixStr}`);

        setTimeout(() => {
            textarea.setSelectionRange(endPoint, markStr.length + endPoint);
            textarea.focus();
        }, 0);
    };

    const handleUploadImg = (files,callback) => {
        let file = files[0]
        message.loading({content:"上传中...",key:'uploading',duration:10})
        ArticleOperationRequest.uploadImg(file).then(result => {
            if (result.Ok){
                message.success({content:'上传成功',key:'uploading'})
                callback([result.path])
            }else{
                message.warn(result.Msg)
            }
        })
    }
    return(
        <Fragment>
            {useMemo(() => {
                return <Editor
                    onUploadImg={handleUploadImg}
                    modelValue={text}
                    editorId="md-prev"
                    editorClass='markdown_editor'
                    defToolbars={[
                        <Editor.NormalToolbar
                            title="标记"
                            trigger={
                                <HighlightOutlined  aria-hidden="true"/>
                            }
                            onClick={markHandler}
                            key="mark-toolbar"
                        />,
                        <Editor.DropdownToolbar
                            title="emoji"
                            visible={emojiVisible}
                            onChange={setEmojiVisible}
                            overlay={
                                <>
                                    <div className="emoji-container">
                                        <ol className="emojis">
                                            {emojis.map((emoji, index) => (
                                                <li
                                                    key={`emoji-${index}`}
                                                    onClick={() => {
                                                        emojiHandler(emoji);
                                                    }}
                                                >
                                                    {emoji}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </>
                            }
                            trigger={
                                <SmileOutlined aria-hidden="true"/>
                            }
                            key="emoji-toolbar"
                        />
                    ]}
                    extensions={[MarkDownExtension]}
                    toolbars={toolbars}
                    onChange={setText}
                />
            },[text,emojiVisible])}
        </Fragment>
    )
}