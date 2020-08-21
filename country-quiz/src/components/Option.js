import React, {useState, useEffect} from 'react';
import {NOT_ANSWERED, ANSWERED_CORRECTLY, ANSWERED_INCORRECTLY} from '../shared/constants'

function Answer({className, onClick, choice, answer, correctAnswer}) {
	return(
			<div className={className} onClick={onClick}>
				<span className="ml-1">{choice}</span>
				<span className="ml-4">{answer}</span>
				{correctAnswer && <span className="status-icon"><i className="fa fa-check-circle-o fa-lg"></i></span>}
				{correctAnswer === false && <span className="status-icon"><i className="fa fa-times-circle-o fa-lg"></i></span>}
			</div>
		)
}

const Options = (props) => {

	const [status, setStatus] = useState(NOT_ANSWERED)

	useEffect(() => {
		setStatus(NOT_ANSWERED)
	}, [props.isNext])

	const handleClick = (event) => {
		if(props.isSelected)
			return

		const selectedAnswer = event.target.innerText
		props.onClick(selectedAnswer)
		if(selectedAnswer === props.correctAnswer)
			setStatus(ANSWERED_CORRECTLY)
		else
			setStatus(ANSWERED_INCORRECTLY)
	}

	return(
			<React.Fragment>
				{!props.isSelected && 
					<Answer className="option option-hover" 
					onClick={handleClick} 
					choice={props.choice} 
					answer={props.option}/>}

				{props.isSelected && (
					props.option === props.correctAnswer ? 
					(<Answer className="option correct-option"
						onClick={handleClick} 
						choice={props.choice} 
						answer={props.option}
						correctAnswer={true}/>) :
					status === NOT_ANSWERED ? 
					(<Answer className="option" 
						onClick={handleClick} 
						choice={props.choice} 
						answer={props.option}/>) :
					(<Answer className="option wrong-option" 
						onClick={handleClick} 
						choice={props.choice}
						answer={props.option}
						correctAnswer={false}/>)	
				)} 
			</React.Fragment>
		)
}

export default Options;