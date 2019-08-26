import React, { Component } from 'react';
import SearchBar from './components/SearchBar';

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar
          placeholder="zoeken"
          errorMessage="Geen match gevonden! Probeer opnieuw"
        />
      </div>
    );
  }
}

export default App;
