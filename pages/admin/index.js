import React, {useEffect, useState} from 'react';
import profileStyles from "../../styles/Profile.module.css";
import styles from "../../styles/Admin.module.css";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import CreateProjectForm from "../../components/CreateProjectForm";
import ProfileForm from "../../components/ProfileForm";

export async function getServerSideProps(context) {
	const profileRes = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/profile`)
	const {data: profileData} = await profileRes.json()
	const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/projects`)
	const {data: projects} = await res.json()
	
	return {
		props: {profile: profileData ? profileData : null, projects: projects ? projects : []}, // will be passed to the page component as props
	}
}

function Index({profile = null, projects = []}) {
	const [modalOpen, setModalOpen] = useState(false);
	const [profileModal, setProfileModalOpen] = useState(false);
	const [selectedProject, setSelectedProjectProject] = useState(null);
	const handleModalClose = () => {
		setModalOpen(false)
	}
	const toggleModal = () => {
		setModalOpen(prev => !prev)
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
			const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/projects/${id}`, {method: "delete"})
			const {data} = await res.json()
			console.log(data)
			if (data) {
				window.location.reload()
			}
		}
	}
	const successAction = (data) => {
		console.log(data, successAction)
		handleModalClose()
		window.location.reload()
	}
	
	useEffect(() => {
		console.log("profile", profile)
		console.log("projects", projects)
	}, [])
	
	return (
			<div className={"container"}>
				<div className={"row align-center justify-space-between mb-3"}>
					<div className={"col"}>
						{
							profile ?
									
									<div className={"d-flex align-center gap-1 hoverable"} onClick={() => toggleProfileModal()}>
										<img className={profileStyles.avatar + " mb-0"}
										     src={profile.displayPicture} style={{width: '60px', height: '60px'}}
										     alt=""/>
										<span>{`${profile.firstName} ${profile.lastName}`}</span>
									</div>
									:
									
									<>
										<i className="las la-user-circle la-3x hoverable" onClick={() => toggleProfileModal()}/>
									</>
						}
					
					</div>
					<div className={"col"}>
						<div className={styles.createProjectBtn + " ml-auto"} onClick={() => {
							setSelectedProjectProject(null)
							toggleModal()
						}}>
							<i className={"las la-plus-circle"}/>
							<br/>
							Create project
						</div>
					</div>
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
				</div>
			</div>
	);
}

export default Index;
