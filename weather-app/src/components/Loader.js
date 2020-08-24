import React from 'react';
import Loader from 'react-loader-spinner';

const LoaderSpinner = (props) => {
	return(
		<div className="container d-flex h-100 justify-content-center align-items-center">
			<h2>Loading</h2>{"    "}
			<Loader
			type="ThreeDots"
			color={props.color}
			height={props.width}
			weight={props.height}
			/>
		</div>
		)
}

export default LoaderSpinner;