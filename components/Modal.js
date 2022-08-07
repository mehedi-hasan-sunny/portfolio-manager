import styles from '../styles/Modal.module.css'
import {useEffect} from "react";

const Modal = ({title, modalValue, closeModal, children}) => {
	let body = document.querySelector('body');
	const handleClose = () => {
		closeModal(false);
		body.removeAttribute("style");
	}
	useEffect(() => {
		if (modalValue) {
			body.style.overflow = "hidden";
			if(document.body.scrollHeight > window.innerHeight)
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
			<div className={['modal', styles.modal, modalValue ? styles.open : null].join(' ')} data-modal={true}>
				<div className={styles.modalWrapper}>
					<div className={styles.modalContent} data-modal-content={modalValue}>
						<div className={styles.modalTitle}>
							<h3 className={"mb-3 fw-500"}>{title}</h3>
							<button className={styles.modalCloseBtn} onClick={() => handleClose()}>&times;</button>
						</div>
						<div className={"d-flex flex-wrap flex-column"}>
							{children}
						</div>
					</div>
				</div>
			
			</div>
	);
};

export default Modal;
