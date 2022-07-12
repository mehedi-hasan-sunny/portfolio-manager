import React, {useState} from 'react';
import {commonFromSubmitHandler} from "../../../helpers/common";

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
		await commonFromSubmitHandler(event, formProps,"/admin/testimonials",testimonial, onSuccessAction)
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className={"form-label"}>Name</label>
					<input id={"name"} type="text" className={"form-control"} name={"name"} required
					       defaultValue={formData.name} onInput={updateFormData}/>
				</div>
				<div className="mb-3">
					<label htmlFor="designation" className={"form-label"}>Designation</label>
					<input id={"designation"} type="text" className={"form-control"} name={"designation"} required
					       defaultValue={formData.designation} onInput={updateFormData}/>
				</div>
				<div className={"mb-3"}>
					<label htmlFor="feedback" className={"form-label"}>Feedback</label>
					<textarea id={"feedback"} className={"form-control"} name={"feedback"} required
					          maxLength={550} rows={5}
					          defaultValue={formData.feedback}
					          onInput={updateFormData}/>
				</div>
				
				<button type={"submit"} className={"btn bg-olive text-white pull-right"}>{!testimonial ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default TestimonialForm;