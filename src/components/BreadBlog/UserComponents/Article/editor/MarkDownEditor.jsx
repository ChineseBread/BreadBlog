// import React, {useState} from 'react';
import Editor from 'md-editor-rt';
// import {useOutletContext} from "react-router-dom";
import {Fragment, useEffect, useMemo, useState} from "react";
import {emojis, MarkDownExtension,toolbars} from "./DataSource";
import {HighlightOutlined, SmileOutlined} from "@ant-design/icons";

export default function MarkDownEditor(props){
    // let context = useOutletContext()
    useEffect(() => {
       return () => false
    },[])
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
    // const [text, setText] = useState('## 写点东西呗....');
    return(
        <Fragment>
            {useMemo(() => {
                return <Editor
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
                    onChange={(value) => setText(value)}
                />
            },[text])}
        </Fragment>
        // <Editor editorClass='markdown_editor' toolbarsExclude={['fullscreen','pageFullscreen','github','save']} modelValue={text} onChange={setText} />
    )
}