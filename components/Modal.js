import styles from '../styles/Modal.module.css'
import React, {useEffect} from "react";
import Portal from "./Portal";

const Modal = ({title = null, modalValue, closeModal, children, fullScreen = false}) => {

	const handleClose = () => {
		closeModal(false);
		let body = document.querySelector('body');
		body.removeAttribute("style");
	}
	useEffect(() => {
		let body = document.querySelector('body');
		if (modalValue) {
			body.style.overflow = "hidden";
			if (document.body.scrollHeight > window.innerHeight)
				body.style.paddingRight = "1rem";

			let modal = document.querySelector(".modal");
			if (modal) {
				// modal.addEventListener("click", (event) => {
				// 	const modalContent = document.querySelector("[data-modal-content]");
				// 	if (!modalContent.contains(event.target)) {
				// 		handleClose();
				// 	}
				// });
				// document.addEventListener('keydown', (event) => {
				// 	if (modalValue && event.key === 'Escape') {
				// 		handleClose();
				// 	}
				// });
			}
		}
	}, [modalValue]);
	return (
			<div
					className={['modal', styles.modal, modalValue ? styles.open : null, fullScreen ? styles.fullScreen : ''].join(' ')}
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
