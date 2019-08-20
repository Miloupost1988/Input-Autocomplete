import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBar from './SearchBar';

storiesOf('SearchBar', module)
  .add('default with hardcoded text', () => <SearchBar/>)
  .add('searchbar with dynamic text', () => <SearchBar
    placeholder='Zoeken'
  />);
