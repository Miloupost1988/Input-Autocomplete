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
        showSuggestions: false,
      };
  }

  // check if user input is higher than 2 characters, show suggestions accordingly
  onHandleKeyUp = async (event) => {
    const userInput = event.currentTarget.value;

    if (userInput.length < 2) {
      this.setState({ suggestions: [] });
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
      this.setState({ suggestions: filteredResults });

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
  clearUserInput = () => this.setState({ userInput: "" });

  render() {
    const { userInput, isLoaded, suggestions, showSuggestions } = this.state;
    const { placeholder, errorMessage } = this.props;

    const showClearButton = userInput !== "";
    const showErrorMessage = (userInput.length > 2) && (suggestions.length === 0);

    return (
      <div className="panel">
        <form
          className="form"
          autocomplete="off"
        >
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
                  className="clear-button"
                  onClick={this.clearUserInput}
                >X</div>
            }

            <svg viewBox="0 0 1024 1024" className="css-ha8kg">
              <path
                d="M218 670a318 318 0 0 1 0-451 316 316 0 0 1 451 0 318 318 0 0 1 0 451 316 316 0 0 1-451 0m750 240L756 698a402 402 0 1 0-59 60l212 212c16 16 42 16 59 0 16-17 16-43 0-60"
                className="css-kqzqgg"
              >
              </path>
            </svg>

            { isLoaded && showSuggestions &&
              <SearchSuggestions suggestions={suggestions} value={userInput} />
            }

          </div>

          { showErrorMessage && showSuggestions &&
            <div className="error-message">{errorMessage}</div>
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
