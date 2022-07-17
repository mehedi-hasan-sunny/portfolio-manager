import React, {useState} from 'react';
import {commonFromSubmitHandler} from "../../../helpers/common";

function ExperienceForm({experience = null, onSuccessAction}) {
	const [isPresent, setIsPresent] = useState(!!(experience && !experience?.endDate))
	const [formData, setFormData] = useState(experience ? experience : {
		designation: null,
		company: null,
		startDate: null,
		endDate: null,
		description: null,
	})
	const toggleIsPresent = (e) =>{
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
		const form = new FormData(event.target)
		const formProps = Object.fromEntries(form);
		await commonFromSubmitHandler(event, formProps, "/admin/experiences", experience, onSuccessAction)
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="company" className={"form-label"}>Company</label>
					<input id={"company"} type="text" className={"form-control"} name={"company"} required
					       defaultValue={formData.company} onInput={updateFormData}/>
				</div>
				<div className="mb-3">
					<label htmlFor="designation" className={"form-label"}>Designation</label>
					<input id={"designation"} type="text" className={"form-control"} name={"designation"} required
					       defaultValue={formData.designation} onInput={updateFormData}/>
				</div>
				<div className={"row mb-3"}>
					<div className={"col-6"}>
						<label htmlFor="startDate" className={"form-label"}>Start Date</label>
						<input id={"startDate"} type="date" className={"form-control"} name={"startDate"} required
						       defaultValue={formData.startDate} onInput={updateFormData}/>
					</div>
					<div className={"col-6"}>
						<label htmlFor="endDate" className={"form-label"}>End Date</label>
						<input id={"endDate"} type="date" className={"form-control"} name={"endDate"} disabled={isPresent}
						       required={!isPresent} defaultValue={formData.endDate} onInput={updateFormData}/>
					</div>
				</div>
				
				<div className="mb-3">
					<label htmlFor="isPresent" className={"form-label fs-12"}>
						<input id={"isPresent"} type="checkbox" name={"isPresent"}
						      checked={isPresent} onChange={toggleIsPresent}/>
						Currently working here
					</label>
				</div>
				
				<div className="mb-3">
					<label htmlFor="description" className={"form-label"}>Description</label>
					<textarea rows={2} className={"form-control"} name={"description"} id={"description"} required
					          onInput={updateFormData} defaultValue={formData.description} maxLength={255}/>
				</div>
				<button type={"submit"} className={"btn bg-olive text-white pull-right"}>{!experience ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default ExperienceForm;