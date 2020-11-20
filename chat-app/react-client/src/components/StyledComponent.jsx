import styled from 'styled-components'
import { MOBILE_VIEW } from '../shared/constants'

export const Wrapper = styled.div`
background: #333333;
color: #828282;
`
export const AuthInput = styled.input`
border: 1px solid #BDBDBD;
box-sizing: border-box;
border-radius: 0.5rem;
background-color: #333333;
color: #828282;
border-left: 0px;
`
export const AuthButton = styled.button`
background: #2F80ED;
border-radius: 8px;
`
export const AuthType = styled.p`
color: #FFFFFF;
font-weight: bolder;
font-size: 120%;
`
export const AuthIcon = styled.span`
background: #333333;
color: #828282;
`
export const Avatar = styled.img`
width: 2.5rem;
height: 2.5rem;
border-radius: 7px;
`
export const SaveChannelBtn = styled.button`
float: right;
background: #2F80ED;
border-radius: 8px;
color: #F2F2F2;
font-weight: 500;
font-size: 1rem;
line-height: 1.5rem;
letter-spacing: -0.035em;
border: none;
`
export const MsgBox = styled.div`
position: fixed;
left: ${props => props.deviceView === MOBILE_VIEW ? '0%' : '25%'};
right: 0;	
bottom: 0;
width: 70%;
border-radius: 8px;
background: #3C393F;
`
export const SendButton = styled.button`
border: none;
margin: 0.5rem;
border-radius: 0.5rem;
background: #2F80ED;
color: #FFFFFF;
float: right;
`