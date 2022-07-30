import React, {useState} from 'react';
import {commonFromSubmitHandler} from "../../../helpers/common";
import Input from "../../custom/Input";

function TestimonialForm({testimonial = null, onSuccessAction}) {
	
	const [formData, setFormData] = useState(testimonial ? testimonial : {
		name: null,
		designation: null,
		feedback: null
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
		await commonFromSubmitHandler(event, formProps, "/admin/testimonials", testimonial, onSuccessAction)
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				
				<Input label={"Name"} id={"name"} name={"name"} defaultValue={formData.name} onInput={updateFormData}/>
				
				<Input label={"Designation"} id={"designation"} name={"designation"} defaultValue={formData.designation}
				       onInput={updateFormData}/>
				
				<Input label={"Feedback"} id={"feedback"} name={"feedback"} defaultValue={formData.designation}
				       onInput={updateFormData} maxLength={550} rows={5}/>
				
				<button type={"submit"}
				        className={"btn bg-olive text-white pull-right"}>{!testimonial ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default TestimonialForm;