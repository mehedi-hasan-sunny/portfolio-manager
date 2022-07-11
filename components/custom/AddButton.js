import React from 'react';

function AddButton({toggleModal}) {
	return (
			<button className={"btn btn-sm border-1"} onClick={(e) => {
				e.preventDefault();
				toggleModal();
			}}>
				<i className={"las la-plus-circle"}/> Add
			</button>
	);
}

export default AddButton;