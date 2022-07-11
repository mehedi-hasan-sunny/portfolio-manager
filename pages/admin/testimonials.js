import React, {useState} from "react";
import Modal from "../../components/Modal";
import TestimonialsForm from "../../components/admin/forms/TestimonialsForm";
import GoBack from "../../components/custom/GoBack";
import TestimonialsSection from "../../components/section/TestimonialsSection";
import AddButton from "../../components/custom/AddButton";

export async function getServerSideProps(context) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/testimonials`)
		const {data} = await res.json()
		return {
			props: {testimonials: data ? data.reverse() : []}
		}
	} catch (e) {
		return {
			props: {testimonials: []}
		}
	}
}

function Testimonials({testimonials = []}) {
	
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedSkill, setSelectedSkill] = useState(null);
	
	const toggleModal = () => {
		setModalOpen(prev => !prev)
	}
	const handleSelectedSkill = (item) => {
		setSelectedSkill(item)
		toggleModal()
	}
	const successAction = (data) => {
		toggleModal()
		window.location.reload()
	}
	
	const deleteSkill = async (id) => {
		
		let text = "Are you sure?\nYou are about to delete this skill!";
		if (confirm(text) === true) {
			const res = await fetch(`/api/admin/testimonials/${id}`, {method: "delete"})
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
					<AddButton toggleModal={toggleModal}/>
				</div>
				<TestimonialsSection testimonials={testimonials} isAdmin={true}
				                       editSkill={handleSelectedSkill}
				                       deleteSkill={deleteSkill}/>
				
				{
					modalOpen ?
							(
									<Modal title={`${!selectedSkill ? "Create" : "Update"} Skill `}
									       modalValue={modalOpen}
									       closeModal={toggleModal}>
										<TestimonialsForm skill={selectedSkill} onSuccessAction={successAction}/>
									</Modal>
							) : null
				}
			</div>
	);
}

export default Testimonials;