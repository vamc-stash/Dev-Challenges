import React, { useState, useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchAllChannels } from '../redux/actions/allChannels'
import { fetchUserInfo } from '../redux/actions/profile'
import { Avatar } from './StyledComponent'
import CreateChannel from './CreateChannel'
import { arrayBufferToBase64 } from '../shared/helper'
import LeftViewFooter from './LeftViewFooter'

const ChannelAbbrevation = ({ name }) => {

    let abbrevation = ""
    for (let word of name.toUpperCase().split(" ")) {
        abbrevation = abbrevation + word[0]
        if (abbrevation.length === 2)
            break;
    }

    return (
        <React.Fragment>
            {abbrevation}
        </React.Fragment>
    )
}

function findLikeResults(val, channels) {
    val = val.toLowerCase()
    let results = []
    for (let i = 0; i < channels.length; i++) {
        let str = channels[i].name.toLowerCase()
        if (str.includes(val))
            results.push(channels[i])
    }
    return results
}

const LeftView = (props) => {

    const store = useStore()
    const channels = props.allChannels
    const user = props.profile

    const dispatch = useDispatch()

    const [channelView, setChannelView] = useState(false)
    const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false)
    const [searchResults, setSearchResults] = useState(channels.channels)
    const [searchQuery, setSearchQuery] = useState('')

    const handleQueryChange = (event) => {
        const { value } = event.target
        setSearchQuery(value)
        let results = findLikeResults(value, channels.channels)
        setSearchResults(results)
    }

    const toggleCreateChannel = () => {
        setIsCreateChannelOpen(!isCreateChannelOpen)
    }

    const switchChannel = (channel) => {
        props.switchChannel(channel)
        setChannelView(!channelView)
    }

    const allChannelsView = () => {
        setChannelView(!channelView)
    }

    useEffect(() => {
        dispatch(fetchUserInfo())
        dispatch(fetchAllChannels())
            .then(() => {
                setSearchResults(store.getState().allChannels.channels)
            })
    }, [dispatch, store])

    return (
        <React.Fragment>
            <div className="row p-3">
                {!channelView ?
                    <React.Fragment>
                        <div className="col-12 leftViewHeader">
                            <div className="row">
                                <div className="col mr-auto">
                                    Channels
                                </div>
                                <div className="col ml-auto">
                                    <p className="float-right plus-icon" onClick={toggleCreateChannel}>
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4 mb-4">
                            <form className="searchBox w-100">
                                <div className="d-flex p-2 align-items-center">
                                    <span className="">
                                        <i className="fa fa-search searchIcon"></i>
                                    </span>
                                    <span>
                                        <input
                                            type="text"
                                            id="query"
                                            name="query"
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={handleQueryChange}
                                            className="w-100 searchInput ml-2"
                                        >
                                        </input>
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div className="w-100 leftViewContext">
                            {
                                searchResults.map((channel, index) => {
                                    return (
                                        <div key={index} className="col-12 mt-2 mb-3 channels-view">
                                            <span className="channel-abbreviation">
                                                <ChannelAbbrevation name={channel.name} />
                                            </span>
                                            <span className="ml-2" onClick={() => switchChannel(channel.nameRef)}>
                                                {channel.name}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <LeftViewFooter user={user} />
                    </React.Fragment> :
                    <React.Fragment>
                        <div className="col-12 leftViewHeader">
                            <div className="row">
                                <div className="col mr-auto" style={{ "cursor": "pointer" }}>
                                    <p onClick={() => allChannelsView()}>
                                        <span><i className="fa fa-chevron-left" aria-hidden="true"></i></span>
                                        <span className="ml-3">All Channels</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4 channel channelName">
                            {props.channel.name}
                        </div>
                        <div className="col-12 mt-2 channel channelDescription">
                            {props.channel.description}
                        </div>
                        <div className="col-12 mt-4 channel">
                            MEMBERS
                        </div>
                        <div className="w-100 leftViewContext">
                            {
                                props.channel.members.map((member, index) => {
                                    return (
                                        <div key={index} className="col-12 mt-2 channel channelMember">
                                            <span>
                                                {
                                                    member?.image ?
                                                        <Avatar src={`data:image/png;base64, ${arrayBufferToBase64(member.image.data.data)}`} alt="profile image" /> :
                                                        <Avatar src="/assets/images/default_avatar.jpeg" alt="default avatar" />
                                                }
                                            </span>
                                            <span className="ml-3">{member.username}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </React.Fragment>
                }
            </div>
            <CreateChannel isOpen={isCreateChannelOpen} toggleModal={toggleCreateChannel} />
        </React.Fragment>
    )
}

export default withRouter(LeftView)