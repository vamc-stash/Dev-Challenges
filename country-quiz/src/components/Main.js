import React, {useState} from 'react';
import Question from './Question';
import Finished from './Finished';

const Main = (props) => {

	const {questionsCount, questions} = props

	const [currentQuestion, setCurrentQuestion] = useState(questions[0])
	const [questionsAsked, setQuestionsAsked] = useState([])
	const [userAnswers, setUserAnswers] = useState([])
	const [score, setScore] = useState(0)
	const [isFinished, setIsFinished] = useState(null)

	function getQuestion() {
		return questions[Math.floor(Math.random() * questionsCount)]
	}

	const handleNext = (selectedOption) => {

		if(selectedOption === currentQuestion.correctAnswer) {
			setScore(score + 1)
		}
		else {
			setIsFinished(true)
		}

		userAnswers.push({id:currentQuestion.id, answerChoosen: selectedOption})
		setUserAnswers(userAnswers)

		let question = getQuestion()
		while(questionsAsked.some((questionAsked) => {return questionAsked === question.id})) {
			question = getQuestion()
		}

		questionsAsked.push(question.id)
		setQuestionsAsked(questionsAsked)
		setCurrentQuestion(question)

	}

	const startAgain = () => {
		setCurrentQuestion(getQuestion())
		setQuestionsAsked([])
		setUserAnswers([])
		setScore(0)
		setIsFinished(null)
	}

	return(
			<div className="container vh-100 d-flex align-items-center justify-content-center">
				{isFinished ? 
					(<Finished score={score} onClickAgain={() => startAgain()}/>) : 
					(currentQuestion != null && <Question data={currentQuestion} onClickNext={(selOption) => handleNext(selOption)}/>)
				}
			</div>
		)

}

export default Main;        