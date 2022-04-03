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