import React, {useState, useEffect} from 'react';
import {BASE_API} from '../shared/baseURL';
import {Exit, InputGroup, Input, ButtonGroup, Location} from './StyledComponents';

const SearchInput = (props) => {

	const [locations, setLocations] = useState(null)

	useEffect(() => {

	}, [locations])

	const LocationSearch = (location) => {
		fetch(BASE_API + 'search/?query=' + location)
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
			console.log("selected locations", data)
			setLocations(data)
		})
		.catch(error =>  { 
			console.log(error.message)
			alert(error.message)
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		LocationSearch(e.target.location.value)
	}

	return(
		<div className="row m-2">
			<div className="col-1 offset-11">
				<Exit onClick={() => {props.onClick()}} className="fa fa-times fa-lg"/>
			</div>
			<div className="col-12">
				<form className="row justify-content-center align-items-center" onSubmit={(e) => handleSubmit(e)}>
					<InputGroup className="col-12 col-sm-9">
						<div className="row align-items-center">
							<div className="col-1 fa fa-search">
							</div>
							<div className="col-10">
								<Input type="text" name="location" className="text-white" placeholder="search location"/>
							</div>
						</div>
					</InputGroup>
			  <ButtonGroup className="col-12 col-sm" type="submit">
					Search
					</ButtonGroup>
				</form>
			</div>
			{locations && locations.map((location, index) => {
				return(
					<Location className="col-12 mt-4" key={index}>
						<div className="row justify-content-between align-items-center">
							<div onClick={() => {props.handleSearch(location.woeid)}} className="col-10">
							{location.title}
							</div>
							<div onClick={() => {props.handleSearch(location.woeid)}} className="col-1 mr-auto fa fa-chevron-right " style={{"color":"#8c8c8c"}}></div>
							</div>
					</Location>
					)
			})}
		</div>
		)
}

export default SearchInput