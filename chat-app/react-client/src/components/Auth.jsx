import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Wrapper, AuthType } from './StyledComponent'
import Form from './Form'

const Auth = (props) => {

    // if(props.auth.isAuthenticated) {
    //     return <Redirect to = "/home"/>
    // }

    return (
        <div className="container-fluid w-100 vh-100 d-flex align-items-center justify-content-center">
            <Wrapper className="row main-box">
                <div className="col-12 p-5">
                    <div className="row mb-5">
                        <div className="col">
                            <img src="/assets/images/devchallenges-light.svg" alt="</> dev-challenges" />
                        </div>
                    </div>
                    {props.action === 'register' &&
                        <React.Fragment>
                            <div className="row mb-2">
                                <div className="col">
                                    <AuthType>Register</AuthType>
                                </div>
                            </div>
                            <Form actionType="Register" action={props.signup} history={props.history} navTo="/login" />
                        </React.Fragment>
                    }
                    {props.action === 'login' &&
                        <React.Fragment>
                            <div className="row mb-2">
                                <div className="col">
                                    <AuthType>Login</AuthType>
                                </div>
                            </div>
                            <Form actionType="Login" action={props.login} history={props.history} navTo="/home" />
                        </React.Fragment>
                    }
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            {
                                props.action === 'register' && <p>Already a member? <Link to="/login">Login</Link></p>
                            }
                            {
                                props.action === 'login' && <p>Don't have an account yet? <Link to="/">Register</Link></p>
                            }
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default withRouter(Auth) 