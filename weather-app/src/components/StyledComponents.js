import styled from "styled-components";

export const Footer = styled.footer`
 color: #737e92;
 margin-bottom: 0em;
 text-align: center;
`
export const RefTag = styled.span`
	color: #737e92;
`
export const Button = styled.span`
	background: ${props => props.background};
	cursor: pointer;
	margin-left: 2%;
	color: ${props => props.color};
	padding: 0.375rem;
	font-size: 100%;
	float: right;
	width: 2rem;
	height: 2rem;
	border-radius: 50%; 
`
export const MaxTemp = styled.span`
	color: white;
	float: left;
`
export const MinTemp = styled.span`
	color: #737e92;
	float: right;
`
export const Image = styled.img`
	width: 75%;
	height: 75%;
`
export const Degree = styled.span`
	color: #737e92;
	font-size: 200%;
`
export const Exit = styled.span`
	color: white;
	cursor: pointer;
	margin-bottom: 2rem;
`
export const InputGroup = styled.div`
	background-color: #1e213a;
	border: 1px solid #8c8c8c;
	color: #8c8c8c;
	width: 100%;
	height: 100%;
	padding: 2%;
`
export const Input = styled.input`
	background-color: #1e213a;
	border: none;
	width: 100%;
	height: 100%;
`
export const ButtonGroup = styled.button`
	background-color: blue;
	color: white;
	border: 1px solid blue;
	padding: 2%;
	width: 100%;
`
export const Location = styled.div`
	color: white;
	background: #1e213a;
	border: 1px solid #8c8c8c;
	width: 100%;
	padding: 2%;
	cursor: pointer;
`
export const Arrow = styled.span`
	transform: rotate(${props => props.deg}deg);
	margin: 0.25rem;
`
export const Direction = styled.span`
	color: white;
`
export const Value = styled.span`
	font-size: 400%;
	font-variant-numeric: oldstyle-nums;
`
export const Units = styled.span`
	font-size: 200%;
	color: #737e92;
`
export const Progress = styled.div`
	background: white;
	height: 0.5rem;
`
export const Percentage = styled.span`
	position: absolute;
	background: yellow;
	left: 0;
	width: ${props => props.humidity}%;
	height: 100%;
`
export const Per = styled.span`
	color: #8c8c8c;
	font-size: 70%;
	float: right;
`
export const Weather = styled.div`
	color: #737e92;
	font-size: 150%;
`
export const MyDate = styled.span`
	color: #737e92;
`
export const Marker = styled.span`
	color: #737e92;
`
export const Temperature = styled.span`
	font-size: 600%;
	font-variant-numeric: oldstyle-nums;
`