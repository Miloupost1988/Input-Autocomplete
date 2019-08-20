import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';

import SearchBar from './SearchBar';

configure({ adapter: new Adapter() });

describe("SearchBar", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<SearchBar />);
    wrapper.unmount();
  });
})
