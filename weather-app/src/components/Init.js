import React, {useState, useEffect} from 'react';
import {BASE_API} from '../shared/baseURL';
import FetchWeather from './FetchWeather';
import LoaderSpinner from './Loader';

const Init = () => {

	const [woeid, setWoeid] = useState(null)

	useEffect(() => {

		const success = (position) => {
			if(navigator.geolocation) {
				const LAT = position.coords.latitude
				const LON = position.coords.longitude

				fetch(BASE_API + 'search/?lattlong=' + LAT + ',' + LON)
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
					console.log(data[0])
					setWoeid(data[0].woeid)
				})
				.catch(error =>  { 
					console.log(error.message)
					alert(error.message)
				})
			}
		}

		const error = (err) => {
			console.warn(`ERROR(${err.code}): ${err.message}`)
			alert(`ERROR(${err.code}): ${err.message}`, "\nDefault location is set to Hyderabad, INDIA")
			setWoeid(2295414)
		}

		navigator.geolocation.getCurrentPosition(success, error)
	}, [woeid])
	

	return(
		<div className="container-fluid d-flex">
			{!woeid && <LoaderSpinner color={'#100e1d'} width={160} height={160}/>}
			{woeid && <FetchWeather woeid={woeid}/>}
		</div>
		)
}

export default Init;