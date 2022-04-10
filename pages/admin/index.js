import React, {useEffect, useState} from 'react';
import profileStyles from "../../styles/Profile.module.css";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import CreateProjectForm from "../../components/CreateProjectForm";
import ProfileForm from "../../components/ProfileForm";
import ActionButton from "../../components/admin/custom/ActionButton";
import {empty} from "../../helpers/common";
import ProfilePictureCropper from "../../components/ProfilePictureCropper";

export async function getServerSideProps(context) {
	const profileRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profile`)
	const {data: profileData} = await profileRes.json()
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/projects`)
	const {data: projects} = await res.json()
	
	return {
		props: {profile: profileData, projects: projects ? projects : []}, // will be passed to the page component as props
	}
}

function Index({profile, projects = []}) {
	
	const [modalOpen, setModalOpen] = useState(false);
	const [profilePictureModalOpen, setProfilePictureModalOpen] = useState(false);
	const [profileModal, setProfileModalOpen] = useState(false);
	const [selectedProject, setSelectedProjectProject] = useState(null);
	const handleModalClose = () => {
		setModalOpen(false)
	}
	const toggleModal = () => {
		setModalOpen(prev => !prev)
	}
	
	const toggleProfilePictureModal = () => {
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
	
	return (
			<div className={"container"}>
				<div className={"row align-center justify-space-between mb-3"}>
					<div className={"col"}>
						<div className={"d-flex align-center gap-1 "}>
							<button className={"transparent-btn"} onClick={() => toggleProfilePictureModal()}>
								{
									!empty(profile)
											? <img className={profileStyles.avatarAdmin + " mb-0"}
											       src={profile.displayPicture} style={{width: '60px', height: '60px'}}
											       alt=""/>
											: <i className="las la-user-circle la-3x hoverable"/>
								}
							</button>
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
				
				<div className={"row gap-2"}>
					
					<div className={"d-inline-flex gap-1"} style={{width: '14rem'}}>
						<button className={"btn "} style={{minWidth: '6.5rem', width: '6.5rem'}}>
							red
						</button>
						<button className={"btn"} style={{minWidth: '6.5rem', width: '6.5rem'}}>
							red
						</button>
					</div>
					
					<ActionButton size={"large"} title={"Create project"} icon={"la-plus-circle"}
					              onClick={(e) => {
						              setSelectedProjectProject(null);
						              toggleModal();
					              }}/>
					
					<ActionButton size={"large"} icon={"la-link"} title={"Link Categories"} link={"/admin/link-category"}/>
					
					<ActionButton size={"large"} icon={"la-trophy"} title={"Experience"} link={"/admin/experience"}/>
				
				</div>
				
				
				<div className={"row"}>
					{
						projects && projects.map((item, index) => {
							return (
									<div className={"col-6 mb-3"} key={index}>
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
										      className={"mb-2"}/>
										<div className={"d-flex justify-space-between"}>
											<h4 className={"px-2"}>{item.title}</h4>
											<div>
												<i className={"las la-edit hoverable"} onClick={() => {
													handleSelectProject(item)
													toggleModal();
												}}/>
												&nbsp;
												<i className="las la-trash-alt ml-auto text-danger" onClick={() => deleteProject(item.id)}/>
											</div>
										
										</div>
									</div>
							)
						})
					}
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
											<ProfilePictureCropper image={!empty(profile) ? profile.displayPicture : null}/>
										</Modal>
								) : null
					}
				</div>
			</div>
	);
}

export default Index;
