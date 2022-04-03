import React, {useState} from "react";
import Modal from "../../components/Modal";
import LinkCategoryForm from "../../components/LinkCategoryForm";
import GoBack from "../../components/custom/GoBack";

export async function getServerSideProps(context) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/link-category`)
	const {data} = await res.json()
	return {
		props: {linkCategories: data ? data : []}
	}
}

function LinkCategory({linkCategories = []}) {
	
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedLink, setSelectedLink] = useState(null);
	
	const toggleModal = () => {
		setModalOpen(prev => !prev)
	}
	const handleSelectedLink = (item) => {
		setSelectedLink(item)
	}
	const successAction = (data) => {
		console.log(data)
		toggleModal()
		window.location.reload()
	}
	
	const deleteLinkCategory = async (id) => {
		
		let text = "Are you sure?\nYou are about to delete this link category!";
		if (confirm(text) === true) {
			const res = await fetch(`/api/admin/link-category/${id}`, {method: "delete"})
			const {data} = await res.json()
			if (data) {
				window.location.reload()
			}
		}
	}
	
	return (
			<div className={"container"}>
				<div className={"d-flex align-center justify-space-between mb-3"}>
					<h2 className={"mb-0"}><GoBack/> Link Categories</h2>
					<a href={"#"} className={"btn btn-sm"} onClick={(e) => {
						e.preventDefault();
						toggleModal();
					}}>
						<i className={"las la-plus-circle mr-3"}/> Add
					</a>
				</div>
				<div className={"table-rounded"}>
					<table className={"w-100 table"}>
						<thead>
						<tr>
							<td width={"50%"}>Item</td>
							<td width={"50%"}>Action</td>
						</tr>
						</thead>
						<tbody>
						
						{
							linkCategories.map((item, index) => {
								return (
										<tr key={index}>
											<td>
												<div className={"d-flex align-center gap-1"}>
													<i className={item.icon + " la-2x"}/> <span>{item.title}</span>
												</div>
											</td>
											<td>
												<div className={"d-flex align-center gap-1"}>
													<button className={"transparent-btn"} aria-label={"Edit link"}
													        onClick={() => {
														        handleSelectedLink(item);
														        toggleModal();
													        }}>
														<i className={"las la-edit"}/>
													</button>
													
													<button className={"transparent-btn"} aria-label={"Delete link"}
													        onClick={() => { deleteLinkCategory(item.id)}}>
														<i className={"las la-trash-alt text-danger"}/>
													</button>
												</div>
											</td>
										</tr>
								)
							})
						}
						</tbody>
					</table>
				</div>
				
				{
					modalOpen ?
							(
									<Modal title={`${!selectedLink ? "Create" : "Update"} Link Category`}
									       modalValue={modalOpen}
									       closeModal={toggleModal}>
										<LinkCategoryForm linkCategory={selectedLink} onSuccessAction={successAction}/>
									</Modal>
							) : null
				}
			</div>
	);
}

export default LinkCategory;