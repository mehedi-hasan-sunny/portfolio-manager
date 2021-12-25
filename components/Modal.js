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
			body.style.paddingRight = "1rem";
		}
		
		if (modalValue) {
			let modal = document.querySelector(".modal");
			if (modal) {
				// modal.addEventListener("click", (event) => {
				// 	const modalContent = document.querySelector("[data-modal-content]");
				//
				// 	if (!modalContent.contains(event.target)) {
				// 		handleClose();
				// 	}
				// });
				modal.addEventListener('keydown', (event) => {
					if (event.key === 'Escape') {
						handleClose();
					}
				});
			}
		}
	}, [body.style, modalValue]);
	return (
			<div className={['modal', styles.modal, modalValue ? styles.open : null].join(' ')} data-modal={true}>
				<div className={styles.modalWrapper}>
					<div className={styles.modalContent} data-modal-content={modalValue}>
						<div className={styles.modalTitle}>
							<h3 className={"mb-3"}>{title}</h3>
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
