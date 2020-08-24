import React from 'react';
import {Arrow, Direction, Value, Units, Progress, Percentage, Per} from "./StyledComponents";

const arrowDict = {
	'NE': 0,
	'ENE': 22.5,
	'E': 45,
	'ESE': 67.5,
	'SE': 90,
	'SSE': 112.5,
	'S': 135,
	'SSW': 157.5,
	'SW': 180,
	'WSW': 202.5,
	'W': 225,
	'WNW': 247.5,
	'NW': 270,
	'NNW': 292.5,
	'N': 315,
	'NNE': 337.5
}

const WindStatus = ({wind_direction_compass, wind_speed}) => {

	wind_speed = Math.ceil(wind_speed)
	const deg = arrowDict[wind_direction_compass]

	return(
		<React.Fragment>
			<div className="row p-1 h-25 justify-content-center">
				<div className="col text-center">
				Wind status
				</div>
			</div>
			<div className="row h-50 justify-content-center">
				<div className="col text-center">
				 <Value>{wind_speed}</Value><Units>mph</Units>
				</div>
			</div>
			<div className="row p-2 h-25 justify-content-center">
				<div className="col text-center">
					<Arrow className="fa-stack" deg={deg}>
						<i className="fa fa-circle fa-stack-2x" style={{"color":"#8c8c8c"}}/>
						<i className="fa fa-location-arrow fa-stack-1x"/>
					</Arrow>
				 <Direction>{wind_direction_compass}</Direction>
				</div>
			</div>
		</React.Fragment>
		)
}

const Humidity = ({humidity}) => {

	humidity = Math.ceil(humidity)

	return(
		<React.Fragment>
			<div className="row p-1 h-25 justify-content-center">
				<div className="col text-center">
				Humidity
				</div>
			</div>
			<div className="row h-50 justify-content-center">
				<div className="col text-center">
					<Value>{humidity}</Value><Units>%</Units>
				</div>
				</div>
				<div className="row p-1 h-25">
					<div className="col-6 offset-3">
						<div className="row justify-content-between">
							<div className="col-2">
								<Per>0</Per>
							</div>
							<div className="col-2">
								<Per>50</Per>
							</div>
							<div className="col-2">
								<Per>100</Per>
							</div>
						</div>
					</div>
				<div className="w-100"/>
			 <Progress className="col-6 offset-3 rounded">
			  <Percentage className="rounded" humidity={humidity}/>
			 </Progress>
			 <div className="w-100"/>
			 <div className="col-6 offset-3">
			  <Per>%</Per>
			 </div>
			</div>
		</React.Fragment>
		)
}

const Visibility = ({visibility}) => {

	visibility = visibility.toFixed(1)

	return(
		<React.Fragment>
			<div className="row p-1 h-25 justify-content-center">
				<div className="col text-center">
				Visibility
				</div>
			</div>
			<div className="row h-75 justify-content-center">
				<div className="col text-center">
				 <Value>{visibility}</Value><Units>miles</Units>
				</div>
			</div>
		</React.Fragment>
		)
}

const AirPressure = ({air_pressure}) => {

	air_pressure = Math.ceil(air_pressure)

	return(
		<React.Fragment>
			<div className="row p-1 h-25 justify-content-center">
				<div className="col text-center">
				Air Pressure
				</div>
			</div>
			<div className="row h-75 justify-content-center">
				<div className="col text-center">
				 <Value>{air_pressure}</Value><Units>mb</Units>
				</div>
			</div>
		</React.Fragment>
		)
}

const TodayHighlights = (props) => {

	const {wind_direction_compass, wind_speed, air_pressure, humidity, visibility} = props.info

	return(
		<div className="row justify-content-between align-items-center">
			<div className="col-12">
				<h4 className="mt-4">Today's Highlights</h4>
			</div>
			<div className="col-12 w-45 col-sm-5 mt-4 highlights">
				<WindStatus wind_direction_compass={wind_direction_compass} wind_speed={wind_speed}/>
			</div>
			<div className="col-12 col-sm-5 mt-4 highlights">
				<Humidity humidity={humidity}/>
			</div>
			<div className="w-100"></div>
			<div className="col-12 col-sm-5 mt-4 highlights">
				<Visibility visibility={visibility}/>
			</div>
			<div className="col-12 col-sm-5 mt-4 highlights">
				<AirPressure air_pressure={air_pressure}/>
			</div>
		</div>
		)
}

export default TodayHighlights;