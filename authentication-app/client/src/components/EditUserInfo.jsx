import React from 'react'
import {useForm} from 'react-hook-form'
import {Label} from 'reactstrap'
import {ProfileImg} from './styledComponent'
import {Link} from 'react-router-dom'
import arrayBufferToBase64 from '../shared/helper'

const EditUserInfo = (props) => {

	const user = props.user
	let password = null
	if(props.auth.user.password) {
		password = '*'.repeat(props.auth.user.password.length)
	}

	const { register, watch, handleSubmit, errors } =  useForm({
		defaultValues: {
			name: user.name,
			bio: user.bio,
			phone: user.phone,
			email: user.email,
			password: password
		}
	})

	const {name, bio, phone, email} = watch()

	const onSubmitForm = (data) => {
		console.log(data)
		props.updateUserInfo(data)

	}
	const onSubmitFile = (file) => {
		console.log('file', file)
		console.log('file-image', file.imageFile)
		props.uploadFile(file.imageFile)

	}

	return(
		<div className="row justify-content-center">
			<div className="col offset-lg-3 mb-4">
				<Link to="/home"><i className="fa fa-chevron-left"></i>  Back</Link>
			</div>
			<div className="w-100"></div>
			<div className="col-lg-6 border rounded px-5 pt-4 py-4">
				<div className="row">
					<div className="col">
						<div className="heading">Change Info</div>
						<div className="sub-heading">changes will be reflected to every services</div>
		 			</div>
				</div>
				<div className="row mt-4 align-items-center">
					<div className="col-lg-2">
						<form role="form" onChange={handleSubmit(onSubmitFile)}>
							<div className="input-group mb-2">
								<Label for="image" className="imageLabel">
									<div className="imageDisplay">
										{user.image ? 
										<ProfileImg src={`data:image/png;base64, ${arrayBufferToBase64(props.user.image.data.data)}`} alt="profile image"/> :
										<ProfileImg src="/assets/images/default_avatar.jpeg" alt="profile image"/>
										}
									</div>
									<div className="cameraIcon">
										<i className="fa fa-camera" aria-hidden="true"></i>
									</div>
								</Label>
								<input
								type="file"
								id="image"
								name="imageFile"
								className={`border-0 form-control ${errors.name ? 'is-invalid': ''}`}
								style={{"display": "none"}}
								ref={register()}
								/>
							</div>
						</form>
					</div>
					<div className="col changePhoto">
						CHANGE PHOTO
					</div>
				</div>
				<div className="row">
					<div className="col-lg-8">
						<form role="form" className="w-100 h-100" onSubmit={handleSubmit(onSubmitForm)}>
							<Label for="name" className="labelKey">Name</Label>
							<div className="input-group mb-2">
								<input
								type="text"
								id="name"
								name="name"
								placeholder="Enter your name..."
								className={`labelValue form-control ${errors.name ? 'is-invalid': ''}`}
								ref={register({
									pattern: {
										value: /[A-Za-z]/,
										message: 'Only alphabets are allowed'
									}
								})}
								value={name}
								/>
							</div>
							<Label for="bio" className="labelKey">Bio</Label>
							<div className="input-group mb-2">
								<textarea
								rows="2"
								id="bio"
								name="bio"
								value={bio}
								placeholder="Enter your bio..."
								className={`labelValue form-control ${errors.bio ? 'is-invalid': ''}`}
								ref={register()}
								/>
							</div>
							<Label for="phone" className="labelKey">Phone</Label>
							<div className="input-group mb-2">
								<input
								type="text"
								id="phone"
								name="phone"
								value={phone}
								placeholder="Enter your phone..."
								className={`labelValue form-control ${errors.phone ? 'is-invalid': ''}`}
								ref={register({
									pattern: {
										value: /^[0-9]{6,12}$/,
										message: 'Invalid phone number format'
									}
									})}
									/>
							</div>
							<Label for="email" className="labelKey">Email</Label>
							<div className="input-group mb-2">
								<input
								type="email"
								id="email"
								name="email"
								value={email}
								placeholder="Email"
								className={`labelValue form-control ${errors.email ? 'is-invalid': ''}`}
								ref={register({
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message: 'Invalid email address format'
									}
									})}
									/>
							</div>
							<Label for="password" className="labelKey">password</Label>
							<div className="input-group mb-2">
								{password &&
									<input
									type="password"
									id="password"
									name="password"
									placeholder="Password"
									className={`labelValue form-control ${errors.password ? 'is-invalid': ''}`}
									ref={register({
										minLength: 3,
										maxLength: 15
									})}
									/>
								}
								{!password && 
									<input
									placeholder="Password"
									className={`labelValue form-control`}
									disabled
									/>
								}
							</div>
							<div className="input-group-btn mb-2 rounded">
								<button type="submit" className="btn btn-primary pl-4 pr-4">
									save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditUserInfo