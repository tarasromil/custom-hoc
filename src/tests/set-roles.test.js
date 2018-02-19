import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { setRoles } from '../';


describe('setRoles', () => {
  test('setRoles => Check calling', () => {
    const Component = sinon.spy(() => null);

    const EnhancedComponent = setRoles(() => 'admin')(Component);

    mount(<EnhancedComponent />);

    expect(Component.calledOnce).toBeTruthy();
  });
});
