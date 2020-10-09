import React from 'react'
import {useHistory} from 'react-router'
import {EditButton, ProfileImg} from './styledComponent'
import arrayBufferToBase64 from '../shared/helper'

const UserInfo = (props) => {

	const history = useHistory()

	const user = props.user
	console.log('user', user)
	console.log('auth', props.auth)

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
				<div className="row">
					<div className="col text-center title">
						Personal Info
					</div>
				</div>
				<div className="row mb-4">
					<div className="col text-center">
						Basic info, like your name and photo
					</div>
				</div>
				<div className="row border rounded">
					<div className="col">
				 	<div className="row border-bottom p-4 align-items-center">
				 		<div className="col">
				 			<div className="heading">Profile</div>
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
							<div className="col row-value">
								{user.name}
							</div>
						</div>
						<div className="row border-bottom align-items-center px-4 py-3">
							<div className="col-4 row-key">
								BIO
							</div>
							<div className="col row-value">
								{user.bio}
							</div>
						</div>
						<div className="row border-bottom align-items-center px-4 py-3">
							<div className="col-4 row-key">
								PHONE
							</div>
							<div className="col row-value">
								{user.phone}
							</div>
						</div>
						<div className="row border-bottom align-items-center px-4 py-3">
							<div className="col-4 row-key">
								EMAIL
							</div>
							<div className="col row-value">
								{user.email}
							</div>
						</div>
						<div className="row align-items-center px-4 py-3">
							<div className="col-4 row-key">
								PASSWORD
							</div>
							<div className="col row-value">
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