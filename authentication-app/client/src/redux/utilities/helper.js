export default function errorObject(res) {
	var error = new Error('Error ' + res.status + ': ' + res.statusText)
	error.response = res
	return error
}