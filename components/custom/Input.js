import React from 'react';

function Input({
	               id,
	               type = "text",
	               className = '',
	               label = null,
	               inputClassName = '',
	               labelClassName = '',
	               name = null,
	               defaultValue = null,
	               ...otherProps
               }) {
	className = `mb-3 ${className}`.trim();
	inputClassName = `form-control ${inputClassName}`.trim();
	labelClassName = `form-label ${labelClassName}`.trim();
	otherProps.type = type;
	otherProps.id = id;
	if (name) {
		otherProps.name = name;
	}
	if (defaultValue) {
		otherProps.defaultValue = defaultValue;
	}
	return (
			<div className={className}>
				{
					label ? <label htmlFor={id} className={labelClassName}>{label}</label> : null
				}
				<input className={inputClassName} {...otherProps}/>
			</div>
	);
}

export default Input;