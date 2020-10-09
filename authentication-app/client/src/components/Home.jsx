import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import Header from './Header'
import {Switch, Route, Redirect, withRouter, useRouteMatch} from 'react-router-dom'
import {fetchUserInfo, updateUserInfo, uploadFile} from '../redux/actions/userProfile'
import UserInfo from './UserInfo'
import EditUserInfo from './EditUserInfo'
import Loading from './Loading'
import ErrorMsg from './ErrorMsg'

const Home = (props) => {

	let match = useRouteMatch()

	const {isLoading, user, errMsg} = useSelector(state => state.userInfo)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchUserInfo())
	}, [dispatch])

	if(props.auth.isLoading || isLoading) {
		return(
			<Loading/>
		)
	}
	else if(props.auth.errMsg || errMsg) {
		return(
			<React.Fragment>
				{props.auth.errMsg && <ErrorMsg errMsg = {props.auth.errMsg}/>}
			    {errMsg && <ErrorMsg errMsg = {errMsg}/>}
			</React.Fragment>
		)
	}
	else if(!user) {
		return(
			<Loading/>
		)
	}
	else {
		return(
			<div className="container-fluid">
				<Header auth={props.auth} user={user} logout={props.logout}/>
				<Switch>
					<Route exact path={match.path}>
						<UserInfo user={user} fetchUserInfo={() => dispatch(fetchUserInfo())} auth={props.auth}/>
					</Route>
					<Route exact path={`${match.path}/edit`}>
						<EditUserInfo user={user} auth={props.auth} updateUserInfo={(user) => dispatch(updateUserInfo(user))} uploadFile={(file) => dispatch(uploadFile(file))}/>
					</Route>
					<Redirect to="/home"/>
				</Switch>
			</div>
		)
	}
}

export default withRouter(Home)