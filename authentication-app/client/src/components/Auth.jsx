import React from 'react'
import {useForm} from 'react-hook-form'
import {Logo, Img, SocialButton} from './styledComponent'
import {Link, Redirect, withRouter} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GithubLogin from 'react-github-login'
import TwitterLogin from "react-twitter-login"
import {GoogleLogin} from 'react-google-login'
import {FACEBOOK_APP_ID, GOOGLE_CLIENT_ID,  GITHUB_CLIENT_ID, TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET} from '../shared/constants'

const FormComponent = (props) => {

	const { register, handleSubmit, errors } =  useForm()

	const onSubmitForm = (data) => {
		props.action({username: data.email, password: data.password})
		.then(() => {
			props.history.push(props.navTo)
		})
	}

	return(
		<div className="row">
			<div className="col-12">
				<form role="form" className="w-100 h-100" onSubmit={handleSubmit(onSubmitForm)}>
					<div className="input-group mb-2 border border-dark rounded">
						<div className="input-group-prepend">
							<span className="input-group-text bg-white"><i className="fa fa-envelope"></i></span>
						</div>
						<input
						type="email"
						id="email"
						name="email"
						placeholder="Email"
						className={`border-0 form-control ${errors.email ? 'is-invalid': ''}`}
						ref={register({
							required: true,
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'Invalid email address format'
							}
							})}
							/>
					</div>
					<div className="input-group mb-2 border border-dark rounded">
						<div className="input-group-prepend">
							<span className="input-group-text bg-white"><i className="fa fa-lock fa-lg"></i></span>
						</div>
						<input
						type="password"
						id="password"
						name="password"
						placeholder="Password"
						className={`border-0 form-control ${errors.password ? 'is-invalid': ''}`}
						ref={register({
							required: true,
							minLength: 3,
							maxLength: 15
						})}
						/>
					</div>
					<div className="input-group-btn mb-2 rounded">
						<button type="submit" className="btn btn-primary w-100">
							{props.actionType}
						</button>
					</div>
				</form>
			</div>
		</div>
		)
}

const Auth = (props) => {
	
	if(props.auth.isAuthenticated) {
		return <Redirect to="/home"/>
	}

	const responseGoogle = (res) => {
		props.socialLogin('/users/google/token', {'Content-Type': 'application/json', 'access_token': res.accessToken})
		.then(() => {
			props.history.push('/home')
		})
	}

	const responseTwitter = (err, data) => {
		props.socialLogin('/users/twitter/token?oauth_token='+data.oauth_token+'&oauth_token_secret='+data.oauth_token_secret+'&user_id='+data.user_id, {'Content-Type': 'application/json', 'access_token': data.oauth_token})
		.then(() => {
			props.history.push('/home')
		})
	}

	const responseFacebook = (res) => {
		props.socialLogin('/users/facebook/token', {'Content-Type': 'application/json', 'access_token': res.accessToken})
		.then(() => {
			props.history.push('/home')
		})
	}

	const onSuccess = (res) => {
		props.socialLogin('/users/github/code?code='+res.code, {'Content-Type': 'application/json', 'access_token': res.code})
		.then(() => {
			props.history.push('/home')
		})
	}

	const onFailure = (err) => {
		console.error(err)
		props.history.push('/')
	}

	return(
		<div className="container-fluid w-100 vh-100 d-flex align-items-center justify-content-center">
			<div className="row row-content">
				<div className="col-10 offset-1 col-md-6 offset-md-3 p-5 rounded border border-dark">	
					<div className="row mb-2">
						<div className="col">
							<Logo src="/assets/images/devchallenges.svg" alt="</> devchallenges"/>
						</div>
					</div>
					{props.action === 'register' &&
						<React.Fragment>
							<div className="row mb-2">
								<div className="col-12">
									<p><strong>Join thousands of learners from around the world</strong></p>
									<p style={{"fontSize":"90%"}}>Master web development by making real-life projects. There are multiple paths for you to choose</p>
							 </div>
							</div>
							<FormComponent actionType="start coding now" action={props.signUp} history={props.history} navTo="/login"/>
						</React.Fragment>
					}
				 {props.action === 'login' &&
				 	<React.Fragment>
							<div className="row mb-2">
								<div className="col-12">
									<p><strong>Login</strong></p>
							 </div>
							</div>
							<FormComponent actionType="Login" action={props.login} history={props.history} navTo="/home"/>
						</React.Fragment>
					}
					<div className="row">
						<div className="col d-flex justif2694872204099480y-content-center">
							<p style={{"fontSize":"80%"}}>or continue with these social profile</p>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-12 d-flex justify-content-center">
						 	<div className="row">
						  		<div className="col-2 ">
									<GoogleLogin
										clientId={GOOGLE_CLIENT_ID}
										onSuccess={responseGoogle}
										onFailure={onFailure}
										icon={false}
										render={renderProps => (
											<button className="social-button" onClick={renderProps.onClick}><Img src="/assets/images/Google.svg" alt="Google"/></button>
										)}
									/>
								</div>
								<div className="col-2 offset-1">
									<FacebookLogin
										appId={FACEBOOK_APP_ID}
										callback={responseFacebook}
										render={renderProps => (
											<button className="social-button" onClick={renderProps.onClick}><Img src="/assets/images/Facebook.svg" alt="Facebook"/></button>
										)}
									/>
								</div>
								<div className="col-2 offset-1">
									<TwitterLogin
										authCallback={responseTwitter}
										consumerKey={TWITTER_CLIENT_ID}
										consumerSecret={TWITTER_CLIENT_SECRET}
										children={
											<React.Fragment>
												<Img src="/assets/images/Twitter.svg" alt="Twitter"/>
											</React.Fragment>
										}
									/>
								</div>
								<div className="col-2 offset-1">
									<GithubLogin
										clientId={GITHUB_CLIENT_ID}
										redirectUri="" 
										onSuccess={onSuccess}
										onFailure={onFailure}
										className="social-button"
										buttonText={<Img src="/assets/images/Gihub.svg" alt="Github"/>}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col d-flex justify-content-center" style={{"fontSize":"80%"}}>
							{props.action === 'register' && <p>Already a member? <Link to="/login">Login</Link></p>}
						 	{props.action === 'login' && <p>Don't have an account yet? <Link to="/">Register</Link></p>}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Auth)