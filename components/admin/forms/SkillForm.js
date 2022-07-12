import React, {useState} from 'react';
import {commonFromSubmitHandler} from "../../../helpers/common";

function SkillForm({skill = null, onSuccessAction}) {
	
	const [formData, setFormData] = useState(skill ? skill : {
		title: null,
		type: null,
		rating: null
	})
	const updateFormData = (event, value = null) => {
		setFormData(prevState => ({
			...prevState,
			[event.target.name]: value ? value : event.target.value
		}))
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		const form = new FormData(event.target)
		const formProps = Object.fromEntries(form);
		await commonFromSubmitHandler(event, formProps,"/admin/skills",skill, onSuccessAction)
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="title" className={"form-label"}>Title</label>
					<input id={"title"} type="text" className={"form-control"} name={"title"} required
					       defaultValue={formData.title} onInput={updateFormData}/>
				</div>
				<div className="mb-3">
					<label htmlFor="type" className={"form-label"}>Type</label>
					<input id={"type"} type="text" className={"form-control"} name={"type"} required
					       defaultValue={formData.type} onInput={updateFormData}/>
				</div>
				<div className="mb-3">
					<label htmlFor="rating" className={"form-label"}>Rating</label>
					<select defaultValue={formData.rating} className={"form-control"}
					        onChange={updateFormData} name={"rating"} id="rating" required>
						<option value="0.5">0.5</option>
						<option value="1">1</option>
						<option value="1.5">1.5</option>
						<option value="2">2</option>
						<option value="2.5">2.5</option>
						<option value="3">3</option>
						<option value="3.5">3.5</option>
						<option value="4">4</option>
						<option value="4.5">4.5</option>
						<option value="5">5</option>
					</select>
				</div>
				
				<button type={"submit"} className={"btn bg-olive text-white pull-right"}>{!skill ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default SkillForm;