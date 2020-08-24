import React from 'react';
import {Temperature, Weather, MyDate, Marker, Degree} from "./StyledComponents";

const CloudBackground = ({weather_state_name}) => {

	weather_state_name = weather_state_name.split(' ').join('')

	return(
		<div className="row">
			<div className="col-12">
				<img src="/assets/weather-app-master/Cloud-background.png" alt="Cloud Background" className="cloud-bg"/>
			</div>
			<div className="col-12">
				<img src={"/assets/weather-app-master/"+weather_state_name+".png"} alt="Weather State" className="weather-state"/>
			</div>
		</div>
		)
}

const TodayTemp = ({temperature, scale}) => {

	temperature = Math.ceil(temperature)

	return(
		<div className="row h-25">
			<div className="col d-flex justify-content-center align-items-center">
			<Temperature>{temperature}</Temperature>
			{scale === 'celsius' ? <Degree>&#8451;</Degree> : <Degree>&#8457;</Degree>}
			</div>
		</div>
		)
}

const WeatherState = ({weather_state, date, location}) => {

	date = new Date(date).toLocaleDateString([], {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		
	})

	return(
		<div className="row h-25">
			<div className="col">
				<div className="row h-50">
					<div className="col d-flex justify-content-center align-items-center">
						<Weather>{weather_state}</Weather>
					</div>
				</div>
				<div className="row h-25">
					<div className="col d-flex justify-content-center align-items-center">
						<MyDate>Today&nbsp;&nbsp;&nbsp;&nbsp;</MyDate><span className="dot"></span><MyDate>&nbsp;&nbsp;&nbsp;&nbsp;{date}</MyDate>
					</div>
				</div>
				<div className="row h-25">
					<div className="col d-flex justify-content-center align-items-center">
					 <Marker><span className="fa fa-map-marker"></span>&nbsp;&nbsp;{location}</Marker>
					</div>
				</div>
			</div>
		</div>
		)
}


const TodayWeather = (props) => {

	const {weather_state_name, applicable_date, the_temp} = props.info
	const location = props.title
	const scale = props.tempScale

	return(
		<React.Fragment>
			<CloudBackground weather_state_name={weather_state_name}/>
			<TodayTemp temperature={the_temp} scale={scale}/>
			<WeatherState weather_state={weather_state_name} date={applicable_date} location={location}/>
		</React.Fragment>
		)
}

export default TodayWeather;