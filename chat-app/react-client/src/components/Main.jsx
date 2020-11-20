import React from 'react'
import { Switch, Redirect, Route, withRouter } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { signup } from '../redux/actions/register'
import { login } from '../redux/actions/login'
import { logout } from '../redux/actions/logout'
import Auth from './Auth'
import Home from './Home'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        rest.auth.isAuthenticated
            ? <Component {...props} />
            : <Redirect to="/" />
    )}
    />
)

const Main = () => {

    const { register, auth } = useSelector(state => ({
        register: state.register,
        auth: state.auth
    }), shallowEqual)

    const dispatch = useDispatch()

    return (
        <div>
            <Switch>
                <Route exact path='/' component={() =>
                    <Auth
                        action='register'
                        auth={auth}
                        register={register}
                        signup={(creds) => dispatch(signup(creds))}
                    />}
                />
                <Route exact path='/login' component={() =>
                    <Auth
                        action='login'
                        auth={auth}
                        login={(creds) => dispatch(login(creds))}
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