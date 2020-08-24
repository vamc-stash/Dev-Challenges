import React, {useState, useEffect} from 'react';
import {BASE_API} from '../shared/baseURL';
import TodayWeather from './TodayWeather';
import Converter from './Converter';
import WeatherForecast from './WeatherForecast';
import TodayHighlights from './TodayHighlights';
import Search from './Search';
import Gps from './Gps';
import SearchInput from './SearchInput';
import LoaderSpinner from './Loader';
import {Footer, RefTag} from './StyledComponents';

function convert(temp, scale) {
	return scale === 'celsius' ? ((temp - 32) * 5) / 9 : ((temp * 9) / 5)  + 32
}

function changeTemperatureScale(info, scale) {

	for(let i=0; i<info.length; i++) {
		info[i].the_temp = convert(info[i].the_temp, scale)
		info[i].max_temp = convert(info[i].max_temp, scale)
		info[i].min_temp = convert(info[i].min_temp, scale)
	}
	return info
}

const FetchWeather = (props) => {

	const currentLocation = props.woeid
	const [woeid, setWoeid] = useState(props.woeid)
	const [weatherInfo, setWeatherInfo] = useState(null)
	const [title, setTitle] = useState(null)
	const [scale, setScale] = useState('celsius')
	const [tempScale, setTempScale] = useState(scale)
	const [isSearchClicked, SetIsSearchClicked] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		fetch(BASE_API + woeid + '/')
		.then(res => {
			if(res.ok) { 
				return res; 
			}
			else {
				var error = new Error('ERROR ' + res.status + ": " + res.statusText)
				error.res = res
				throw error
			}
		}, error => {
			var errmsg = new Error(error.message)
			throw errmsg
		})
		.then(res => res.json())
		.then(data => {
			setWeatherInfo(data.consolidated_weather)
			setTitle(data.title)
			setIsLoaded(true)
		})
		.catch(error =>  { 
			console.log(error.message)
			alert(error.message)
		})
	}, [woeid])

	const convertTemp = (tempUnit) => {

		let info = tempScale === tempUnit ? (weatherInfo) : (setTempScale(tempUnit), changeTemperatureScale(weatherInfo, tempUnit))
		
		setWeatherInfo(info)
		setScale(tempUnit)
	}

	const toggleSearchBox = () => {
		SetIsSearchClicked(!isSearchClicked)
	}

	const setCurrentLocation = () => {
		setWoeid(currentLocation)
	}

	const handleSearch = (woeid) => {
		setIsLoaded(false)
		console.log("he")
		setWoeid(woeid)
		toggleSearchBox()
	}

	return(
		<div className="row vw-100">
			<div className="col-12 col-xl-4 left-col vh-100">
				{!isSearchClicked && 
					<div className="row mt-2">
						<Search onClick={() => toggleSearchBox()}/>
						<Gps onClick={() => setCurrentLocation()}/>
					</div>
					}
					{!isLoaded && <LoaderSpinner color={'white'} width={160} height={160}/>}
					{isLoaded && !isSearchClicked && weatherInfo && <TodayWeather info={weatherInfo[0]} title={title} tempScale={tempScale}/>}
					{isLoaded && isSearchClicked && <SearchInput onClick={() => toggleSearchBox()} handleSearch={(woeid) => handleSearch(woeid)}/>}
				</div>
				<div className="col right-col">
					{!isLoaded && <LoaderSpinner color={'white'} width={80} height={80}/>}
					{isLoaded && <Converter onClick={(unit) => convertTemp(unit)}/>}
					{isLoaded && weatherInfo && <WeatherForecast info={weatherInfo.slice(1)} tempScale={tempScale}/>}
					{isLoaded && weatherInfo && <TodayHighlights info={weatherInfo[0]}/>}
				<div className="row">
					<Footer className="col-12">
						Made by{" "}
						<a
						href="https://github.com/vamc-stash"
						target="_blank"
						rel="noopener noreferrer"
						>
						<RefTag>vamsi</RefTag>
						</a>{" "}
						@
						<a href="https://devchallenges.io/" 
						target="_blank"
						rel="noopener noreferrer"
						>
						<RefTag>devchallenges.io</RefTag>
						</a>
					</Footer>
				</div>
			</div>
		</div>
		)

}

export default FetchWeather