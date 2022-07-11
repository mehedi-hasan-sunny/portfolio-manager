import React, {useEffect, useState} from 'react';
import {empty} from "../../../helpers/common";


function ProfileForm({profile = null, onSuccessAction}) {
	const [formLinks, setFormLinks] = useState([])
	
	const [formData, setFormData] = useState(profile ? profile : {
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		displayPicture: null,
		bioTitle: "",
		bio: "",
		title: null,
		liveIn: "",
		experienceInYears: "",
		dob:"",
		links: formLinks
	})
	
	
	const [linkCategories, setLinkCategories] = useState([]);
	
	console.log(linkCategories, "linkCategories")
	
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
			
			console.log(data, "data")
			setLinkCategories(data ?? [])
			if (profile && profile.length) {
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
	
	useEffect(()=>{
	}, [linkCategories])
	
	const handleSubmit = async (e) => {
		
		e.preventDefault();
		try {
			const response = await fetch("/api/admin/profile", {
				method: empty(profile) ? "post" : "put",
				body: JSON.stringify({...formData, links: formLinks}),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
			const {data} = await response.json()
			
			if (await data && data.profile) {
				onSuccessAction ? onSuccessAction(data.profile) : null
			}
		} catch (e) {
			console.log(e)
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
					<label htmlFor="dob" className={"form-label"}>Date of Birth</label>
					<input id={"dob"} className={"form-control"} name={"dob"} required
					       defaultValue={formData.dob} type={"date"}
					       onInput={updateFormData}/>
				</div>
				<div className="row mb-3">
					<div className={"col"}>
						<label htmlFor="email" className={"form-label"}>Email</label>
						<input type="email" id={"email"} className={"form-control"} name={"email"} required
						       defaultValue={formData.email} onInput={updateFormData}/>
					</div>
					
					<div className={"col"}>
						<label htmlFor="phone" className={"form-label"}>Phone Number (+880)</label>
						<input type="number" id={"phone"} className={"form-control"} name={"phoneNumber"} required
						       aria-label={"Phone Number"} minLength={10} maxLength={11}
						       defaultValue={formData.phoneNumber} onInput={updateFormData}/>
					</div>
				</div>
				<div className={"mb-3"}>
					<label htmlFor="display-picture" className={"form-label"}>Profile Image Link</label>
					<input type="text" id={"display-picture"} className={"form-control"} name={"displayPicture"} required
					       defaultValue={formData.displayPicture}
					       onInput={updateFormData}/>
				</div>
				<div className={"mb-3"}>
					<label htmlFor="bioTitle" className={"form-label"}>Bio Title</label>
					<input id={"bioTitle"} className={"form-control"} name={"bioTitle"} required
					          maxLength={250}
					          defaultValue={formData.bioTitle}
					          onInput={updateFormData}/>
				</div>
				<div className={"mb-3"}>
					<label htmlFor="bio" className={"form-label"}>Bio</label>
					<textarea id={"bio"} className={"form-control"} name={"bio"} required
					          maxLength={550}
					       defaultValue={formData.bio}
					       onInput={updateFormData}/>
				</div>
				<div className={"mb-3"}>
					<label htmlFor="liveIn" className={"form-label"}>I live in</label>
					<input id={"liveIn"} className={"form-control"} name={"liveIn"} required
					       defaultValue={formData.liveIn}
					       onInput={updateFormData}/>
				</div>
				<div className={"mb-3"}>
					<label htmlFor="experienceInYears" className={"form-label"}>Experience (in years)</label>
					<input type="number" id={"experienceInYears"} className={"form-control"} name={"experienceInYears"} required
					       aria-label={"Experience (in years)"} minLength={1} maxLength={3} min={0.1} step={0.1}
					       defaultValue={formData.experienceInYears} onInput={updateFormData}/>
				</div>
				<div className="row">
					{
						linkCategories.map((item, index) => {
							return (
									<div className={`${linkCategories.length > 1 ? 'col-6' : 'col'} mb-3`} key={index}>
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
				</div>
				
				
				<button type={"submit"} className={"btn bg-olive text-white pull-right"}>{!profile ? 'Submit' : 'Update'}</button>
			</form>
	);
}

export default ProfileForm;