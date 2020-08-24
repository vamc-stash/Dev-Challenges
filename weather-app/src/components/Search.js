import React from 'react';

const Search = (props) => {
	return(
		<div className="col-10">
			<button type="button" className="btn search-btn rounded-0 p-2 shadow-lg" onClick={() => props.onClick()}>Search for places</button>
		</div>
		)
}

export default Search