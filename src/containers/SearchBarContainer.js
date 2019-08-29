import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import SearchSuggestions from '../components/SearchSuggestions';
import fetchSuggestions from '../services/FetchSuggestions';

import './SearchBarContainer.css';

const MIN_CHARS_FOR_SUGGESTIONS = 2;

class SearchBarContainer extends Component {
  constructor(props) {
    super(props);

      this.state = {
        userInput: "",
        suggestions: [],
        showSuggestions: false,
      };
  }

  clearSuggestions = () => {
    this.setState({
      suggestions: [],
      showSuggestions: false
    });
  }

  // check if user input is higher than 2 characters, show suggestions accordingly
  handleKeyUp = async (event) => {
    const userInput = event.currentTarget.value;

    if (userInput.length < MIN_CHARS_FOR_SUGGESTIONS) {
      this.clearSuggestions();
      return;
    }

    try {
      const response = await fetchSuggestions(userInput);

      const filteredResults = response.suggestions.filter(({ searchterm }) => searchterm.includes(userInput.toLowerCase()));
      this.setState({
        suggestions: filteredResults,
        showSuggestions: true
      });

    } catch (err) {
      console.log(err);
    }
  }

  // hide suggestions
  handleBlur = () => this.setState({
    showSuggestions: false,
  });

  // event is fired when users input changes
  handleChange = (event) => {
    this.setState({
      userInput: event.target.value,
    })
  };

  // deletes user input
  handleClearUserInput = () => this.setState({ userInput: "" });

  render() {
    const { userInput, suggestions, showSuggestions } = this.state;
    const { placeholder, errorMessage } = this.props;

    const showErrorMessage = (userInput.length > MIN_CHARS_FOR_SUGGESTIONS) && (suggestions.length === 0) && showSuggestions;

    return (
      <div className="panel">
        <SearchBar
          userInput={userInput}
          placeholder={placeholder}
          onKeyUp={this.handleKeyUp}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          clearUserInput={this.handleClearUserInput}
        />

        { showSuggestions && suggestions.length > 0 &&
          <SearchSuggestions suggestions={suggestions} value={userInput} />
        }

        { showErrorMessage &&
          <div className="error-message">{errorMessage}</div>
        }

      </div>
    );
  }
}

SearchBarContainer.propTypes = {
  placeholder: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default SearchBarContainer;
