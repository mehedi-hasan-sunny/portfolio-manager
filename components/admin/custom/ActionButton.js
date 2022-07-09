import React from 'react';
import adminStyles from "../../../styles/admin/Admin.module.css"

const insideElements = ({icon = null, title = null}) => (
		<>
			{
				icon ? <i className={`las ${icon}`}/> : null
			}
			{
				title ? <span className={"fw-500"}>{title}</span> : null
			}
		</>
)

function ActionButton({
	                      title = null,
	                      link = null,
	                      size = null,
	                      icon = null,
	                      primary = false,
	                      className = null,
	                      ...props
                      }) {
	props.className = (`${adminStyles.actionButton} ${(adminStyles[size] ?? '')} ${primary  ? adminStyles.primary : ''} ${className}`).trim()
	return (
			link ?
					<a href={link} aria-label={title + ' button'} {...props}>
						{
							insideElements({title, icon})
						}
					</a>
					: <button aria-label={title + ' button'} {...props}>
						{
							insideElements({title, icon})
						}
					</button>
	);
}

export default ActionButton;