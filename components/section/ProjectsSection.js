import {useState} from 'react';
import Project from "../Project";
import Modal from "../Modal";
import modalStyles from "../../styles/Modal.module.css";

function ProjectsSection({projects}) {
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
	
	return (
			<section>
				<h2 className={"row fw-bold pb-4 border-bottom-2-dark ps-2 ps-md-0"}>
				<span data-aos={"fade-left"}>UI UX Case Studies</span>
				</h2>
				
				{
					projects.map((project, index) => {
						return <Project order={index+1} className={"border-bottom-2-dark"} project={project} key={index} handleSelectedItem={handleSelectedItem}/>
					})
				}
				
				{
					selectedItem ?
							(
									<Modal title={selectedItem.title} modalValue={modalOpen} closeModal={handleModalClose}>
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