import React from 'react'

const Footer = () => {

    const footerStyle = {
        fontSize: '0.875rem',
        letterSpacing: '-0.035em',
        color: '#BDBDBD'
    }

    return(
        <div className="row">
            <div className="col-12 col-lg-6 offset-lg-3">
                <div className="row">
                    <div className="col mr-auto">
                        <a href="https://github.com/vamc-stash" target="_blank" rel="noopener noreferrer">
                            <span style={footerStyle}>vamsi</span>
                        </a>
                    </div>
                    <div className="col ml-auto text-right">
                        <a href="https://devchallenges.io/" target="_blank" rel="noopener noreferrer">
                            <span style={footerStyle}>devchallenges.io</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer