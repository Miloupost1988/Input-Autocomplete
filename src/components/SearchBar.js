import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchSuggestions from '../services/FetchSuggestions';
import SearchSuggestions from './SearchSuggestions';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

      this.state = {
        isLoaded: false,
        active: false,
        userInput: "",
        suggestions: [],
        filteredResults: [],
        showSuggestions: false,
      };
  }

  // check if user input is higher than 2 characters, show suggestions accordingly
  onHandleKeyUp = async (event) => {
    const userInput = event.currentTarget.value;

    if (userInput.length < 2) {
      this.setState({ filteredResults: [] });
      return;
    }

    try {
      const response = await fetchSuggestions(userInput);
      this.setState({
        suggestions: response.suggestions,
        isLoaded: true,
        showSuggestions: true
      });

      const filteredResults = this.state.suggestions.filter(({ searchterm }) => searchterm.includes(userInput.toLowerCase()));
      this.setState({ filteredResults });

    } catch (err) {
      throw err;
    }
  }

  // hide suggestions
  onBlur = () => this.setState({
    active: !this.state.active,
    showSuggestions: false,
  });

  // event is fired when users input changes
  onChange = (event) => {
    this.setState({
      userInput: event.target.value,
    })
  };

  // deletes user input
  clearUserInput = () => this.setState({ value: "" });

  render() {
    const { userInput, suggestions, isLoaded, filteredResults, showSuggestions } = this.state;
    const { placeholder, errorMessage } = this.props;

    const showClearButton = userInput !== "";
    const showErrorMessage = (userInput.length > 2) && (filteredResults.length === 0);

    return (
      <div className="panel">
        <form className="form">
          <label className="label">Search Bar</label>
          <div className="input-group">
            <input
              value={userInput}
              placeholder={placeholder}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onKeyUp={this.onHandleKeyUp}
              onKeyDown={this.onKeyDown}
            />

            { showClearButton &&
                <div
                  className="clearButton"
                  onClick={this.clearUserInput}
                >X</div>
            }

            <button type="button">
              <svg viewBox="0 0 1024 1024" className="css-ha8kg">
                <path
                  d="M218 670a318 318 0 0 1 0-451 316 316 0 0 1 451 0 318 318 0 0 1 0 451 316 316 0 0 1-451 0m750 240L756 698a402 402 0 1 0-59 60l212 212c16 16 42 16 59 0 16-17 16-43 0-60"
                  className="css-kqzqgg"
                >
                </path>
              </svg>
            </button>

            { isLoaded &&
              <SearchSuggestions suggestions={filteredResults} />
            }

          </div>

          { showErrorMessage && showSuggestions &&
            <div className="errorMessage">{errorMessage}</div>
          }


        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default SearchBar;
