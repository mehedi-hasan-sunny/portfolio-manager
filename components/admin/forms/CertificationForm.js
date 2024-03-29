import {useState} from 'react';
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
				<Input label={"Title"} id={"title"} name={"title"} required
				       defaultValue={formData.title} onInput={updateFormData}/>
				
				<Input label={"Institution"} id={"institution"} name={"institution"} required
				       defaultValue={formData.institution} onInput={updateFormData}/>
				
				<div className={"row mb-3"}>
					<Input type="date" className={"col-12 col-md-6 mb-0"} label={"Issue Date"} id={"issueDate"} name={"issueDate"}
					       required defaultValue={formData.issueDate} onInput={updateFormData}/>
					
					<Input type="date" className={"col-12 col-md-6 mb-0"} label={"Expire Date"} labelOptional={true}
					       id={"expireDate"}
					       name={"expireDate"} defaultValue={formData.expireDate} onInput={updateFormData}/>
				</div>
				
				<Input label={"Credential ID"} id={"credentialId"} name={"credentialId"} required
				       defaultValue={formData.credentialId} onInput={updateFormData}/>
				
				<Input type="url" label={"Certification Link"} id={"certificateLink"} name={"certificateLink"} required
				       defaultValue={formData.certificateLink} onInput={updateFormData}/>
				
				<button type={"submit"}
				        className={"btn bg-olive text-white pull-right"}>{!certification ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default CertificationForm;