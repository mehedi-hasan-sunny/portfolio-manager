import React, {useState} from 'react';
import {commonFromSubmitHandler} from "../../../helpers/common";

function EducationForm({education = null, onSuccessAction}) {
	
	const [formData, setFormData] = useState(education ? education : {
		institution: null,
		department: null,
		passingYear: null
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
		await commonFromSubmitHandler(event, formProps, "/admin/educations", education, onSuccessAction)
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="institution" className={"form-label"}>Institution</label>
					<input id={"institution"} type="text" className={"form-control"} name={"institution"} required
					       defaultValue={formData.institution} onInput={updateFormData}/>
				</div>
				<div className="mb-3">
					<label htmlFor="department" className={"form-label"}>Department</label>
					<input id={"department"} type="text" className={"form-control"} name={"department"} required
					       defaultValue={formData.department} onInput={updateFormData}/>
				</div>
				<div className="mb-3">
					<label htmlFor="passingYear" className={"form-label"}>Passing Year</label>
					<input id={"passingYear"} type="number" className={"form-control"} name={"passingYear"} required
					       defaultValue={formData.passingYear} onInput={updateFormData}/>
				</div>
				<button type={"submit"} className={"btn bg-olive text-white pull-right"}>{!education ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default EducationForm;