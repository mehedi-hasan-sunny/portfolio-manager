import React, {useState} from 'react';

function CertificationForm({certification = null, onSuccessAction}) {
	
	const [formData, setFormData] = useState(certification ? certification : {
		title: null,
		institution: null,
		issueDate: null,
		expireDate: null,
		credentialId: null,
		certificateLink: null,
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
			const response = await fetch(`/api/admin/certifications${certification ? `/${certification.id}` : ''}`, {
				method: !certification ? "post" : "put",
				body: JSON.stringify(formProps),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
			const {data} = await response.json()
			if (data.certifications) {
				onSuccessAction ? onSuccessAction(data.certifications) : null
			}
		} catch (e) {
			console.log(e.message)
		}
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="title" className={"form-label"}>Title</label>
					<input id={"title"} type="text" className={"form-control"} name={"title"} required
					       defaultValue={formData.title} onInput={updateFormData}/>
				</div>
				<div className="mb-3">
					<label htmlFor="institution" className={"form-label"}>Institution</label>
					<input id={"institution"} type="text" className={"form-control"} name={"institution"} required
					       defaultValue={formData.institution} onInput={updateFormData}/>
				</div>
				<div className="row mb-3">
					<div className={"col"}>
						<label htmlFor="issueDate" className={"form-label"}>Issue Date</label>
						<input id={"issueDate"} type="date" className={"form-control"} name={"issueDate"} required
						       defaultValue={formData.issueDate} onInput={updateFormData}/>
					</div>
					<div className={"col"}>
						<label htmlFor="expireDate" className={"form-label"}>Expire Date <span className={"text-muted"}>(Optional)</span></label>
						<input id={"expireDate"} type="date" className={"form-control"} name={"expireDate"}
						       defaultValue={formData.expireDate} onInput={updateFormData}/>
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="credentialId" className={"form-label"}>Credential ID</label>
					<input id={"credentialId"} type="text" className={"form-control"} name={"credentialId"} required
					       defaultValue={formData.credentialId} onInput={updateFormData}/>
				</div>
				<div className="mb-3">
					<label htmlFor="certificateLink" className={"form-label"}>Certification Link</label>
					<input id={"certificateLink"} type="text" className={"form-control"} name={"certificateLink"} required
					       defaultValue={formData.certificateLink} onInput={updateFormData}/>
				</div>
				<button type={"submit"} className={"btn bg-olive text-white pull-right"}>{!certification ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default CertificationForm;