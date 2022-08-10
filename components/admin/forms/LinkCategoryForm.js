import {useState} from 'react';
import {commonFromSubmitHandler} from "../../../helpers/common";
import Input from "../../custom/Input";

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
					<Input label={"Title"} id={"title"} name={"title"} className={"col-12 col-md-6 mb-0"}
					       defaultValue={formData.title} onInput={updateFormData}/>
					
					<Input className={"col-12 col-md-6 mb-0"} label={"Icon (class name)"}
					       id={"icon"} labelAppendIcon={formData.icon} name={"icon"}
					       defaultValue={formData.icon} onInput={updateFormData}/>
				</div>
				
				
				<div className={"row"}>
					<div className="col">
						<a href={"https://icons8.com/line-awesome"} rel={"noreferrer"} target={"_blank"}
						   className={"btn btn-sm border-1 mt-2 fs-12"}>
							Checkout <span className={"fw-500"}>Line awesome icons</span>
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