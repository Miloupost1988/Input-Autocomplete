import React from 'react';

import './SearchSuggestions.css';

const SearchSuggestions = (props) => {
  const suggestions = props.suggestions.map(suggestion => (

    <div
      className="suggestion-list"
      onClick={e => props.onClick(e)}
    >
      <span
        key={suggestion}
      >{suggestion.searchterm} ({suggestion.nrResults})</span>
    </div>
  ));
  return <div className="suggestion-container">{suggestions}</div>;
};

export default SearchSuggestions;
