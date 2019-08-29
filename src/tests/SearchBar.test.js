import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import SearchBar from '../components/SearchBar';

configure({ adapter: new Adapter() });

describe("Search Bar", () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      userInput: "value",
      placeholder: "placeholder",
      onBlur: jest.fn(() => "onBlur"),
      onKeyUp: jest.fn(() => "onKeyUp"),
      onChange: jest.fn(() => "onChange"),
      clearUserInput: jest.fn(() => "clearUserInput")
    };
    wrapper = mount(<SearchBar {...props} />);
  });

  it("should render searchbar component without crashing", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render a form with class form", () => {
    expect(wrapper.find('.form').hasClass('form')).toEqual(true);
  });

  it("should have props placeholder", () => {
    expect(wrapper.prop('placeholder')).toEqual('placeholder');
  })

  it("should have props userInput", () => {
    expect(wrapper.prop('userInput')).toEqual('value');
  })

  it("should render a div with class input-group", () => {
    expect(wrapper.find("div.input-group")).toHaveLength(1);
  });

  it("should call onChange when input is selected", () => {
    wrapper.find("input").simulate("change");
    expect(props.onChange).toHaveBeenCalled();
  });

  it("should call onKeyUp when input is selected", () => {
    wrapper.find("input").simulate("keyup");
    expect(props.onKeyUp).toHaveBeenCalled();
  });

  it("should call clearUserInput when clear-button is selected", () => {
    wrapper.find("div.clear-button").simulate("click");
    expect(props.clearUserInput).toHaveBeenCalled();
  });
});
