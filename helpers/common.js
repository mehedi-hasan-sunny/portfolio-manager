export const empty = (e) => {
	switch (e) {
		case "":
		case 0:
		case "0":
		case null:
		case false:
			return true;
		default:
			return !!(Array.isArray(e) || typeof (e) == "undefined" || !Object.keys(e).length);
	}
}

export const ucFirst = (e) => {
	return e.charAt(0).toUpperCase() + e.slice(1)
}

export const disabledFullForm = (form) => {
	for (let i = 0; i < form.elements.length; ++i) {
		form.elements[i].disabled = true;
	}
}

export const resetAndEnableFullForm = (form, reset = true) => {
	if(reset){
		form.reset();
	}
	for (let i = 0; i < form.elements.length; ++i) {
		form.elements[i].disabled = false;
	}
}