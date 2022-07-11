import React, {useState} from "react";
import Modal from "../../components/Modal";
import EducationForm from "../../components/admin/forms/EducationForm";
import GoBack from "../../components/custom/GoBack";
import EducationsSection from "../../components/section/EducationsSection";

export async function getServerSideProps(context) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/educations`)
		const {data} = await res.json()
		return {
			props: {educations: data ? data : []}
		}
	} catch (e) {
		return {
			props: {educations: []}
		}
	}
}

function Educations({educations = []}) {
	
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedEducation, setSelectedEducation] = useState(null);
	
	const toggleModal = () => {
		setModalOpen(prev => !prev)
	}
	const handleSelectedEducation = (item) => {
		setSelectedEducation(item)
		toggleModal()
	}
	const successAction = (data) => {
		toggleModal()
		window.location.reload()
	}
	
	const deleteEducation = async (id) => {
		
		let text = "Are you sure?\nYou are about to delete this education!";
		if (confirm(text) === true) {
			const res = await fetch(`/api/admin/educations/${id}`, {method: "delete"})
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
				<EducationsSection educations={educations} isAdmin={true} editEducation={handleSelectedEducation}
				                   deleteEducation={deleteEducation}/>
				
				{
					modalOpen ?
							(
									<Modal title={`${!selectedEducation ? "Create" : "Update"} Education `}
									       modalValue={modalOpen}
									       closeModal={toggleModal}>
										<EducationForm education={selectedEducation} onSuccessAction={successAction}/>
									</Modal>
							) : null
				}
			</div>
	);
}

export default Educations;