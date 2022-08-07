import React, {useState} from 'react';
import profileStyles from "../../styles/Profile.module.css";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import CreateProjectForm from "../../components/admin/forms/CreateProjectForm";
import ProfileForm from "../../components/admin/forms/ProfileForm";
import ActionButton from "../../components/admin/custom/ActionButton";
import {empty} from "../../helpers/common";
import ProfilePictureCropper from "../../components/section/ProfilePictureCropper";

export async function getServerSideProps(context) {
	console.log(context.req.cookies)
	try {
		const profileRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profile`, {
			method: "GET",
			headers: {
				token: context.req?.cookies?.token ?? ''
			}
		})
		const {data: profileData} = await profileRes.json()
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/projects`,{
			method: "GET",
			headers: {
				token: context.req?.cookies?.token ?? ''
			}
		})
		const {data: projects} = await res.json()
		
		return {
			props: {profile: profileData, projects: projects ? projects : []}, // will be passed to the page component as props
		}
	} catch (e) {
		return {
			props: {profile: null, projects: []},
		}
	}
}

function Index({profile, projects = []}) {
	const [modalOpen, setModalOpen] = useState(false);
	const [profilePictureModalOpen, setProfilePictureModalOpen] = useState(false);
	const [profilePictureModalType, setProfilePictureModalType] = useState(null);
	const [profileModal, setProfileModalOpen] = useState(false);
	const [selectedProject, setSelectedProjectProject] = useState(null);
	const handleModalClose = () => {
		setModalOpen(false)
	}
	const toggleModal = () => {
		setModalOpen(prev => !prev)
	}
	
	const toggleProfilePictureModal = (type = "edit") => {
		setProfilePictureModalType(type);
		setProfilePictureModalOpen(prev => !prev)
	}
	const toggleProfileModal = () => {
		selectedProject ? setSelectedProjectProject(null) : null
		setProfileModalOpen(prev => !prev)
	}
	
	
	const handleSelectProject = (value) => {
		setSelectedProjectProject(value)
	}
	const deleteProject = async (id) => {
		
		let text = "Are you sure?\nYou are about to delete this project!.";
		if (confirm(text) === true) {
			const res = await fetch(`/api/admin/projects/${id}`, {method: "delete"})
			const {data} = await res.json()
			if (data) {
				window.location.reload()
			}
		}
	}
	const successAction = (data) => {
		handleModalClose()
		window.location.reload()
	}
	const profilePictureSuccessAction = (data) => {
		profile.displayPicture = data;
		setProfilePictureModalOpen(prev => !prev)
	}
	
	
	const actionButtons = [{
		title: "Create project", icon: 'la-plus-circle', primary: true, onClick() {
			setSelectedProjectProject(null);
			toggleModal();
		}
	}, {
		title: "Link Categories", icon: 'la-link', link: '/admin/link-categories'
	}, {
		title: "Experiences", icon: 'la-trophy', link: '/admin/experiences'
	}, {
		title: "Educations", icon: 'la-school', link: '/admin/educations'
	}, {
		title: "Certifications", icon: 'la-certificate', link: '/admin/certifications'
	}, {
		title: "Skills", icon: 'la-wave-square', link: '/admin/skills'
	}, {
		title: "Testimonials", icon: 'la-comment', link: '/admin/testimonials'
	}, {
		title: "Services", icon: 'la-briefcase', link: '/admin/services'
	},]
	
	return (
			<div className={"container"}>
				<div className={"row align-center justify-space-between mb-3"}>
					<div className={"col"}>
						<div className={"d-flex align-center gap-1 "}>
							<div className={profileStyles.avatarAdminContainer}>
								<button className={"transparent-btn"}>
									{
										!empty(profile) && !empty(profile.displayPicture)
												? <img className={profileStyles.avatarAdmin + " mb-0"}
												       src={profile.displayPicture.displayPicture} style={{width: '60px', height: '60px'}}
												       alt=""/>
												: <i className="las la-user-circle la-3x hover-able"/>
									}
								</button>
								<div className={profileStyles.profileImgDropdown}>
									<button className={"transparent-btn px-3 py-2 w-100 text-left border-bottom"}
									        onClick={() => toggleProfilePictureModal("upload")}>
										Upload
									</button>
									{
										profile?.displayPicture ? <button className={"transparent-btn px-3 py-2 w-100 text-left"}
										                                  onClick={() => toggleProfilePictureModal()}>Edit
										</button> : null
									}
								
								</div>
							</div>
							{
								!empty(profile) ?
										<button className={"transparent-btn fs-1"}
										        onClick={() => toggleProfileModal()}>
											
											<span>{`${profile.firstName} ${profile.lastName}`}</span>
										</button>
										: null
							}
						</div>
					</div>
					<div className={"col"}>
						<ActionButton className={"pull-right"} title={"Edit profile"} size={"small"} icon={"la-edit"}
						              onClick={() => toggleProfileModal()}/>
					</div>
				</div>
				
				
				{/*actions*/}
				
				<div className={"row gap-xs-1 gap-2 mb-4 px-3"}>
					{
						actionButtons.map((actionButton, index) => {
							return <ActionButton size={"large"} {...actionButton} key={index}/>
						})
					}
				</div>
				
				
				<div className={"row"}>
					{
							projects && projects.map((item, index) => {
								return (
										<div className={"col-xs-12  col-sm-6 col-lg-4 mb-3"} key={index}>
											<Card key={index} imgSrc={
												item.images ?
														(() => {
															if (item.images.length) {
																const thumbnail = item.images.find(item => item.isThumbnail);
																return thumbnail ? thumbnail.url : item.images[0].url;
															} else {
																return "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
															}
														})() : null}
											      className={"mb-2"}
											      onClick={() => {
												      handleSelectProject(item)
												      toggleModal();
											      }}
											/>
											<div className={"d-flex justify-space-between"}>
												<h4 className={"px-2"}>{item.title}</h4>
												<div>
													<i className={"las la-edit hover-able"} onClick={() => {
														handleSelectProject(item)
														toggleModal();
													}}/>
													&nbsp;
													<i className="las la-trash-alt ms-auto text-danger" onClick={() => deleteProject(item.id)}/>
												</div>
											
											</div>
										</div>
								)
							})
					}
				</div>
				{
					modalOpen ?
							(
									<Modal title={`${!selectedProject ? "Create" : "Update"} Project`} modalValue={modalOpen}
									       closeModal={handleModalClose}>
										<CreateProjectForm project={selectedProject} onSuccessAction={successAction}/>
									</Modal>
							) : null
				}
				
				{
					profileModal ?
							(
									<Modal title={"Profile"} modalValue={profileModal} closeModal={toggleProfileModal}>
										<ProfileForm onSuccessAction={successAction} profile={profile}/>
									</Modal>
							) : null
				}
				
				{
					profilePictureModalOpen ?
							(
									<Modal title={"Profile Picture"} modalValue={profilePictureModalOpen}
									       closeModal={toggleProfilePictureModal}>
										<ProfilePictureCropper
												profileId={profile?.id}
												displayPicture={!empty(profile?.displayPicture) && profilePictureModalType !== "upload" ? profile.displayPicture : null}
												onSuccessAction={profilePictureSuccessAction}
										/>
									</Modal>
							) : null
				}
			</div>
	);
}

export default Index;
