import React, {useEffect, useState} from 'react';
import Card from "../../Card";
import Input from "../../custom/Input";
import {disabledFullForm, notify, resetAndEnableFullForm} from "../../../helpers/common";


const CreateProjectForm = ({project = null, onSuccessAction = null}) => {
	
	const defaultThumbnail = project && project?.images.length ? project.images.filter(item => item.isThumbnail === true): null
	const defaultImages = project && project?.images.length ? project.images.filter(item => item.isThumbnail === false) : []
	
	const [formLinks, setFormLinks] = useState([])
	
	const [images, setImages] = useState([...defaultImages]);
	
	const [thumbnail, setThumbnail] = useState( defaultThumbnail);
	
	const [thumbnailErrorMessage, setThumbnailErrorMessage] = useState(null);
	
	const [linkCategories, setLinkCategories] = useState([]);
	
	const [deletableImages, setDeletableImages] = useState([]);
	
	const [formData, setFormData] = useState({
		title: project?.title ?? null,
		images: [...defaultImages],
		thumbnail: null,
		startDate: project?.startDate ?? null,
		endDate: project?.endDate ?? null,
		description: project?.description ?? null,
	});
	
	const handleThumbnailImage = (event) => {
		if (event.target.files && event.target.files.length) {
			const thumbnailFile = event.target.files[0];
			
			const fileReader = new FileReader();
			
			fileReader.onload = () => {
				const image = new Image();
				
				image.onload = () => {
					if (image.width >= 800 && image.width <= 860 && image.height >= 600 && image.height <= 660) {
						if (project?.images){
							deletableImages.push(thumbnail[0])
						}
						setThumbnail([{url: image.src}]);
						updateFormData(event, thumbnailFile);
						if (thumbnailErrorMessage) {
							setThumbnailErrorMessage(null)
						}
					} else {
						updateFormData(event, null);
						event.target.value = null;
						setThumbnailErrorMessage("Thumbnail width x height must between 800x600 px to 860x660 px")
						
						if (defaultThumbnail){
							setThumbnail(defaultThumbnail)
						}
						else{
							setThumbnail(null)
						}
						
					}
				}
				
				image.src = fileReader.result
			}
			
			fileReader.readAsDataURL(thumbnailFile)
			
		} else {
			updateFormData(event, null);
			setThumbnail(null);
		}
	}
	
	const imageUrls = (event) => {
		if (event.target.files && event.target.files.length) {
			const imageFiles = event.target.files;
			
			updateFormData(event, imageFiles)
			
			let imagePreviews = [];
			
			[...imageFiles].forEach((file) => {
				imagePreviews.push(URL.createObjectURL(file))
			});
			
			setImages([...images, ...imagePreviews]);
		}
		
	}
	
	const updateFormData = (event, value = null) => {
		setFormData(prevState => ({
			...prevState,
			[event.target.name]: value ? value : event.target.value
		}))
	}
	
	const removeImage = (index, item) => {
		if (project?.images){
			deletableImages.push(item)
		}
		
		images.splice(index, 1);
		
		setFormData(prevState => ({
			...prevState,
			images: prevState.images.splice(index, 1)
		}))
	}
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		const form = new FormData(e.target);
		if (project && project.images) {
			// form.append('prevImages', JSON.stringify(project.images))
			form.append('deletableImages', JSON.stringify(deletableImages))
		}
		// form.append('images', formData.images)
		form.append('links', JSON.stringify(formLinks))
		disabledFullForm(e.target)
		try {
			const response = await fetch(`api/admin/projects${project ? ("/" + project.id) : ''}`, {
				method: !project ? "post" : "put",
				body: form,
			})
			if (response.status === 200) {
				const {data} = await response.json()
				if (data.project) {
					notify('success', `Project ${project ? 'updated' : 'created'} successfully.`)
					setTimeout(() => {
						resetAndEnableFullForm(e.target)
						onSuccessAction ? onSuccessAction(data) : null
					}, 500)
				}
			} else {
				throw Error(response.status + " " + response.statusText)
			}
			
		} catch (err) {
			resetAndEnableFullForm(e.target, false)
			notify('error', err?.message ?? err)
		}
	}
	
	const updateFormLinks = (id, icon, value, index) => {
		let data = formLinks
		if (!data[index])
			data[index] = {}
		data[index]["icon"] = icon
		data[index]["url"] = value
		setFormLinks(data)
	}
	
	const getDefaultLink = (icon) => {
		if (!project || !project.links) {
			return null
		}
		const item = project.links.find(projectLink => projectLink.icon === icon)
		if (!item) {
			return null
		}
		return item.url
	}
	
	useEffect(() => {
		
		fetch(`api/admin/link-categories`).then(async (res) => {
			const {data} = await res.json()
			setLinkCategories(data)
			if (project) {
				const links = data.map((item) => {
					const matched = project.links.filter(projectLink => projectLink.linkCategoryId === item.id)
					if (!matched.length) {
						return {
							linkCategoryId: item.id,
							url: null
						}
					}
					return matched[0]
				})
				
				setFormLinks(links)
			}
			
		})
	}, [project])
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				<Input label={"Title"} id={"title"} name={"title"} required
				       defaultValue={formData.title}
				       onInput={updateFormData}/>
				
				<Input label={"Thumbnail"} id={"thumbnail"} name={"thumbnail"} type={"file"}
				       defaultValue={formData.thumbnail} accept={"image/*"} required={!project}
				       onChange={handleThumbnailImage} errorMessage={thumbnailErrorMessage}>
					{
						thumbnail ? <Card className={"mt-3"} maxHeight={"27.5rem"} imgSrc={thumbnail[0].url}/> : null
					}
				</Input>
				
				<div className={"mb-3"}>
					<label htmlFor="images" className={"form-label"}>Image(s)</label>
					<input type="file" accept={"image/*"} multiple className={"form-control"} name={"images"}
					       id={"images"} onChange={imageUrls} required={!project}/>
					<div className={"d-flex flex-wrap"}>
						{
							images.map((image, index) => {
								return (
										<div className={"my-2 me-2 w-100"} key={index}>
											<img alt={index} style={{maxWidth: "100%"}} src={image && image.url ? image.url : image}/>
											<div className={"d-flex justify-space-between"}
											     onClick={() => {
												     removeImage(index, image)
											     }}
											>
												<i className="las la-trash-alt ms-auto text-danger hover-able"/>
											</div>
										</div>
								)
							})
						}
					</div>
				</div>
				<div className={"mb-3"}>
					
					<Input label={"Description"} type="textarea" id={"description"} defaultValue={formData.description}
					       name={"description"} required rows={3}
					       onInput={updateFormData}/>
				</div>
				
				<div className="row">
					<div className="col-6">
						<Input label={"Start Date"} type="date" id={"startDate"} defaultValue={formData.startDate}
						       name={"startDate"} required onInput={updateFormData}/>
					</div>
					<div className="col-6">
						<Input label={"End Date"} type="date" id={"endDate"} defaultValue={formData.endDate} name={"endDate"}
						       onInput={updateFormData} labelOptional={true}/>
					</div>
				</div>
				
				<div className="row">
					{
						linkCategories.map((item, index) => {
							return (
									<Input label={item.title + " Project Link"} labelPrependIcon={item.icon}
									       className={`col-12 ${linkCategories.length > 1 ? 'col-md-6' : ''} mb-3`} key={index}
									       type="url" id={"endDate"} defaultValue={formData.endDate} name={`links[${item.id}][url]`}
									       onInput={(e) => {
										       updateFormLinks(item.id, item.icon, e.target.value, index)
									       }} labelOptional={true}/>
							)
						})
					}
				</div>
				
				<button type={"submit"}
				        className={"btn bg-olive text-white pull-right"}>{!project ? 'Submit' : 'Update'}</button>
			
			</form>
	
	);
}


export default CreateProjectForm;