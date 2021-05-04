import React from 'react';
import Root from './Root';
import { shallow } from 'enzyme';

jest.mock('react', () => {
  const ActualReact = require.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      authContext: {}
    }),
  };
});

describe('Root', () => {
  it('renders without crashing', () => {
    
    const component = shallow(<Root />);
    expect(component.debug()).toMatchSnapshot();
  });
});
