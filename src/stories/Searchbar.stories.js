import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SearchBar from '../components/SearchBar';
import SearchSuggestions from '../components/SearchSuggestions';

storiesOf('SearchBar', module)
  .add('default', () => <SearchBar />)
  .add('searchbar with functionality', () => <SearchBar
    userInput='ken'
    placeholder='Zoeken'
    errorMessage='oeps, er is iets misgegaan'
    onKeyUp={action('onKeyUp')}
    onBlur={action('onBlur')}
    onChange={action('onChange')}
    clearUserInput={action('clearUserInput')}
  />);

  storiesOf('SearchSuggestions', module)
  .add('default', () => <SearchSuggestions />)
  .add('with prefilled userinput and json response', () => (
    <SearchSuggestions
      value={'ken'}
      suggestions={[
        {
          searchterm: 'heren truien',
          nrResults: 1100
        },
        {
          searchterm: 'dames truien',
          nrResults: 1501
        },
        {
          searchterm: 'kenzo trui',
          nrResults: 62
        },
        {
          searchterm: 'kenzo trui dames',
          nrResults: 21
        },
        {
          searchterm: 'kenzo trui heren',
          nrResults: 12
        },
        {
          searchterm: 'armani truien',
          nrResults: 39
        },
        {
          searchterm: 'daily paper trui',
          nrResults: 2
        },
        {
          searchterm: 'calvin klein trui',
          nrResults: 54
        },
        {
          searchterm: 'calvin klein trui heren rood',
          nrResults: 40
        },
        {
          searchterm: 'calvin klein trui heren blauw',
          nrResults: 50
        },
        {
          searchterm: 'calvin klein trui heren oranje',
          nrResults: 42
        }
      ]}
    />
  ));
