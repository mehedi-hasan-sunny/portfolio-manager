import React, {useEffect, useState} from 'react';


function ProfileForm({profile = null, onSuccessAction}) {
	const [formLinks, setFormLinks] = useState([])
	
	const [formData, setFormData] = useState(profile ? profile : {
		firstName: "Shohanur",
		lastName: "Rahman",
		email: "shohanbaf@gmail.com",
		displayPicture: null,
		title: null,
		links: formLinks
	})
	
	
	const [linkCategories, setLinkCategories] = useState([]);
	
	const updateFormData = (event, value = null) => {
		setFormData(prevState => ({
			...prevState,
			[event.target.name]: value ? value : event.target.value
		}))
	}
	const updateFormLinks = (icon, value, index) => {
		let data = formLinks
		console.log(data)
		
		if (!data[index])
			data[index] = {}
		data[index]["icon"] = icon
		data[index]["url"] = value
		
		setFormLinks(data)
	}
	
	useEffect(() => {
		fetch(`/api/admin/link-category`).then(async (res) => {
			const {data} = await res.json()
			setLinkCategories(data)
			if (profile) {
				const links = data.map((item) => {
					const matched = profile.links.filter(profileLink => profileLink.icon === item.icon)
					if (!matched.length) {
						return {
							icon: item.icon,
							url: null
						}
					}
					return matched[0]
				})
				
				setFormLinks(links)
			}
			
		})
	}, [profile])
	
	const handleSubmit = async (e) => {
		console.log({...formData, links: formLinks})
		e.preventDefault();
		try {
			const response = await fetch("/api/admin/profile", {
				method: !profile ? "post" : "put",
				body: JSON.stringify({...formData, links: formLinks}),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
			const {data} = await response.json()
			
			if (await data.profile) {
				onSuccessAction ? onSuccessAction(data.profile) : null
			}
		} catch (e) {
			console.log(e.message)
		}
	}
	
	const getDefaultLink = (icon) => {
		if (!profile || !profile.links) {
			return null
		}
		const item = profile.links.find(profileLink => profileLink.icon === icon)
		if (!item) {
			return null
		}
		
		return item.url
	}
	
	return (
			<form className={"p-3"} onSubmit={handleSubmit}>
				{
					profile && profile.id ? <input type={"hidden"} name={"id"} defaultValue={profile.id}/> : null
				}
				<div className={"row mb-3"}>
					<div className={"col-6"}>
						<label htmlFor="" className={"form-label"}>First Name</label>
						<input type="text" className={"form-control"} name={"firstName"} required
						       defaultValue={formData.firstName} onInput={updateFormData}/>
					</div>
					<div className={"col-6"}>
						<label htmlFor="" className={"form-label"}>Last Name</label>
						<input type="text" className={"form-control"} name={"lastName"} required defaultValue={formData.lastName}
						       onInput={updateFormData}/>
					</div>
				</div>
				<div className={"mb-3"}>
					<label htmlFor="title" className={"form-label"}>Title</label>
					<input type="title" id={"title"} className={"form-control"} name={"title"} required
					       defaultValue={formData.title} onInput={updateFormData}/>
				</div>
				<div className={"mb-3"}>
					<label htmlFor="email" className={"form-label"}>Email</label>
					<input type="email" id={"email"} className={"form-control"} name={"email"} required
					       defaultValue={formData.email} onInput={updateFormData}/>
				</div>
				<div className={"mb-3"}>
					<label htmlFor="" className={"form-label"}>Profile Image Link</label>
					<input type="text" className={"form-control"} name={"displayPicture"} required
					       defaultValue={formData.displayPicture}
					       onInput={updateFormData}/>
				</div>
				{
					linkCategories.map((item, index) => {
						return (
								<div className={"mb-3"} key={index}>
									<label htmlFor="" className={"form-label"}>
										<i className={item.icon}/>
										&nbsp;
										{item.title} Profile Link
									</label>
									<input type="text" className={"form-control"} name={`links[${item.id}][url]`}
									       defaultValue={getDefaultLink(item.icon)}
									       onInput={(e) => {
										       updateFormLinks(item.icon, e.target.value, index)
									       }}
									/>
								</div>
						)
					})
				}
				
				<button type={"submit"} className={"btn pull-right"}>{!profile ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default ProfileForm;