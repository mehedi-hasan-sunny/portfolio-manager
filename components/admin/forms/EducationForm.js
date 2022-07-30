import React, {useState} from 'react';
import {commonFromSubmitHandler} from "../../../helpers/common";
import Input from "../../custom/Input";

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
			
				<Input label={"Institution"} id={"institution"} name={"institution"} required
				       defaultValue={formData.institution} onInput={updateFormData}/>
				
				<Input label={"Department"} id={"department"} name={"department"} required
				       defaultValue={formData.department} onInput={updateFormData}/>
				
				<Input label={"Passing Year"} id={"passingYear"} name={"passingYear"} required steps={1}
				       type="number" defaultValue={formData.passingYear} onInput={updateFormData}/>
				
				<button type={"submit"} className={"btn bg-olive text-white pull-right"}>{!education ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default EducationForm;