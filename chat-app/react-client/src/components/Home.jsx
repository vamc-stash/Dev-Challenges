import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import LeftView from './LeftView'
import RightView from './RightView'
import { fetchChannel } from '../redux/actions/channel'
import { addMember } from '../redux/actions/addMember'
import { DEFAULT_CHANNEL, MOBILE_VIEW, DESKTOP_VIEW, DESKTOP_VIEW_BREAKPOINT } from '../shared/constants'

const Home = () => {

    const showSidePane = {
        "display": "block",
        "width": "25%",
        "background": "#120F13",
        "zIndex": 2,
        "position": "fixed",
        "left": 0,
        "right": 0,
        "minHeight": "100vh"
    }
    const hideSidePane = {
        "display": "none",
        "zIndex": 2
    }

    const mainContentMobile = {
        "zIndex": 1,
        "position": "relative",
        "background": "#252329",
        "width": "100%",
        "top": 0,
        "left": 0,
        "minHeight": "100vh"
    }

    const mainContentDesktop = {
        "zIndex": 1,
        "background": "#252329",
        "position": "relative",
        "width": "75%",
        "top": 0,
        "left": "25%",
        "maxWidth": "100vw",
        "minHeight": "100vh"
    }
    const [sidePaneStyle, setSidePaneStyle] = useState(showSidePane)
    const [mainPaneStyle, setMainPaneStyle] = useState(mainContentDesktop)
    const [width, setWidth] = useState(window.innerWidth)
    const [isOpen, setIsOpen] = useState(false)
    const [currentChannel, setCurrentChannel] = useState(DEFAULT_CHANNEL)
    const [deviceView, setDeviceView] = useState(DESKTOP_VIEW)

    const { profile, channel, allChannels } = useSelector(state => ({
        profile: state.profile,
        channel: state.channel,
        allChannels: state.allChannels,
    }), shallowEqual)

    const dispatch = useDispatch()

    const toggle = () => {
        if (isOpen) {
            setSidePaneStyle(hideSidePane)
            setIsOpen(false)
        }
        else if (!isOpen) {
            showSidePane.width = "80%"
            setSidePaneStyle(showSidePane)
            setIsOpen(true)
        }
    }

    const handleWindowResize = () => setWidth(window.innerWidth)
    const switchChannel = (selectedChannel) => {
        setCurrentChannel(selectedChannel)
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize)

        if (width < DESKTOP_VIEW_BREAKPOINT) {
            setSidePaneStyle(hideSidePane)
            setMainPaneStyle(mainContentMobile)
            setIsOpen(false)
            setDeviceView(MOBILE_VIEW)
        }
        else {
            setSidePaneStyle(showSidePane)
            setMainPaneStyle(mainContentDesktop)
            setIsOpen(false)
            setDeviceView(DESKTOP_VIEW)
        }

        dispatch(fetchChannel(currentChannel))
            .then(() => {
                dispatch(addMember())
            })

        return (() => {
            window.removeEventListener("resize", handleWindowResize)
        })

    }, [width, currentChannel, dispatch])

    return (
        <div className="vw-100 vh-100">
            <div className="row d-flex">
                <div id="sidePane" className="vh-100" style={sidePaneStyle}>
                    <LeftView switchChannel={switchChannel} channel={channel.channel?.channel} allChannels={allChannels} profile={profile} />
                </div>
                <div id="mainContent" className="vh-100" style={mainPaneStyle}>
                    <nav className="navbar navbar-expand-lg">
                        <RightView channelNameRef={currentChannel} channelName={channel.channel?.channel?.name} channel={channel?.channel} deviceView={deviceView} isOpen={isOpen} toggle={toggle} />
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Home