import React from 'react';

const SearchSuggestions = (props) => {
  const suggestions = props.suggestions.map(suggestion => (
    <li className="suggestion-list">
      <span>{suggestion.searchterm} ({suggestion.nrResults})</span>
    </li>
  ));
  return <ul className="suggestion-container">{suggestions}</ul>;
};

export default SearchSuggestions;
