import React, { Component } from 'react';
import SearchBarContainer from './containers/SearchBarContainer';

class App extends Component {
  render() {
    return (
      <div>
        <SearchBarContainer
          placeholder="zoeken"
          errorMessage="Geen match gevonden! Probeer opnieuw"
        />
      </div>
    );
  }
}

export default App;
