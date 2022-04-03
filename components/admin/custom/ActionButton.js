import React from 'react';
import adminStyles from "../../../styles/admin/Admin.module.css"

function ActionButton({title =null,link = "#", size = null, icon = null, ...props}) {
	props.className = (`${adminStyles.actionButton} ${(adminStyles[size] ?? '')} ${props.className}`).trim()
	return (
			<a href={link} aria-label={title + ' button'}
			   {...props}>
				{
					icon ? <i className={`las ${icon}`}/> : null
				}
				{
					title ? <span className={"fw-500"}>{title}</span> : null
				}
				
			</a>
	);
}

export default ActionButton;