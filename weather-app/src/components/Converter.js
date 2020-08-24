import React, {useState} from 'react';
import {Button} from './StyledComponents'

const Converter = (props) => {

	const [cbkg, setCbkg] = useState('white')
	const [fbkg, setFbkg] = useState('#737e92')
	const [cCol, setCcol] = useState('#1e213a')
	const [fCol, setFcol] = useState('white')

	const handleClick = (scale) => {

		if(scale === 'fahrenheit') {
			setCbkg('#737e92') 
			setFbkg('white') 
			setCcol('white')
			setFcol('#1e213a')
		} else {
			setCbkg('white')
			setFbkg('#737e92')
			setCcol('#1e213a')
			setFcol('white')
		}
		
		props.onClick(scale)
	}
	
	return(
		<div className="row mb-4 ">
			<div className="col-12">
				<Button onClick={() => handleClick('fahrenheit')} background={fbkg} color={fCol}>&#8457;</Button>
				<Button onClick={() => handleClick('celsius')} background={cbkg} color={cCol}>&#8451;</Button>
			</div>
		</div>
		)
}

export default Converter;