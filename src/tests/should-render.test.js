import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { shouldRender } from '../';


describe('shouldRender', () => {
  test('shouldRender => Default return', () => {
    const Component = sinon.spy(() => null);

    const EnhancedComponent = shouldRender()(Component);

    mount(<EnhancedComponent />);

    expect(Component.called).toBeTruthy();
  });


  test('shouldRender => Return true', () => {
    const Component = sinon.spy(() => null);

    const EnhancedComponent = shouldRender(() => true)(Component);

    mount(<EnhancedComponent />);

    expect(Component.called).toBeTruthy();
  });


  test('shouldRender => Return false', () => {
    const Component = sinon.spy(() => null);

    const EnhancedComponent = shouldRender(() => false)(Component);

    mount(<EnhancedComponent />);

    expect(Component.called).toBeFalsy();
  });
});
