import React from 'react';
import { shallow, render, mount } from 'enzyme';
import aboutPage from './aboutPage';

describe('aboutPage', () => {
  let props;
  let shallowaboutPage;
  let renderedaboutPage;
  let mountedaboutPage;

  const shallowTestComponent = () => {
    if (!shallowaboutPage) {
      shallowaboutPage = shallow(<aboutPage {...props} />);
    }
    return shallowaboutPage;
  };

  const renderTestComponent = () => {
    if (!renderedaboutPage) {
      renderedaboutPage = render(<aboutPage {...props} />);
    }
    return renderedaboutPage;
  };

  const mountTestComponent = () => {
    if (!mountedaboutPage) {
      mountedaboutPage = mount(<aboutPage {...props} />);
    }
    return mountedaboutPage;
  };  

  beforeEach(() => {
    props = {};
    shallowaboutPage = undefined;
    renderedaboutPage = undefined;
    mountedaboutPage = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
