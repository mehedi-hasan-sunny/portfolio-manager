import React, {useState} from 'react';
import Input from "../../custom/Input";
import {commonFromSubmitHandler, empty} from "../../../helpers/common";
import DescriptionBox from "../../custom/DescriptionBox";

function BlogForm({blog = null, onSuccessAction}) {
	
	const [coverImage, setCoverImage] = useState(!empty(blog?.coverImage) ? blog.coverImage : null);
	
	
	const handleCoverImageFile = (event) => {
		if (event.target.files && event.target.files.length) {
			const coverImageFile = event.target.files[0];
			const fileReader = new FileReader();
			fileReader.onload = () => {
				const image = new Image();
				
				image.onload = () => {
					setCoverImage(fileReader.result);
					updateFormData(event, fileReader.result);
				}
				
				image.src = fileReader.result
			}
			
			fileReader.readAsDataURL(coverImageFile)
			
		} else {
			updateFormData(event, null);
			setCoverImage(null);
		}
	}
	
	
	const [formData, setFormData] = useState(blog ? {...blog, coverImage: null} : {
		title: null,
		subtitle: null,
		content: null,
		coverImage: null,
	})
	const updateFormData = (event, value = null) => {
		setFormData(prevState => ({
			...prevState,
			[event.target.name]: value ? value : event.target.value
		}))
		
	}
	const handleSubmit = async (event) => {
		event.preventDefault();
		// const form = new FormData(event.target)
		const formProps = {...formData, prevCoverImage: blog?.coverImage ?? null};
		await commonFromSubmitHandler(event, formProps, "/admin/blogs", blog, onSuccessAction)
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				<Input label={"Title"} id={"title"} name={"title"} defaultValue={formData.title} onInput={updateFormData}/>
				
				<Input label={"Subtitle"} id={"subtitle"} name={"subtitle"} defaultValue={formData.subtitle}
				       onInput={updateFormData}/>
				
				<Input label={"Cover Photo"} id={"coverImage"} name={"coverImage"} type={"file"}
				       accept={"image/*"} required={!blog?.coverImage} onChange={handleCoverImageFile}>
					{
						coverImage ?
								<img alt={"cover photo"} loading={"lazy"} className={"img-fluid mt-3"} src={coverImage}/> : null
					}
				</Input>
				
				
				<DescriptionBox id={"content"} label={"Content"} onInput={(value) => {
					setFormData(prevState => ({
						...prevState,
						content: value
					}))
				}} defaultValue={formData.content}
				                toolbarOptions={['inline', 'image', 'emoji', 'blockType', 'fontSize', 'textAlign']}/>
				
				<Input label={"Summary"} id={"summary"} name={"summary"} defaultValue={formData.summary} required
				       onInput={updateFormData} type={"textarea"} rows={4} maxLength={550}/>
				
				<Input label={"tags"} id={"tags"} name={"tags"} defaultValue={formData.tags} placeholder={"UI,UX,Design"}
				       onInput={updateFormData}/>
				
				<button type={"submit"}
				        className={"btn bg-olive text-white pull-right"}>{!blog ? 'Submit' : 'Update'}</button>
			</form>
	);
}


export default BlogForm;