import React, { Component } from 'react';
import SearchBar from './components/SearchBar';

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar
          placeholder="zoeken"
          errorMessage="oeps, er is iets misgegaan"
        />
      </div>
    );
  }
}

export default App;
