import React, {useState} from 'react';
import {commonFromSubmitHandler} from "../../../helpers/common";

function LinkCategoryForm({linkCategory = null, onSuccessAction}) {
	
	const [formData, setFormData] = useState(linkCategory ? linkCategory : {
		title: null,
		icon: null,
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
		await commonFromSubmitHandler(event, formProps, "/admin/link-categories", linkCategory, onSuccessAction)
		
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				<div className={"row mb-3"}>
					<div className={"col-6"}>
						<label htmlFor="title" className={"form-label"}>Title</label>
						<input id={"title"} type="text" className={"form-control"} name={"title"} required
						       defaultValue={formData.title} onInput={updateFormData}/>
					</div>
					<div className={"col-6"}>
						<label htmlFor="icon" className={"form-label"}>
							Icon (class name) &nbsp;
							{
								formData.icon ? <i className={formData.icon}/> : null
							}
						</label>
						<input id={"icon"} type="text" className={"form-control"} name={"icon"} required
						       defaultValue={formData.icon} onInput={updateFormData}/>
					</div>
				</div>
				
				<div className={"row"}>
					<div className="col">
						<a href={"https://icons8.com/line-awesome"} rel={"noreferrer"} target={"_blank"}
						   className={"btn btn-sm mt-2"}>
							Line awesome icons
						</a>
					</div>
					<div className="col">
						<button type={"submit"}
						        className={"btn bg-olive text-white pull-right"}>{!linkCategory ? 'Submit' : 'Update'}</button>
					</div>
				</div>
			</form>
	);
}

export default LinkCategoryForm;