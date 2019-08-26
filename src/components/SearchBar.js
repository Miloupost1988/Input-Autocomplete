import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchSuggestions from './SearchSuggestions';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

      this.baseRoute = 'http://localhost:3000';
      this.apiSearchRoute = '/search';

      this.state = {
        error: null,
        isLoaded: false,
        active: false,
        value: "",
        suggestions: [],
        showSuggestions: false,
        filteredResults: [],
        activeSuggestion: 0,
        pressedKeyUp: false
      };
  }

  // async AJAX call to retrieve api data. TO DO: maybe move to axios - cleaner code
  async fetchApiData() {
    await fetch(`${this.baseRoute}${this.apiSearchRoute}?q=${this.state.value}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          suggestions: result.suggestions
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  };

  // populate suggestions [] with data for onkeyup method
  componentDidMount() {
    this.fetchApiData();
  };

  // check if api data is loaded without error, create a true state in order to hide later on onblur
  onKeyUp = () => {
    const { isLoaded, error } = this.state;
    if (isLoaded && !error) {
      this.setState({ showSuggestions: true, pressedKeyUp: true });
    }
  };

  // hide suggestions
  onBlur = () => this.setState({
    active: !this.state.active,
    showSuggestions: false,
  });

  // event is fired when users input changes
  onChange = (event) => {
    const { value, suggestions, pressedKeyUp } = this.state;
    this.setState({
      value: event.target.value,
      pressedKeyUp: false
    }, () => {
      if (value && value.length > 1) {
        if (value.length % 2 === 0) {

          // filters suggestions which do not match the users input
          const filteredResults = suggestions.filter(({ searchterm }) => searchterm.includes(value.toLowerCase()));
          this.setState({ filteredResults: filteredResults });
        }
      }
    })
  };

  renderSuggestions = () => {
    const { suggestions, filteredResults, value, pressedKeyUp, showSuggestions } = this.state;
    const { errorMessage } = this.props;

    if (showSuggestions && value.length > 2) {

      // error case
      if (filteredResults.length === 0) {
        return (
          <div className="errorMessage">{errorMessage}</div>
        );
      }
      return (
        <SearchSuggestions suggestions={filteredResults} />
      );
    } else if(showSuggestions && pressedKeyUp) {
      return (
        <SearchSuggestions suggestions={suggestions}/>
      );
    }
    return null
  };

  clearUserInput = () => this.setState({ value: "", errorShown: false });

  render() {
    const { value } = this.state;
    const { placeholder } = this.props;

    const showClearButton = value !== "";

    return (
      <div className="panel">
        <form className="form">
          <label className="label">Search Bar</label>
          <div className="input-group">
            <input
              value={value}
              placeholder={placeholder}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
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

            { this.renderSuggestions() }

          </div>


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
