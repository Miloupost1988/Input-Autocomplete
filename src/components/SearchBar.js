import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
      this.state = {
        active: false,
        value: "",
      };
  }

  onFocus = () => this.setState({ active: !this.state.active });

  onBlur = () => this.setState({ active: !this.state.active })

  clearUserInput = () => this.setState({ value: "" });

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { active, value, errorMessage } = this.state;
    const { placeholder } = this.props;

    const showClearButton = value !== "";

    return (
      <div className="panel">
        <form className="form">
          <label className="label">Search Bar</label>
          <div className="input-group">
            <input
              type="text"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={(e) => this.onChange(e)}
              value={value}
              placeholder={placeholder}
            />

            { showClearButton &&
              <div
                className="clearButton"
                onClick={this.clearUserInput}
              >X</div> }

            <button type="button">
              <svg viewBox="0 0 1024 1024" className="css-ha8kg">
                <path
                  d="M218 670a318 318 0 0 1 0-451 316 316 0 0 1 451 0 318 318 0 0 1 0 451 316 316 0 0 1-451 0m750 240L756 698a402 402 0 1 0-59 60l212 212c16 16 42 16 59 0 16-17 16-43 0-60"
                  className="css-kqzqgg"
                >
                </path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired
};

export default SearchBar;
