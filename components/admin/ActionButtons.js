import React from 'react';
import ActionButton from "./custom/ActionButton";

const ActionButtons = ({actionButtons}) => {
	return (
			<div className={"row gap-xs-1 gap-2 mb-4 px-3"}>
				{
					actionButtons.map((actionButton, index) => {
						return <ActionButton size={"large"} {...actionButton} key={index}/>
					})
				}
			</div>
	);
};

export default React.memo(ActionButtons);