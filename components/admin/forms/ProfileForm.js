import {useEffect, useState} from 'react';
import {commonFromSubmitHandler, empty} from "../../../helpers/common";
import Input from "../../custom/Input";
import CircleText from "../../custom/CircleText";
import dynamic from "next/dynamic";
import {GET} from "../../../actions/http";

const DescriptionBox = dynamic(() => import("../../custom/DescriptionBox"), {ssr: false});

function ProfileForm({profile = null, onSuccessAction}) {
	const [formLinks, setFormLinks] = useState([])
	
	const [formData, setFormData] = useState(profile ? profile : {
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		bioTitle: "",
		bio: "",
		title: null,
		liveIn: "",
		experienceInYears: "",
		dob: "",
		cvDownloadLink: "",
		circleText: "",
		circleTextSize: "",
		circleTextDegree: "",
		links: formLinks
	})
	
	
	const [linkCategories, setLinkCategories] = useState([]);
	
	const updateFormData = (event, value = null) => {
		setFormData(prevState => ({
			...prevState, [event.target.name]: value ? value : event.target.value
		}))
	}
	const updateFormLinks = (icon, value, index) => {
		let data = formLinks
		
		if (!data[index]) data[index] = {}
		data[index]["icon"] = icon
		data[index]["url"] = value
		
		setFormLinks(data)
	}
	
	useEffect(async () => {
		const {data} = await GET(`api/admin/link-categories`).exec();
		if (data) {
			setLinkCategories(data ?? [])
			if (profile && profile.length) {
				const links = data.map((item) => {
					const matched = profile.links.filter(profileLink => profileLink.icon === item.icon)
					if (!matched.length) {
						return {
							icon: item.icon, url: null
						}
					}
					return matched[0]
				})
				
				setFormLinks(links)
			}
		}
	}, [profile])
	
	useEffect(() => {
	}, [linkCategories])
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		const {id, ...item} = profile
		await commonFromSubmitHandler(event, {...formData, links: formLinks}, "/admin/profile", item, onSuccessAction)
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
	
	return (<form className={"p-3"} onSubmit={handleSubmit}>
		{profile && profile.id ? <input type={"hidden"} name={"id"} defaultValue={profile.id}/> : null}
		<div className={"row"}>
			<Input className={"col-12 col-md-6"} label={"First Name"} id={"firstName"} name={"firstName"} required
			       defaultValue={formData.firstName} onInput={updateFormData}/>
			
			<Input className={"col-12 col-md-6"} label={"Last Name"} id={"lastName"} name={"lastName"} required
			       defaultValue={formData.lastName} onInput={updateFormData}/>
		</div>
		
		<Input className={"mb-3"} label={"Title"} id={"title"} name={"title"} required
		       defaultValue={formData.title} onInput={updateFormData}/>
		
		<Input className={"mb-3"} type="date" label={"Date of Birth"} id={"dob"} name={"dob"} required
		       defaultValue={formData.dob} onInput={updateFormData}/>
		
		<div className="row">
			<Input className={"col-12 col-md-6"} type="email" label={"Email"} id={"email"} name={"email"} required
			       defaultValue={formData.email} onInput={updateFormData}/>
			
			<Input className={"col-12 col-md-6"} type="number" label={"Phone Number (+880)"} id={"phoneNumber"}
			       aria-label={"Phone Number"} minLength={10} maxLength={11} name={"phoneNumber"} required
			       defaultValue={formData.phoneNumber} onInput={updateFormData}/>
		</div>
		
		<Input className={"mb-3"} label={"Bio Title"} id={"bioTitle"} maxLength={220}
		       name={"bioTitle"} required defaultValue={formData.bioTitle} onInput={updateFormData}/>
		
		
		<DescriptionBox id={"bio"} label={"Bio"} onInput={(value) => {
			setFormData(prevState => ({
				...prevState,
				bio: value
			}))
		}} defaultValue={formData.bio} toolbarOptions={['inline','blockType', 'fontSize', 'textAlign', 'emoji',]}/>
		
		<div className={"row"}>
			<Input className={"col-12 col-md-7 col-lg-8"} label={"I live in"} id={"liveIn"}
			       name={"liveIn"} required defaultValue={formData.liveIn} onInput={updateFormData}/>
			
			<Input type={"number"} className={"col-12 col-md-5 col-lg-4"} label={"Experience (in years)"}
			       id={"experienceInYears"}
			       name={"experienceInYears"} required aria-label={"Experience (in years)"} minLength={1} maxLength={3}
			       min={0.1} step={0.1} defaultValue={formData.experienceInYears} onInput={updateFormData}/>
		</div>
		
		
		<Input type={"url"} className={"mb-3"} label={"CV Download Link"} id={"cvDownloadLink"} name={"cvDownloadLink"}
		       defaultValue={formData.cvDownloadLink} onInput={updateFormData} required/>
		
		<Input className={"mb-3"} label={"Circle text"} id={"circleText"} name={"circleText"}
		       defaultValue={formData.circleText} onInput={updateFormData} required/>
		
		<div className={"row"}>
			<div className="col-12 col-md-8">
				<CircleText text={formData.circleText} size={formData.circleTextSize ?? 5}
				            deg={formData.circleTextDegree ?? 9.5}/>
			</div>
			<div className="col-12 col-md-4">
				<Input type={"number"} className={"mb-3"} label={"Circle size"} id={"circleTextSize"} name={"circleTextSize"}
				       defaultValue={formData.circleTextSize ?? 5} onInput={updateFormData} required step={0.05}/>
				<Input type={"number"} className={"mb-3"} label={"Circle text spacing"} id={"circleTextDegree"}
				       name={"circleTextDegree"}
				       defaultValue={formData.circleTextDegree ?? 9.5} onInput={updateFormData} required step={0.05}/>
			
			</div>
		</div>
		
		<div className="row">
			{linkCategories.map((item, index) => {
				return (<Input type={"url"} className={`col-12 ${linkCategories.length > 1 ? 'col-md-6' : ''} mb-3`} key={index}
				               labelPrependIcon={item.icon} label={item.title + " Profile Link"} id={"link-" + index}
				               name={`links[${item.id}][url]`} defaultValue={getDefaultLink(item.icon)} onInput={(e) => {
					updateFormLinks(item.icon, e.target.value, index)
				}}>
				</Input>)
			})}
		</div>
		
		
		<button type={"submit"}
		        className={"btn bg-olive btn-xs-block text-white pull-right"}>{!profile ? 'Submit' : 'Update'}</button>
	</form>);
}

export default ProfileForm;