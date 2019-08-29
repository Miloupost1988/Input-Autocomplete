import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import SearchSuggestions from '../components/SearchSuggestions';
import fetchSuggestions from '../services/FetchSuggestions';

import './SearchBarContainer.css';

class SearchBarContainer extends Component {
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
  onKeyUp = async (event) => {
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

    const showErrorMessage = (userInput.length > 2) && (suggestions.length === 0);

    return (
      <div className="panel">
        <SearchBar
          userInput={userInput}
          placeholder={placeholder}
          onKeyUp={this.onKeyUp}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange}
          clearUserInput={this.clearUserInput}
        />

        { isLoaded && showSuggestions &&
          <SearchSuggestions suggestions={suggestions} value={userInput} />
        }

        { showErrorMessage && showSuggestions &&
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
