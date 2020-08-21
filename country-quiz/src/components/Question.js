import React, {useState} from 'react';
import Option from './Option';
import {CHOICES} from '../shared/constants';
import Flag from './Flag'
import Image from './Image'

function Title() {
	return(
			<div>
				<h4 className="title">COUNTRY QUIZ</h4>
			</div>
		)
}

const Question = (props) => {
	const {id, question, options, correctAnswer} = props.data

	const [isSelected, setIsSelected] = useState(false)
	const [isNext, setIsNext] = useState(false)
	const [selectedOption, setSelectedOption] = useState(null)

	let optionsList = options.map((option, index) => {
		return <Option 
						key={index}
						choice={CHOICES[index]}
						option={option} 
						onClick={() => checkAnswer(option)}
						isSelected={isSelected}
						correctAnswer={correctAnswer}
						isNext={isNext}
						/>
	})

	const checkAnswer = (answer) => {
		if(isSelected)
			return

		setIsSelected(true)
		setSelectedOption(answer)
	}

	const handleClick = () => {
		if(!isSelected)
			return

		reset()
		props.onClickNext(selectedOption)
	}

	const reset = () => {
		setIsSelected(false)
		setIsNext(!isNext)
	}

	return(
			<React.Fragment>
				<div className="row row-content">
					<div className="col">
						<Title/>
						<Image src="/assets/images/adventure.svg" alt="adventure"/>
						<div className="display-card shadow-lg">
							{question.includes("|") ? (
									<React.Fragment>
										<Flag src={question.split("|", 1)} alt="flag"/>
										<h5 className="question">{question.split("|")[1]}</h5>
									</React.Fragment>
								) : (
									<h5 className="question">{question}</h5>
								)}
							{optionsList}
							{isSelected && <div className="next-btn" onClick={() => handleClick()}>next</div>}
						</div>	
					</div>
				</div>
			</React.Fragment>
		)
}

export default Question