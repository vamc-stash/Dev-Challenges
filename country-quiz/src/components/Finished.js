import React from 'react';
import Image from './Image';

const Finished = (props) => {
	return(
		<React.Fragment>
			<div className="row row-content">
				<div className="col">
				<div className="display-card result-card">
				<Image src="/assets/images/winner.svg" alt="winner"/>
				<div className="result-title">
				Results
				</div>
				<div className="result-msg">
				you got <span className="result">{props.score}</span> correct answers
				</div>
				<div className="restart-btn" onClick={props.onClickAgain}>Try Again</div>
				</div>
				</div>
			</div>
		</React.Fragment>
		)
}

export default Finished;