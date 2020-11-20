import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchChannel, postMessage } from '../redux/actions/channel'
import { Avatar, MsgBox, SendButton } from './StyledComponent'
import $ from 'jquery';
import { arrayBufferToBase64, formatDate } from '../shared/helper'
import { MOBILE_VIEW } from '../shared/constants'

const MsgDate = ({ dateString }) => {
    return (
        <React.Fragment>
            <div className="col col-md ml-5 px-5 msgsDivider"></div>
            <div className="col col-md-2 text-center msgsDate">
                {formatDate(dateString)}
            </div>
            <div className="col col-md px-5 msgsDivider"></div>
        </React.Fragment>
    )
}

const RightView = (props) => {

    const channel = props.channelNameRef
    const msgs = props.channel?.msgs

    const [msg, setMsg] = useState('')
    const dispatch = useDispatch()

    const changeMsgHandler = (event) => {
        const { value } = event.target
        setMsg(value)
    }
    const sendMsgHandler = (event) => {
        event.preventDefault()
        dispatch(postMessage(channel, msg))
            .then(() => {
                dispatch(fetchChannel(channel))
                setMsg('')
            })
    }

    useEffect(() => {
        $(".mainContent")[0].scrollTop = $(".mainContent")[0].scrollHeight
    })

    return (
        <div className="row w-100 rightView">
            <div className="col-12 rightViewHeader py-3 px-5">
                {
                    props.deviceView === MOBILE_VIEW &&
                    <span id="toggleBtn" className="mr-3" onClick={props.toggle}>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </span>
                }
                {
                    !props.isOpen &&
                    <span>
                        {props.channelName}
                    </span>
                }
                {
                    props.deviceView === MOBILE_VIEW && props.isOpen &&
                    <span className="float-right times-icon" onClick={props.toggle}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </span>
                }
            </div>
            <div className="mainContent w-100 col-12">
                {
                    msgs && msgs.map((msg, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="row w-100 my-2 align-items-center msgsDate">
                                    {
                                        index > 0 ?
                                            formatDate(msgs[index - 1].createdAt) !== formatDate(msgs[index].createdAt) ?
                                                <MsgDate dateString={msg.createdAt} />
                                                : <React.Fragment></React.Fragment>
                                            : <MsgDate dateString={msg.createdAt} />
                                    }
                                </div>
                                <div className="row mt-4 px-5">
                                    <div className="col-1">
                                        {
                                            msg.user?.image ?
                                                <Avatar src={`data:image/png;base64, ${arrayBufferToBase64(msg.user.image.data.data)}`} alt="profile image" /> :
                                                <Avatar src="/assets/images/default_avatar.jpeg" alt="default avatar" />
                                        }
                                    </div>
                                    <div className="col-11">
                                        <div className="row">
                                            <div className="col">
                                                <span className="member">{msg.user.username}</span>
                                                <span className="msgTime ml-3">
                                                    at {new Date(msg.createdAt).toLocaleTimeString('en-US')}
                                                </span>
                                            </div>
                                            <div className="w-100" />
                                            <div className="col msg">
                                                {msg.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <MsgBox className="col mx-5 mb-5" deviceView={props.deviceView}>
                <form onSubmit={sendMsgHandler}>
                    <div className="row msgDiv">
                        <input
                            className="col pl-3"
                            type="textarea"
                            name="message"
                            placeholder="Type a message here"
                            value={msg}
                            onChange={changeMsgHandler}
                        />
                        <SendButton type="submit" className="col-2 col-md-1">
                            <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        </SendButton>
                    </div>
                </form>
            </MsgBox>
        </div>
    )
}

export default withRouter(RightView)