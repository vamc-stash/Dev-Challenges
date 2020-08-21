import React from 'react';

const Flag = (props) => {
	const {src, alt} = props

	return(
		<img className="flag shadow" src={src} alt={alt}/>
		)
}

export default Flag;