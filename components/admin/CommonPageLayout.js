import {Component, createElement} from "react";
import Modal from "../../components/Modal";
import GoBack from "../../components/custom/GoBack";
import dynamic from "next/dynamic";
import {empty, ucFirst} from "../../helpers/common";


export default class CommonPageLayout extends Component {
	constructor({
		            sectionDataName,
		            singleItemName,
		            adminApiUrl,
		            sectionComponentName,
		            sectionFormName,
		            responseData = []
	            }) {
		super();
		this.sectionDataName = sectionDataName;
		this.singleItemName = singleItemName;
		this.adminApiUrl = adminApiUrl;
		this.sectionComponentName = sectionComponentName;
		this.sectionFormName = sectionFormName;
		this.responseData = responseData;
		if (this.sectionComponentName) {
			this.SectionComponent = dynamic(() => import(`../../components/section/${this.sectionComponentName}`), {ssr: false});
		}
		
		this.SectionFormComponent = dynamic(() => import(`../../components/admin/forms/${this.sectionFormName}`), {ssr: false});
		
		this.sectionFromComponentProps = {
			[this.singleItemName]: this.state.selectedItem,
			onSuccessAction: this.successAction
		}
		
		this.sectionComponentProps = {
			[this.sectionDataName]: this.responseData,
			isAdmin: true,
			["edit" + ucFirst(this.singleItemName)]: this.handleSelectedAction,
			["delete" + ucFirst(this.singleItemName)]: this.deleteAction
		}
		
		this.title = (!this.state.selectedItem ? "Create " : "Update ") + this.singleItemName.replace( /([A-Z])/g, " $1" ).toLowerCase();
	}
	
	state = {
		modalOpen: false,
		selectedItem: null
	}
	
	setModalOpen = (val) => {
		this.setState(state => ({
			...state,
			modalOpen: val
		}))
	}
	setSelectedItem = (item) => {
		this.setState(state => ({
			...state,
			selectedItem: item
		}));
		this.sectionFromComponentProps[this.singleItemName] = item;
	}
	closeModal = () => {
		this.toggleModal()
		this.sectionFromComponentProps[this.singleItemName] = null
		this.setSelectedItem(null)
	}
	toggleModal = () => {
		this.setModalOpen(!this.state.modalOpen)
		
	}
	handleSelectedAction = (item) => {
		this.setSelectedItem(item)
		this.toggleModal()
	}
	successAction = (data) => {
		this.toggleModal()
		window.location.reload()
	}
	
	deleteAction = async (id) => {
		let text = `Are you sure?\nYou are about to delete this ${this.singleItemName.toLowerCase()}!`;
		if (confirm(text) === true) {
			const res = await fetch(`/api/admin/${this.adminApiUrl}/${id}`, {method: "delete"})
			const {data} = await res.json()
			if (data) {
				window.location.reload()
			}
		}
	}
	
	
	render() {
		
		return <div className={"container"}>
			<div className={"d-flex align-center justify-space-between mb-3"}>
				<GoBack/>
				<a href={"#"} className={"btn btn-sm bg-olive text-white border-1"} onClick={(e) => {
					e.preventDefault();
					this.toggleModal();
				}}>
					<i className={"las la-plus-circle me-1"}/> Add
				</a>
			</div>
			
			{
				createElement(this.SectionComponent, this.sectionComponentProps)
			}
			
			{
				this.state.modalOpen ?
						(
								<Modal title={this.title} modalValue={this.state.modalOpen} closeModal={this.closeModal}>
									{
										createElement(this.SectionFormComponent, this.sectionFromComponentProps)
									}
								</Modal>
						) : null
			}
		</div>
	}
}