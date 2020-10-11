import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { EditButton, ProfileImg } from './styledComponent'
import arrayBufferToBase64 from '../shared/helper'
import { ThemeContext } from '../context/ThemeContext'

const UserInfo = (props) => {

	const history = useHistory()
	const user = props.user

	console.log('user', user)
	console.log('auth', props.auth)

	const { theme } = useContext(ThemeContext)
	const textStyle = {
		'color': `${theme.textColor}`
	}

	let password = null
	if(props.auth.user.password) {
		password = '*'.repeat(props.auth.user.password.length)
	}
	
	const handleEdit = () => {
		history.push('/home/edit')
	}

	return(
		<div className="row justify-content-center">
			<div className="col-lg-6">
				<div className="row" style={textStyle}>
					<div className="col text-center title">
						Personal Info
					</div>
				</div>
				<div className="row mb-4" style={textStyle}>
					<div className="col text-center">
						Basic info, like your name and photo
					</div>
				</div>
				<div className="row main-box">
					<div className="col">
				 	<div className="row border-bottom p-4 align-items-center">
				 		<div className="col">
				 			<div className="heading" style={textStyle}>Profile</div>
				 			<div className="sub-heading">Some info may be visible to other people</div>
				 		</div>
				 		<div className="col">
				 			<EditButton onClick={() => handleEdit()}>Edit</EditButton>
				 		</div>
				 	</div>
						<div className="row border-bottom align-items-center px-4 py-3">
							<div className="col-4 row-key">
								PHOTO
							</div>
							<div className="col row-value">
								{user.image ? 
								<ProfileImg src={`data:image/png;base64, ${arrayBufferToBase64(props.user.image.data.data)}`} alt="profile image"/> :
								<ProfileImg src="/assets/images/default_avatar.jpeg" alt="profile image"/>
								}
							</div>
						</div>
						<div className="row border-bottom align-items-center px-4 py-3">
							<div className="col-4 row-key">
								NAME
							</div>
							<div className="col row-value" style={textStyle}>
								{user.name}
							</div>
						</div>
						<div className="row border-bottom align-items-center px-4 py-3">
							<div className="col-4 row-key">
								BIO
							</div>
							<div className="col row-value" style={textStyle}>
								{user.bio}
							</div>
						</div>
						<div className="row border-bottom align-items-center px-4 py-3">
							<div className="col-4 row-key">
								PHONE
							</div>
							<div className="col row-value" style={textStyle}>
								{user.phone}
							</div>
						</div>
						<div className="row border-bottom align-items-center px-4 py-3">
							<div className="col-4 row-key">
								EMAIL
							</div>
							<div className="col row-value" style={textStyle}>
								{user.email}
							</div>
						</div>
						<div className="row align-items-center px-4 py-3">
							<div className="col-4 row-key">
								PASSWORD
							</div>
							<div className="col row-value" style={textStyle}>
								{password}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserInfo