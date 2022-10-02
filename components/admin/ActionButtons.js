import {memo} from 'react';
import ActionButton from "./custom/ActionButton";

const ActionButtons = ({actionButtons}) => {
	return (
			<div className={"row gap-xs-1 gap-2 mb-4 px-3"}>
				{
					actionButtons.map((actionButton, index) => {
						return <ActionButton size={"large"} {...actionButton} key={index} data-aos={"zoom-in-down"} data-aos-delay={index*50}/>
					})
				}
			</div>
	);
};

export default memo(ActionButtons);