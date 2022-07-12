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
	               errorMessage = null,
	               children = null,
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
				
				{
					type !== "textarea"  ?
							<input className={inputClassName} {...otherProps}/>
							:
							<textarea className={inputClassName} {...otherProps}></textarea>
				}
				
				{
					errorMessage ? <span className={"d-block text-danger fs-12"}>{errorMessage}</span> : null
				}
				{
					children
				}
			</div>
	);
}

export default Input;