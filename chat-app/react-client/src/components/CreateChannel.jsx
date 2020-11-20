import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'
import { SaveChannelBtn } from './StyledComponent'
import { createChannel } from '../redux/actions/createChannel'

const CreateChannel = (props) => {

    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const onSubmitForm = (data) => {
        dispatch(createChannel({
            name: data.name,
            description: data.description
        }))
    }

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleModal}
            className="row w-100 h-100 d-flex align-items-center justify-content-center"
            contentClassName="createChannel"
        >
            <ModalBody>
                <div className="row">
                    <div className="col-12 modalTitle">
                        NEW CHANNEL
                    </div>
                    <div className="col-12">
                        <form className="w-100" onSubmit={handleSubmit(onSubmitForm)}>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Channel name"
                                className="mt-3 form-control modalInput"
                                style={{ "background": "#333333", "color": "#828282" }}
                                ref={register({
                                    required: true,
                                    minLength: 3,
                                    maxLength: 20
                                })}
                            >
                            </input>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Channel Description"
                                className="mt-3 mb-2 form-control modalInput"
                                style={{ "background": "#333333", "color": "#828282" }}
                                rows="4"
                                ref={register({
                                    required: true,
                                    minLength: 1,
                                    maxLength: 100
                                })}
                            >
                            </textarea>
                            <SaveChannelBtn className="px-3">Save</SaveChannelBtn>
                        </form>
                    </div>

                </div>
            </ModalBody>
        </Modal>
    )
}

export default CreateChannel