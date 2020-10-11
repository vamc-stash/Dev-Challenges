import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { signUp } from '../redux/actions/signUp'
import { login, socialLogin } from '../redux/actions/login'
import { logout } from '../redux/actions/logout'
import Auth from './Auth'
import Home from './Home'

const PrivateRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={(props) => (
		rest.auth.isAuthenticated
		? <Component {...props}/>
		: <Redirect to="/"/>
		)}
	/>
)

const Main = () => {

	const {register, auth} = useSelector(state => ({
		register: state.register,
		auth: state.auth
	}), shallowEqual)

	const dispatch = useDispatch()

	return(
		<div>
			<Switch>
				<Route exact path='/' component={() => 
					<Auth 
					action='register'
					auth={auth}
					register={register}
					signUp={(creds) => dispatch(signUp(creds))}
					socialLogin={(accessURL, headerBody) => dispatch(socialLogin(accessURL, headerBody))}
					/>}
				/>	
				<Route exact path='/login' component={() => 
					<Auth 
					action='login' 
					auth={auth}
					login={(creds) => dispatch(login(creds))}
					socialLogin={(accessURL, headerBody) => dispatch(socialLogin(accessURL, headerBody))}
					/>}
				/>
				<PrivateRoute path='/home' auth={auth} component={() =>
					<Home
					auth={auth}
					logout={() => dispatch(logout())}
					/>}
				/> 
				<Redirect to="/" />
			</Switch>
		</div>
	)
}

export default withRouter(Main)