import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { withToggle } from '../';


describe('withToggle', () => {
  const Component = sinon.spy(() => null);

  const props = () => Component.lastCall.args[0];

  test('withToggle => Default props', () => {
    const EnhancedComponent = withToggle()(Component);

    mount(<EnhancedComponent />);

    expect(props().isOpened).toBeFalsy();
    expect(typeof props().toggle).toBe('function');
    expect(typeof props().show).toBe('function');
    expect(typeof props().hide).toBe('function');
  });


  test('withToggle => Custom props', () => {
    const EnhancedComponent = withToggle('shouldShow', 'toggleShow', true)(Component);

    mount(<EnhancedComponent />);

    expect(props().shouldShow).toBeTruthy();
    expect(typeof props().toggleShow).toBe('function');
    expect(typeof props().show).toBe('function');
    expect(typeof props().hide).toBe('function');
  });


  test('withToggle => Check handlers', () => {
    const EnhancedComponent = withToggle()(Component);

    mount(<EnhancedComponent />);

    expect(props().isOpened).toBeFalsy();

    props().toggle();
    expect(props().isOpened).toBeTruthy();

    props().hide();
    expect(props().isOpened).toBeFalsy();

    props().show();
    expect(props().isOpened).toBeTruthy();
  });
});
