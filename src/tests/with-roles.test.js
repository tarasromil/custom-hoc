import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { withRoles } from '../';


describe('withRoles', () => {
  test('withRoles => Check calling', () => {
    const Component = sinon.spy(() => null);

    const EnhancedComponent = withRoles('admin')(Component);

    mount(<EnhancedComponent />);

    expect(Component.calledOnce).toBeTruthy();
  });
});
