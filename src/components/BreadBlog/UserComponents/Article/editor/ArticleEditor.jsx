import {Fragment, useEffect, useMemo} from "react";
import BraftEditor from 'braft-editor'
// import { useOutletContext } from "react-router-dom";


export default function ArticleEditor(props){

    useEffect(() => {
        return () => false
    },[])
    // const context = useOutletContext()
    const {editorState,setEditorState} = props
    // const [editorState,setEditorState] = useState(BraftEditor.createEditorState('<p>写点啥呗...</p>'))

    const handleChange = (editorState) => {
        setEditorState(editorState)
    }
    return (
        <Fragment>
            {useMemo(() => {
                return(
                    <div className="editor-wrapper">
                        <BraftEditor
                            value={editorState}
                            onChange={handleChange}
                        />
                    </div>
                )
            },[editorState])}
        </Fragment>
    )
}