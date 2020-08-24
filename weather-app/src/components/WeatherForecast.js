import React from 'react';
import {MaxTemp, MinTemp, Image} from './StyledComponents';

const FormatDate = ({date, index}) => {

	date = new Date(date).toLocaleDateString([], {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
	})

	return(
			<div className="row h-25">
				<div className="col text-center">
					{index === 0 ? "Tomorrow" : date}
				</div>
			</div>
		)
}

const WeatherForecast = ({info, tempScale}) => {

	const weatherForecast = info.map((weather, index) => {

		const weather_state_name = weather.weather_state_name.split(' ').join('')
		const max_temp = Math.ceil(weather.max_temp)
		const min_temp = Math.ceil(weather.min_temp)

		return(
			<div key={index} className="col-5 col-sm-3 col-md-2 mt-2 mb-2 p-4 justify-content-between forecast-col">
				<FormatDate className="text-white" index={index} date={weather.applicable_date}/>
				<div className="row h-50 justify-content-center">
					<div className="col text-center">
						<Image src={"/assets/weather-app-master/"+weather_state_name+".png"} alt="Weather State"/>
					</div>
				</div>
				<div className="row h-25 justify-content-end">
					<div className="col">
						<MaxTemp>
							{max_temp}
							{tempScale === 'celsius' ? <span>&#8451;</span> : <span>&#8457;</span>}
						</MaxTemp>
						<MinTemp>
							{min_temp}
							{tempScale === 'celsius' ? <span>&#8451;</span> : <span>&#8457;</span>}
						</MinTemp>
					</div>
				</div>
			</div>
		)
	})

	return(
		<div className="row d-flex justify-content-between">
			{weatherForecast}
		</div>
	)
}

export default WeatherForecast;