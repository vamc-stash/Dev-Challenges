import React from 'react'
import { useForm } from 'react-hook-form'
import { AuthInput, AuthButton, AuthIcon } from './StyledComponent'

const Form = (props) => {

    const { register, handleSubmit, errors } = useForm()

    const onSubmitForm = (data) => {
        props.action({
            username: data.username,
            password: data.password
        })
            .then(() => {
                props.history.push(props.navTo)
            })
    }

    return (
        <div className="row">
            <div className="col-12">
                <form className="w-100 h-100" onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <AuthIcon className="input-group-text"><i className="fa fa-user fa-lg"></i></AuthIcon>
                        </div>
                        <AuthInput
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            style={{"background": "#333333", "color": "#828282"}}
                            ref={register({
                                required: true,
                                pattern: {
                                    value: /[A-Za-z0-9]/,
                                    message: 'Only alphabets and numbers are allowed'
                                }
                            })}
                        />
                    </div>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <AuthIcon className="input-group-text"><i className="fa fa-lock fa-lg"></i></AuthIcon>
                        </div>
                        <AuthInput
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            style={{"background": "#333333", "color": "#828282"}}
                            ref={register({
                                required: true,
                                minLength: 3,
                                maxLength: 15
                            })}
                        />
                    </div>
                    <div className="input-group-btn mb-4 rounded">
                        <AuthButton type="submit" className="btn btn-primary w-100">
                            {props.actionType}
                        </AuthButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form 