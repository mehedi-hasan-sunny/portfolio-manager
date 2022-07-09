import React, {useState} from 'react';

function TestimonialsForm({testimonial = null, onSuccessAction}) {
	
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
	const handleSubmit = async (e) => {
		e.preventDefault()
		const form = new FormData(e.target)
		const formProps = Object.fromEntries(form);
		try {
			const response = await fetch(`/api/admin/testimonials${testimonial ? `/${testimonial.id}` : ''}`, {
				method: !testimonial ? "post" : "put",
				body: JSON.stringify(formProps),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
			const {data} = await response.json()
			console.log(data)
			if (data.testimonials) {
				onSuccessAction ? onSuccessAction(data.testimonials) : null
			}
		} catch (e) {
			console.log(e.message)
		}
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
					          maxLength={550}
					          defaultValue={formData.feedback}
					          onInput={updateFormData}/>
				</div>
				
				<button type={"submit"} className={"btn pull-right"}>{!testimonial ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default TestimonialsForm;