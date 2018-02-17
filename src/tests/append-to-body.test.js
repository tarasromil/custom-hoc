import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { appendToBody } from '../';


describe('appendToBody', () => {
  test('appendToBody => Check calling', () => {
    const Component = sinon.spy(() => null);

    const EnhancedComponent = appendToBody()(Component);

    mount(<EnhancedComponent />);

    expect(Component.calledOnce).toBeTruthy();
  });
});
