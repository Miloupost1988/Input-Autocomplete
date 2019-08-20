import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  render() {
    return (
      <div className="panel">
        <form className="form">
          <label className="label">Search Bar</label>
          <div className="input-group">
            <input
              type="search"
              placeholder="Zoeken"
            />
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

export default SearchBar;
