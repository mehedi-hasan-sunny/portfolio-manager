import {Component} from 'react';
import {convertToRaw, ContentState, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg"
import HtmlToDraft from "html-to-draftjs";
import DraftToHtml from "draftjs-to-html"
import {empty} from "../../helpers/common";
import PropTypes from "prop-types";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

class DescriptionBox extends Component {
	state = {
		editorState: EditorState.createEmpty(),
		content: '',
		ref: ''
	}
	
	onEditorStateChange = (editorState) => {
		this.setState((prev) => {
			return {
				...prev,
				editorState,
				content: DraftToHtml(convertToRaw(editorState.getCurrentContent()))
			}
		});
		
		this.props.onInput(this.state.content)
	};
	
	setEditorReference = (ref) => {
		this.setState((prev) => {
			return {
				...prev,
				ref
			}
		});
	}
	
	componentDidMount() {
		if (!empty(this.props.defaultValue)) {
			
			const {contentBlocks} = HtmlToDraft(this.props.defaultValue);
			const contentState = ContentState.createFromBlockArray(contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			
			this.setState((prev) => {
				return {
					...prev,
					editorState
				}
			});
		}
	}
	
	// componentDidUpdate() {
	// 	console.log(this.state)
	// }
	
	
	render() {
		const {editorState} = this.state;
		return <div className={"mb-3"}>
			
			{
				this.props.label ? <label htmlFor={this.props?.id ?? 'description'} className={"form-label"} onClick={() => {
					this.state.ref.focus();
				}}>{this.props.label}</label> : null
				
			}
			
			
			<div className={"bg-white"}>
				<Editor
						editorRef={this.setEditorReference}
						id={this.props?.id ?? 'description'}
						editorState={editorState}
						onEditorStateChange={this.onEditorStateChange}
						wrapperClassName={"rounded  border-1"}
						toolbarClassName={"mb-0 w-100 border-top-0 border-left-0 border-right-0 border-bottom rounded-top"}
						editorClassName={"rounded mt-0 p-2 rounded-bottom"}
						toolbar={{
							options: this.props.toolbarOptions,
							...this.props.toolbarInnerOptions
						}}
						// toolbar={{
						// 	inline: { inDropdown: true },
						// 	list: { inDropdown: true },
						// 	textAlign: { inDropdown: true },
						// 	link: { inDropdown: true },
						// 	history: { inDropdown: true },
						// 	// image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
						// }}
				/>
			</div>
		
		</div>
	}
}


DescriptionBox.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onInput: PropTypes.func.isRequired,
	defaultValue: PropTypes.string,
	toolbarOptions: PropTypes.array,
	toolbarInnerOptions: PropTypes.object,
}

DescriptionBox.defaultProps = {
	toolbarOptions: ['inline', 'textAlign', 'emoji'],
	toolbarInnerOptions: {
		inline: {
			options: ['bold', 'italic', 'underline', 'strikethrough']
		},
	},
	propBool: true,
}


export default DescriptionBox;