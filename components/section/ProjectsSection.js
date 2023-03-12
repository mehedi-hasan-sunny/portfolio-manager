import {useState} from 'react';
import Project from "../Project";
import Modal from "../Modal";
import modalStyles from "../../styles/Modal.module.css";
import {empty, ucFirst} from "../../helpers/common";
import DribbbleShot from "../DribbbleShot";

function ProjectsSection({projects, sectionTitle = null, settings = null, dribbbleShots = []}) {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	
	const handleSelectedItem = (project) => {
		setSelectedItem(project)
		setModalOpen(true)
	}
	
	const handleModalClose = (value) => {
		setModalOpen(false)
		setSelectedItem(null)
	}
	
	const [currentTab, setCurrentTab] = useState(!empty(settings?.default_tab) ? 'default' : (!empty(settings?.apis?.dribbble_shots?.api_url) ? 'dribbble_shots' : ''));
	const handleTabSelection = (value) => {
		setCurrentTab(value)
	}
	const checkActiveTab = (value) => {
		return currentTab === value ? 'active' : ''
	}
	
	const settingsDribbbleShots = settings?.apis?.dribbble_shots;
	
	return (
			<section>
				{
					sectionTitle ? (
							<h2 className={"row fw-bold pb-4 border-bottom-2 ps-2 ps-md-0"}>
								<span data-aos={"fade-left"}>{sectionTitle ?? 'Projects'}</span>
							</h2>
					) : null
				}
				
				<div className={"tabs mb-4 pt-0 border-0"}>
					{
						!empty(settings?.default_tab) ?
								<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab('default')}`}
								        key={'tab-' + 0}
								        onClick={() => handleTabSelection('default')}> {ucFirst(settings?.default_tab ?? 'Projects')}
								</button> : null
					}
					{
						!empty(settingsDribbbleShots?.api_url) ?
								<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab('dribbble_shots')}`}
								        key={'tab-' + 1} onClick={() => handleTabSelection('dribbble_shots')}> Dribbble Shots
								</button> : null
					}
				</div>
				
				
				{
					currentTab === 'default' ?
							<div className={`tab-content ${currentTab === 'default' ? 'active' : ''}`} data-tab={'default'}>
								{
									projects.map((project, index) => {
										return <Project order={index + 1} className={"border-bottom-2"} project={project} key={index}
										                handleSelectedItem={handleSelectedItem}/>
									})
								}
							</div>
							: null
				}
				{
					currentTab === 'dribbble_shots' ?
							<div className={`row tab-content ${currentTab === 'dribbble_shots' ? 'd-flex' : ''}`}
							     data-tab={'dribbble_shots'}>
								{
									dribbbleShots.map((dribbbleShot, index) => {
										return <div className={"col-12 col-sm-6 col-lg-4 mb-2 mb-md-3"} key={index} data-aos={"fade-up"}>
											<DribbbleShot shot={dribbbleShot}/>
										</div>
									})
								}
							</div>
							: null
				}
				
				
				{
					selectedItem ?
							(
									<Modal title={selectedItem.title} modalValue={modalOpen} closeModal={handleModalClose}
									       escapeKeyClose={true} sideClickClose={true}>
										<div className={modalStyles.modalLinks}>
											<div className={"d-flex flex-column"}>
												{
													selectedItem.links.map((item, index) => {
														return (<a rel={"noreferrer"} href={item.url} target={"_blank"} key={index}>
															<i className={item.icon + " la-2x mb-2"}/>
														</a>)
													})
												}
											</div>
										</div>
										<div className={"d-flex flex-column"} style={{
											borderBottomLeftRadius: "10px",
											borderBottomRightRadius: "10px",
											overflow: 'hidden'
										}}>
											{
													selectedItem.images && selectedItem.images.filter(item => !item.isThumbnail).map((item, index) => {
														return <img className={modalStyles.modalImage} src={item.url} key={index} loading={"lazy"}
														            alt={selectedItem.title + ' ' + index}/>
													})
											}
										</div>
									
									
									</Modal>
							) : null
				}
			
			</section>
	);
}

export default ProjectsSection;
