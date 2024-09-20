import styles from '../styles/Modal.module.css'
import React, {useEffect} from "react";
import Portal from "./Portal";

const Modal = ({title = null, modalValue, closeModal, children, fullScreen = false, escapeKeyClose = false, sideClickClose = false, modalClass = null}) => {

	const handleClose = () => {
		closeModal(false);
	}
	useEffect(() => {
		const html = document.querySelector('html');
		const body = document.querySelector('body');
		if (modalValue) {
			html.style.overflowY = "hidden";
			body.style.paddingRight = "17px";
		}
		
		const modalClick = (event) => {
			const modalContent = document.querySelector("[data-modal-content]");
			if (!modalContent.contains(event.target)) {
				handleClose();
			}
		};
		const modal = document.querySelector(".modal");
		if (modal && sideClickClose) {
			modal.addEventListener("click", modalClick);
		}
		
		const keyDown = (event) => {
			if (modalValue && event.key === 'Escape') {
				handleClose();
			}
		}
		if(escapeKeyClose){
			document.addEventListener('keydown', keyDown);
		}
		
		
		return () => {
			document.removeEventListener('keydown', keyDown);
			modal.removeEventListener("click", modalClick);
			html.removeAttribute("style");
			body.removeAttribute("style");
		}
	}, [modalValue, escapeKeyClose,sideClickClose]);
	return (
			<div
					className={['modal', modalClass ? styles[modalClass] : null, styles.modal, modalValue ? styles.open : null, fullScreen ? styles.fullScreen : ''].join(' ')}
					data-modal={true}>
				<div className={styles.modalWrapper}>
					<div className={styles.modalContent} data-modal-content={modalValue}>

						{
							title ?
									<div className={styles.modalTitle}>
										<h3 className={"mb-3 fw-500"}>{title}</h3>
									</div>
									: null
						}
						<div className={"d-flex flex-wrap flex-column"}>
							{children}
						</div>
					</div>
				</div>
				<button className={styles.modalCloseBtn} onClick={() => handleClose()}>&times;</button>
			</div>
	);
};

export default Portal(Modal);
