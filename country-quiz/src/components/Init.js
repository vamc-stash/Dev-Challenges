import React, {useState, useEffect} from 'react';
import {BASE_API} from '../shared/baseUrl';
import Main from './Main';
import Loading from './Loading';

const Init = () => {

	let errMsg = ''
	const [load, setLoad] = useState(false)
	const [init, setInit] = useState(null)
	const [questionsCount, setQuestionsCount] = useState(10)
	const [questions, setQuestions] = useState([])

	useEffect(() => {
		fetch(BASE_API + 'all?fields=name;capital;alpha2Code;flag')
		.then(res => {
				if(res.ok) {
					return res;
				}
				else {
					var error = new Error('Error ' + res.status + ": " + res.statusText)
					error.res = res
					throw error
				}
			}, 
			error => {
				var errmsg = new Error(error.message)
				throw errmsg
			})
		.then(res => res.json())
		.then(data => {
			const questions = generateQuestions(data)
			setQuestions(questions)

			setInit(true)
		})
		.catch(error =>  { 
			console.log(error.message);
			errMsg = error.message
		  /*alert(error.message); */
		})

		const loadTimer = setTimeout(() => {
			setLoad(true)
			if(!init) {
				alert('Sorry:/ ' + errMsg)
			}
		}, 8000);

		return(() => {
			clearTimeout(loadTimer)
		})
	}, [init])

	const generateQuestions = (data) => {
		let questions = []

		let len = Math.min(questionsCount, data.length) 
		setQuestionsCount(len)

		for(let i=0; i<len; i++) {
			const shuffled = data.sort(() => Math.random()-0.5).slice(0, 4) 
			const selectedQuestion = shuffled[Math.floor(Math.random() * shuffled.length)]

			if(selectedQuestion.capital === '' && selectedQuestion.flag === '' && questions.some((question) => {return question.id === selectedQuestion.id})){
				continue
			} 

			let question
			const questionType = Math.random() <= 0.5
			if(questionType) {
				question = `${selectedQuestion.capital} is the capital of?`
			} else {
				question = `${selectedQuestion.flag}|Which country does this flag belong to?`
			}

			let options = []
			shuffled.forEach((item) => {
				options.push(item.name)
			}) 

			questions.push({id:selectedQuestion.alpha2Code, question: question, options: options, correctAnswer: selectedQuestion.name})
		}
		
		return questions
	}

	return(
			<React.Fragment>
				{!load && <Loading/>}
				{init && load && <Main questionsCount={questionsCount} questions={questions}/>}
			</React.Fragment>
		)

}

export default Init;        