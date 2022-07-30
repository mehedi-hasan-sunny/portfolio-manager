import React, {useState} from 'react';
import Input from "../../custom/Input";
import {commonFromSubmitHandler, empty} from "../../../helpers/common";

function ServiceForm({service = null, onSuccessAction}) {
	
	const [icon, setIcon] = useState(!empty(service.icon) ? service.icon : null);
	
	
	const handleIconFile = (event) => {
		if (event.target.files && event.target.files.length) {
			const iconFile = event.target.files[0];
			const fileReader = new FileReader();
			fileReader.onload = () => {
				const image = new Image();
				
				image.onload = () => {
					setIcon(fileReader.result);
					updateFormData(event, fileReader.result);
				}
				
				image.src = fileReader.result
			}
			
			fileReader.readAsDataURL(iconFile)
			
		} else {
			updateFormData(event, null);
			setIcon(null);
		}
	}
	
	
	const [formData, setFormData] = useState(service ? {...service, icon: null} : {
		title: null,
		description: null,
		icon: null
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
		const formProps = {...formData, prevIcon: service.icon ?? null};
		await commonFromSubmitHandler(event, formProps, "/admin/services", service, onSuccessAction)
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				<Input label={"Title"} id={"title"} name={"title"} defaultValue={formData.title} onInput={updateFormData}/>
				
				<Input label={"Description"} type={"textarea"} rows="3" id={"description"} defaultValue={formData.description}
				       onInput={updateFormData} maxLength={500} name={"description"}/>

				<Input label={"Icon"} id={"icon"} name={"icon"} type={"file"}
				       accept={"image/*"} required={!service?.icon} onChange={handleIconFile}>
					{
						icon ? <img alt={"icon"} loading={"lazy"} className={"img-fluid mt-3"} src={icon}/> : null
					}
				</Input>
				
				<button type={"submit"}
				        className={"btn bg-olive text-white pull-right"}>{!service ? 'Submit' : 'Update'}</button>
			</form>
	);
}


export default ServiceForm;