import React from 'react';

const ErrorMsg = ({ errMsg }) => {
	return (
		<div className="row vh-100 align-items-center justify-content-center">
			<p style={{ "color": "red" }}>{errMsg}</p>
		</div>
	)
}

export default ErrorMsg