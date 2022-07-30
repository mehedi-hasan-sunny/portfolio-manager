import {useState} from "react";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

function DescriptionBox(props) {
	const [editorState, setEditorState] = useState(()=> EditorState.createEmpty())
	return (
			<div>
				<label htmlFor="">Description</label>
				<Editor editorState={editorState} onChange={setEditorState}/>
			</div>
	)
}

export default DescriptionBox;