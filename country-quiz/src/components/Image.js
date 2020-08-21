import React from 'react';

const Image = (props) => {
	const {src, alt} = props

	return (
			<div className={alt}>
				<img src={src} alt={alt}/>
			</div>
		)
}

export default Image