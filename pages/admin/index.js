import React, {useCallback, useMemo, useState} from 'react';
import profileStyles from "../../styles/Profile.module.css";
import Modal from "../../components/Modal";
import CreateProjectForm from "../../components/admin/forms/CreateProjectForm";
import ProfileForm from "../../components/admin/forms/ProfileForm";
import ActionButton from "../../components/admin/custom/ActionButton";
import {empty} from "../../helpers/common";
import ProfilePictureCropper from "../../components/section/ProfilePictureCropper";
import {DELETE, GET} from "../../actions/http";
import ActionButtons from "../../components/admin/ActionButtons";
import Projects from "../../components/admin/Projects";
import {removeCookies} from "cookies-next";

export async function getServerSideProps(context) {
	try {
		
		const {data: profileData} = await GET(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/admin/profile`).setContext(context).exec();
		const {data: projects} = await GET(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/admin/projects`).setContext(context).exec();
		
		return {
			props: {profile: profileData ?? null, projects: projects ?? []}, // will be passed to the page component as props
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
	const [profilePictureModalType, setProfilePictureModalType] = useState("edit");
	const [profileModal, setProfileModalOpen] = useState(false);
	const [selectedProject, setSelectedProjectProject] = useState(null);
	const handleModalClose = useCallback(() => {
		setModalOpen(false)
	});
	const toggleModal = useCallback(() => {
		setModalOpen(prev => !prev)
	});
	
	const toggleProfilePictureModal = useCallback((type = "edit") => {
		setProfilePictureModalType(type);
		setProfilePictureModalOpen(prev => !prev)
	});
	
	const toggleProfileModal = useCallback(() => {
		selectedProject ? setSelectedProjectProject(null) : null
		setProfileModalOpen(prev => !prev)
	})
	
	
	const handleSelectProject = useCallback((value) => {
		setSelectedProjectProject(value)
	})
	const deleteProject = useCallback(async (id) => {
		
		let text = "Are you sure?\nYou are about to delete this project!.";
		if (confirm(text) === true) {
			const {data} = await DELETE(`/api/admin/projects/${id}`).exec();
			if (data) {
				window.location.reload()
			}
		}
	})
	const successAction = useCallback((data) => {
		handleModalClose()
		window.location.reload()
	})
	const profilePictureSuccessAction = useCallback((data) => {
		profile.displayPicture = data;
		setProfilePictureModalOpen(prev => !prev)
	})
	
	
	const memoActionButtons = useMemo(() => [{
		title: "Create project", icon: 'la-plus-circle', primary: true, onClick() {
			setSelectedProjectProject(null);
			toggleModal();
		}
	}, {
		title: "Link Categories", icon: 'la-link', link: '/admin/link-categories'
	}, {
		title: "Experiences", icon: 'la-trophy', link: '/admin/experiences'
	}, {
		title: "Educations", icon: 'la-university', link: '/admin/educations'
	}, {
		title: "Certifications", icon: 'la-school', link: '/admin/certifications'
	}, {
		title: "Skills", icon: 'la-wave-square', link: '/admin/skills'
	}, {
		title: "Testimonials", icon: 'la-comment', link: '/admin/testimonials'
	}, {
		title: "Services", icon: 'la-briefcase', link: '/admin/services'
	}, {
		title: "Blogs", icon: 'la-book-reader', link: '/admin/blogs'
	}, {
		title: "Settings", icon: 'la-cog', link: '/admin/settings'
	}], []);
	
	const projectProps = useMemo(() => {
		return {projects, handleSelectProject, toggleModal, deleteProject}
	}, []);
	
	const proFileModalProps = useMemo(() => {
		return {profile, successAction}
	}, []);

	const logout = () =>{
		removeCookies('token');
		removeCookies('user');
		window.location.href = "/login";
	}
	
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
										profile?.displayPicture ? <button className={"transparent-btn px-3 py-2 w-100 text-left border-bottom"}
										                                  onClick={() => toggleProfilePictureModal()}>Edit
										</button> : null
									}
									<button className={"transparent-btn px-3 py-2 w-100 text-left border-bottom"}
											onClick={() => logout()}>
										Logout
									</button>
								
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
				<ActionButtons actionButtons={memoActionButtons}/>
				
				<Projects {...projectProps}/>
				
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
					profileModal ? <Modal title={"Profile"} modalValue={profileModal} closeModal={toggleProfileModal}>
						<ProfileForm {...proFileModalProps}/>
					</Modal> : <></>
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

export default React.memo(Index);
