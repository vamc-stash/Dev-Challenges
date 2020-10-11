import styled from 'styled-components'

export const Logo = styled.img`
	
`
export const Img = styled.img`
cursor: pointer;
`
export const SocialButton = styled.button`
background: none;
border: none
`
export const EditButton = styled.button`
background: none;
cursor: pointer;
padding: 0.25rem 1.5rem;
float: right;
color: #707B7C;
font-weight: 500;
border: 0.125rem solid #707B7C;
border-radius: 10%/25%;
`
export const ProfileImg = styled.img`
border-radius: 10%;
width: ${props => props.width ? props.width : '4rem'};
height: ${props => props.height ? props.height : '4rem'};
`
export const PageWrapper = styled.div`
background: ${props => props.theme.background};
color: ${props => props.theme.foreground};
min-height: 100vh;
`