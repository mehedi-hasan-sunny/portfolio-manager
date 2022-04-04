class MethodNotAllowedException extends Error {
	constructor(message) {
		super(message)
		this.name = 'MethodNotAllowedException'
	}
}
export default MethodNotAllowedException;