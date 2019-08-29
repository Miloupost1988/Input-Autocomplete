import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from "react-highlight-words";

import './SearchSuggestions.css';

const SearchSuggestions = ({ value, suggestions }) => {
  return (
    <div className="suggestions-container">
      {suggestions &&
        suggestions.map(suggestion => (
          <div className="suggestions-list" key={suggestion["nrResults"]}>
            <Highlighter
              highlightClassName="highlight-input"
              activeIndex={-1}
              caseSensitive={false}
              searchWords={[value]}
              textToHighlight={suggestion["searchterm"]}
            />
            <div className="nr-results"> ({suggestion["nrResults"]})</div>
          </div>
        ))}
    </div>
  );
};

export default SearchSuggestions;

SearchSuggestions.propTypes = {
  value: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired
};
