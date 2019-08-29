import React from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';

const SearchBar = ({
  userInput,
  placeholder,
  onKeyUp,
  onBlur,
  onChange,
  clearUserInput
}) => {

  const showClearButton = userInput !== "";

  return (
    <form
      className="form"
      autoComplete="off"
    >
      <label className="label">Search Bar</label>
      <div className="input-group">
        <input
          value={userInput}
          placeholder={placeholder}
          onKeyUp={e => onKeyUp(e)}
          onBlur={onBlur}
          onChange={e => onChange(e)}
        />

        { showClearButton &&
            <div
              className="clear-button"
              onClick={clearUserInput}
            >X</div>
        }

        <svg viewBox="0 0 1024 1024" className="css-ha8kg">
          <path
            d="M218 670a318 318 0 0 1 0-451 316 316 0 0 1 451 0 318 318 0 0 1 0 451 316 316 0 0 1-451 0m750 240L756 698a402 402 0 1 0-59 60l212 212c16 16 42 16 59 0 16-17 16-43 0-60"
            className="css-kqzqgg"
          >
          </path>
        </svg>

      </div>
    </form>
  );
}

SearchBar.propTypes = {
  userInput: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  clearUserInput: PropTypes.func.isRequired
};

export default SearchBar;
