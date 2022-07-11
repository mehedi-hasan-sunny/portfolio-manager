import React, {useState} from "react";
import Modal from "../../components/Modal";
import CertificationForm from "../../components/admin/forms/CertificationForm";
import GoBack from "../../components/custom/GoBack";
import CertificationsSection from "../../components/section/CertificationsSection";
import AddButton from "../../components/custom/AddButton";

export async function getServerSideProps(context) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/certifications`)
		const {data} = await res.json()
		return {
			props: {certifications: data ? data : []}
		}
	} catch (e) {
		return {
			props: {certifications: []}
		}
	}
}

function Certifications({certifications = []}) {
	
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedCertification, setSelectedCertification] = useState(null);
	
	const toggleModal = () => {
		setModalOpen(prev => !prev)
	}
	const handleSelectedCertification = (item) => {
		setSelectedCertification(item)
		toggleModal()
	}
	const successAction = (data) => {
		toggleModal()
		window.location.reload()
	}
	
	const deleteCertification = async (id) => {
		
		let text = "Are you sure?\nYou are about to delete this certification!";
		if (confirm(text) === true) {
			const res = await fetch(`/api/admin/certifications/${id}`, {method: "delete"})
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
				<CertificationsSection certifications={certifications} isAdmin={true}
				                       editCertification={handleSelectedCertification}
				                       deleteCertification={deleteCertification}/>
				
				{
					modalOpen ?
							(
									<Modal title={`${!selectedCertification ? "Create" : "Update"} Certification `}
									       modalValue={modalOpen}
									       closeModal={toggleModal}>
										<CertificationForm certification={selectedCertification} onSuccessAction={successAction}/>
									</Modal>
							) : null
				}
			</div>
	);
}

export default Certifications;