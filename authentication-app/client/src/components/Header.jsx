import React from 'react'
import {Logo} from './styledComponent'
import {Link} from 'react-router-dom' 
import {ProfileImg} from './styledComponent'
import arrayBufferToBase64 from '../shared/helper'

const Header = (props) => {

	const handleLogout = () => {
		props.logout()
	}

	return(
		<div className="row p-4">
			<div className="col col-md-2 mr-auto col-centered">
			 	<Logo src="/assets/images/devchallenges.svg" alt="</> devchallenges"/>
			</div>
			<div className="col col-md-2 ml-auto">
				<div className="dropdown">
					<div className="btn btn-sm dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false">
						<span>
							{props.user.image ? 
							<ProfileImg src={`data:image/png;base64, ${arrayBufferToBase64(props.user.image.data.data)}`} alt="profile image" width="2rem" height="2rem"/> :
							<ProfileImg src="/assets/images/default_avatar.jpeg" alt="profile image" width="2rem" height="2rem"/>
							}
						</span>
						<span className="d-none d-md-block">
							{props.auth.user.username}
						</span>
					</div>
					<div className="dropdown-menu dropdown-menu-right mt-4 float-left" aria-labelledby="dropdownMenuButton">
						<div className="row p-2">
							<div className="col mb-1">
								<Link className="dropdown-item" to="/profile">
									<button className="dropdown-btn">
										<span><i className="fa fa-user-circle fa-md" aria-hidden="true"></i>  My Profile</span>
									</button>
								</Link>
							</div>
							<div className="w-100"/>
							<div className="col mb-1">
								<Link className="dropdown-item" to="/profile">
									<button className="dropdown-btn">
										<span><i className="fa fa-user-times"></i>  Group Chat</span>
									</button>
								</Link>
							</div>
							<div className="col mt-1 mb-1">
								<div className="dropdown-divider"></div>
								<Link className="dropdown-item" to="/login">
									<button className="dropdown-btn" onClick={handleLogout}>
										<span style={{"color": "red"}}><i className="fa fa-sign-out fa-md" aria-hidden="true"></i>  Logout</span>
									</button>
							</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
} 

export default Header