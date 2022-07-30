import React from 'react';

function Input({
	               id,
	               type = "text",
	               className = '',
	               label = null,
	               labelPrependIcon = null,
	               labelAppendIcon = null,
	               labelOptional = false,
	               inputClassName = '',
	               labelClassName = '',
	               name = null,
	               defaultValue = null,
	               errorMessage = null,
	               children = null,
	               onChange = null,
	               onInput = null,
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
	if (onChange) {
		otherProps.onChange = onChange;
	}
	if (onInput) {
		otherProps.onInput = onInput;
	}
	return (
			<div className={className}>
				{
					label ? <label htmlFor={id} className={labelClassName}>
						{labelPrependIcon ? <i className={"me-1 " + labelPrependIcon}/> : null}
						
						{label}
						
						{labelAppendIcon ? <i className={"ms-1 " + labelAppendIcon}/> : null}
						
						{labelOptional ? <span className={"text-muted fs-14"}> (Optional)</span> : null}
					
					</label> : null
				}
				
				{
					type !== "textarea" ?
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