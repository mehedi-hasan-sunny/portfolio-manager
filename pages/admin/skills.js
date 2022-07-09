import React, {useState} from "react";
import Modal from "../../components/Modal";
import SkillsForm from "../../components/admin/forms/SkillsForm";
import GoBack from "../../components/custom/GoBack";
import SkillsSection from "../../components/SkillsSection";

export async function getServerSideProps(context) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/skills`)
		const {data} = await res.json()
		return {
			props: {skills: data ? data.reverse() : []}
		}
	} catch (e) {
		return {
			props: {skills: []}
		}
	}
}

function Skills({skills = []}) {
	
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
			const res = await fetch(`/api/admin/skills/${id}`, {method: "delete"})
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
						<i className={"las la-plus-circle mr-3"}/> Add
					</a>
				</div>
				<SkillsSection skills={skills} isAdmin={true}
				                       editSkill={handleSelectedSkill}
				                       deleteSkill={deleteSkill}/>
				
				{
					modalOpen ?
							(
									<Modal title={`${!selectedSkill ? "Create" : "Update"} Skill `}
									       modalValue={modalOpen}
									       closeModal={toggleModal}>
										<SkillsForm skill={selectedSkill} onSuccessAction={successAction}/>
									</Modal>
							) : null
				}
			</div>
	);
}

export default Skills;