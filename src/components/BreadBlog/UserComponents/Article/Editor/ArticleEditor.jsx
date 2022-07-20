import {Fragment, useMemo} from "react";
import BraftEditor from 'braft-editor'
import ArticleOperationRequest from "@utils/RequestUtils/Operation/ArticleOperationRequest";
export default function ArticleEditor(props){

    const {editorState,setEditorState} = props

    const handleChange = (editorState) => {
        setEditorState(editorState)
    }

    const handleUpload = ({success,file,error}) => {
        ArticleOperationRequest.uploadImg(file).then(result => {
            if (result.Ok){
                success({
                    url: result.path,
                })
            }else{
                error({
                    msg:result.Msg
                })
            }
        })
    }
    return (
        <Fragment>
            {useMemo(() => {
                return(
                    <div className="editor-wrapper">
                        <BraftEditor
                            value={editorState}
                            onChange={handleChange}
                            media={{uploadFn:handleUpload}}
                            excludeControls={['fullscreen']}
                        />
                    </div>
                )
            },[editorState])}
        </Fragment>
    )
}