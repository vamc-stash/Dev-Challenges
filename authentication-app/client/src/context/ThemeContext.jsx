import React from 'react'

export const themes = {
    light: {
        foreground: '#828282',
        background: '#FFFFFF',
        textColor: '#000000',
        checked: false,
        logoSrc: '/assets/images/devchallenges.svg'
    },
    dark: {
        foreground: '#828282',
        background: '#333333',
        textColor: '#FFFFFF',
        checked: true,
        logoSrc: '/assets/images/devchallenges-light.svg'
    }
}

export const ThemeContext = React.createContext(themes.light)