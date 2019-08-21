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
        suggestionsShown: false
      };
  }

  componentDidMount = (query) => {
    fetch(`${this.baseRoute}${this.apiSearchRoute}?q=${query}`)
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
  }

  onFocus = () => this.setState({ active: !this.state.active });

  onBlur = () => this.setState({ active: !this.state.active });

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  onKeyUp = () => {
    const { isLoaded, error } = this.state;
    if (isLoaded && !error) {
      this.setState({ suggestionsShown: true });
    }
  };

  clearUserInput = () => this.setState({ value: "" });

  render() {
    const { error, isLoaded, active, value, suggestions, suggestionsShown } = this.state;
    const { placeholder, errorMessage } = this.props;

    const showSuggestions = active && isLoaded;
    const showClearButton = value !== "";
    const showErrorMessage = error && isLoaded;

    return (
      <div className="panel">
        <form className="form">
          <label className="label">Search Bar</label>
          <div className="input-group">
            <input
              type="text"
              value={value}
              placeholder={placeholder}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
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

            { showSuggestions && suggestionsShown &&
                <SearchSuggestions suggestions={suggestions}/>
            }

          </div>
          { showErrorMessage &&
              <div className="errorMessage">{errorMessage}</div>
          }
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired
};

export default SearchBar;
