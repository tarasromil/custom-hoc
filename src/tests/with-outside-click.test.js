import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { withOutsideClick } from '../';


describe('withOutsideClick', () => {
  test('withOutsideClick => Check calling', () => {
    const Component = sinon.spy(() => null);

    const EnhancedComponent = withOutsideClick()(Component);

    mount(<EnhancedComponent />);

    expect(Component.calledOnce).toBeTruthy();
  });
});
