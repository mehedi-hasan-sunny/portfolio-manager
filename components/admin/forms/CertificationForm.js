import React, {useState} from 'react';
import {commonFromSubmitHandler} from "../../../helpers/common";
import Input from "../../custom/Input";

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
	const handleSubmit = async (event) => {
		event.preventDefault()
		const form = new FormData(event.target)
		const formProps = Object.fromEntries(form);
		await commonFromSubmitHandler(event, formProps, "/admin/certifications", certification, onSuccessAction)
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				<Input className={"mb-3"} label={"Title"} id={"title"} name={"title"} required
				       defaultValue={formData.title} onInput={updateFormData}/>
				
				<Input className={"mb-3"} label={"Institution"} id={"institution"} name={"institution"} required
				       defaultValue={formData.institution} onInput={updateFormData}/>
				
				<div className={""}>
					<Input type="date" className={"col-12 col-md-6"} label={"Issue Date"} id={"issueDate"} name={"issueDate"}
					       required defaultValue={formData.issueDate} onInput={updateFormData}/>
					
					<Input type="date" className={"col-12 col-md-6"} label={"Last Name"} id={"lastName"} name={"lastName"}
					       required defaultValue={formData.lastName} onInput={updateFormData}/>
				
				</div>
				<div className="row mb-3">
					<div className={"col"}>
						<label htmlFor="issueDate" className={"form-label"}>Issue Date</label>
						<input id={"issueDate"} type="date" className={"form-control"} name={"issueDate"} required
						       defaultValue={formData.issueDate} onInput={updateFormData}/>
					</div>
					<div className={"col"}>
						<label htmlFor="expireDate" className={"form-label"}>Expire Date <span
								className={"text-muted"}>(Optional)</span></label>
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
				<button type={"submit"}
				        className={"btn bg-olive text-white pull-right"}>{!certification ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default CertificationForm;