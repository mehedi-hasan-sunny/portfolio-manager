export const successRes = (res, result, code = 200) => {
	return res.status(code).json({
		data: result,
		status: 'success',
		code: code,
	})
}
export const errorRes = (res, message, code = 500, errorFields = {}) => {
	return res.status(code).json({
		error: message,
		status: 'error',
		code: code,
		errorFields
	})
}