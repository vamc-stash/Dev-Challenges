import React from 'react';

const Gps = (props) => {
	return(
		<div className="col-2">
			<button type="button" className="btn gps-btn material-icons rounded-circle p-2 shadow-lg" onClick={() => props.onClick()}>gps_fixed</button>
		</div>
		)
}

export default Gps