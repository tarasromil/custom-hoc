import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { withOffset } from '../';


describe('withOffset', () => {
  const Component = sinon.spy(() => null);

  const props = () => Component.lastCall.args[0];

  test('withOffset => Default props', () => {
    const EnhancedComponent = withOffset()(Component);

    mount(<EnhancedComponent />);

    const { offset } = props();

    expect(typeof offset).toBe('object');
    expect(typeof offset.top).toBe('number');
    expect(typeof offset.left).toBe('number');
  });
});
