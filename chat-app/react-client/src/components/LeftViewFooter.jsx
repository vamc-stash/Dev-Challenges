import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Label } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { logout } from '../redux/actions/logout'
import { fetchUserInfo, uploadFile } from '../redux/actions/profile'
import { Avatar } from './StyledComponent'
import { arrayBufferToBase64 } from '../shared/helper'

const LeftViewFooter = (props) => {
    const user = props.user

    const dispatch = useDispatch()
    const { register, handleSubmit, errors } = useForm({})
    const onSubmitFile = (file) => {
        dispatch(uploadFile(file.imageFile))
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])


    return (
        <div className="col-12 leftViewFooter pt-2">
            <span>
                <form onChange={handleSubmit(onSubmitFile)}>
                    <div className="">
                        <Label for="image" className="imageLabel">
                            <div className="imageDisplay">
                                {
                                    user.user?.image ?
                                        <Avatar src={`data:image/png;base64, ${arrayBufferToBase64(user.user.image.data.data)}`} alt="profile image" /> :
                                        <Avatar src="/assets/images/default_avatar.jpeg" alt="default avatar" />
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
                            className={`border-0 form-control ${errors.name ? 'is-invalid' : ''}`}
                            style={{ "display": "none" }}
                            ref={register()}
                        />
                    </div>
                </form>
                <span className="username">
                    {user.username || user.user?.username}
                </span>
            </span>
            <span className="logout-icon" onClick={handleLogout}>
                <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
            </span>
        </div>
    )
}

export default LeftViewFooter