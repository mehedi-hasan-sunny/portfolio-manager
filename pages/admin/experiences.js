import React, {useState} from "react";
import Modal from "../../components/Modal";
import ExperienceForm from "../../components/admin/forms/ExperienceForm";
import GoBack from "../../components/custom/GoBack";
import ExperiencesSection from "../../components/section/ExperiencesSection";

export async function getServerSideProps(context) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/experiences`)
		const {data} = await res.json()
		return {
			props: {experiences: data ? data : []}
		}
	} catch (e) {
		return {
			props: {experiences: []}
		}
	}
}

function Experiences({experiences = []}) {
	
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedExperience, setSelectedExperience] = useState(null);
	
	const toggleModal = () => {
		setModalOpen(prev => !prev)
	}
	const handleSelectedExperience = (item) => {
		setSelectedExperience(item)
		toggleModal()
	}
	const successAction = (data) => {
		toggleModal()
		window.location.reload()
	}
	
	const deleteExperience = async (id) => {
		
		let text = "Are you sure?\nYou are about to delete this experience!";
		if (confirm(text) === true) {
			const res = await fetch(`/api/admin/experience/${id}`, {method: "delete"})
			const {data} = await res.json()
			if (data) {
				window.location.reload()
			}
		}
	}
	
	return (
			<div className={"container"}>
				<div className={"d-flex align-center justify-space-between mb-3"}>
					<GoBack/>
					<a href={"#"} className={"btn btn-sm"} onClick={(e) => {
						e.preventDefault();
						toggleModal();
					}}>
						<i className={"las la-plus-circle me-3"}/> Add
					</a>
				</div>
				
				<ExperiencesSection
						className={"border-bottom"} experiences={experiences}
						isAdmin={true} editExperience={handleSelectedExperience} deleteExperience={deleteExperience}/>
				
				{
					modalOpen ?
							(
									<Modal title={`${!selectedExperience ? "Create" : "Update"} Experience `}
									       modalValue={modalOpen}
									       closeModal={toggleModal}>
										<ExperienceForm experience={selectedExperience} onSuccessAction={successAction}/>
									</Modal>
							) : null
				}
			</div>
	);
}

export default Experiences;