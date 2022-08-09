import React, {useState} from 'react';
import {commonFromSubmitHandler} from "../../../helpers/common";
import Input from "../../custom/Input";
import DescriptionBox from "../../custom/DescriptionBox";

function ExperienceForm({experience = null, onSuccessAction}) {
	const [isPresent, setIsPresent] = useState(!!(experience && !experience?.endDate))
	const [formData, setFormData] = useState(experience ? experience : {
		designation: null,
		company: null,
		startDate: null,
		endDate: null,
		description: null,
	})
	const toggleIsPresent = (e) => {
		setIsPresent(e.target.checked)
	}
	
	const updateFormData = (event, value = null) => {
		setFormData(prevState => ({
			...prevState,
			[event.target.name]: value ? value : event.target.value
		}))
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		const form = new FormData(event.target);
		form.append('description', formData.description)
		const formProps = Object.fromEntries(form);
		await commonFromSubmitHandler(event, formProps, "/admin/experiences", experience, onSuccessAction)
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				
				<Input label={"Company"} id={"company"} name={"company"} required
				       defaultValue={formData.company} onInput={updateFormData}/>
				
				<Input label={"Designation"} id={"designation"} name={"designation"} required
				       defaultValue={formData.designation} onInput={updateFormData}/>
				
				<div className={"row mb-3"}>
					<Input className={"col-12 col-md-6 mb-0"} label={"Start Date"} id={"startDate"} name={"startDate"} required
					       type={"date"} defaultValue={formData.startDate} onInput={updateFormData}/>
					
					<Input className={"col-12 col-md-6 mb-0"} label={"End Date"} id={"endDate"} name={"endDate"}
					       disabled={isPresent}
					       required={!isPresent} type={"date"} defaultValue={formData.endDate} onInput={updateFormData}/>
				</div>
				
				<div className="mb-3">
					<label htmlFor="isPresent" className={"form-label fs-12"}>
						<input id={"isPresent"} type="checkbox" name={"isPresent"}
						       checked={isPresent} onChange={toggleIsPresent}/>
						Currently working here
					</label>
				</div>
				
				<DescriptionBox id={"description"} label={"Description"} onInput={(value) => {
					setFormData(prevState => ({
						...prevState,
						description: value
					}))
				}} defaultValue={formData.description}/>
				
				{/*<Input label={"Description"} id={"description"} name={"description"} required type={"textarea"}*/}
				{/*       defaultValue={formData.description} onInput={updateFormData} rows={4}/>*/}
				
				<button type={"submit"}
				        className={"btn bg-olive text-white pull-right"}>{!experience ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default ExperienceForm;