import React from 'react';
import Typical from 'react-typical'

const Loading = (props) => {
	return(
			<div className="intro">
				<Typical
					steps = {[
							'Hello there !!', 2000,
							'Welcome', 1500,
							'Loading . . .', 1500
						]}
				/>
			</div>
		)
}

export default Loading;