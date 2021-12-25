import React, {useState} from 'react';

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
	const handleSubmit = async (e) => {
		e.preventDefault()
		const form = new FormData(e.target)
		const formProps = Object.fromEntries(form);
		try {
			const response = await fetch(`/api/admin/link-category${linkCategory ? ('/' + linkCategory.id) : ''}`, {
				method: !linkCategory ? "post" : "put",
				body: JSON.stringify(formProps),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
			const {data} = await response.json()
			if (data.linkCategory) {
				onSuccessAction ? onSuccessAction(data.linkCategory) : null
			}
		} catch (e) {
			console.log(e.message)
		}
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
				
				<button type={"submit"} className={"btn pull-right"}>{!linkCategory ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default LinkCategoryForm;