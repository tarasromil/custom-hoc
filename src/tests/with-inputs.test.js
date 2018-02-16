import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { withInputs } from '../';


const toEvent = value => ({ target: { value } });


describe('withInputs', () => {
  const Component = sinon.spy(() => null);

  const props = () => Component.lastCall.args[0];

  const TextInputs = withInputs({
    name: {
      defaultValue: 'Bob',
      validate: value => value.length,
    },
    birthday: {
      type: 'date',
      validate: value => value.getDate() === new Date().getDate(),
    },
    zip: {
      type: 'number',
      defaultValue: 46000,
      validate: value => !Number.isNaN(value),
    },
  })(Component);


  mount(<TextInputs />);


  test('withInputs => Initial props', () => {
    expect(props().name).toBe('Bob');
    expect(props().birthday.getDate()).toBe(new Date().getDate());
    expect(props().zip).toBe(46000);

    expect(Object.values(props().errors).every(e => !e)).toBeTruthy();
    expect(props().submitReady).toBeTruthy();

    expect(typeof props().onChange).toBe('function');
    expect(typeof props().onChange('name')).toBe('function');
    expect(typeof props().onClear).toBe('function');
  });

  test('withInputs => Change values and check validation', () => {
    props().onChange('name')(toEvent('Alice'));

    expect(props().name).toBe('Alice');

    props().onChange('birthday')(toEvent(new Date(0)));

    expect(props().birthday.getYear()).toBe(70);

    props().onChange('zip')(toEvent('foo'));

    expect(Object.values(props().errors).every(e => e)).toBeFalsy();
    expect(props().submitReady).toBeFalsy();
  });

  test('withInputs => Clear values', () => {
    props().onClear();

    expect(props().name).toBe('Bob');
    expect(props().birthday.getDate()).toBe(new Date().getDate());
    expect(props().zip).toBe(46000);

    expect(Object.values(props().errors).every(e => !e)).toBeTruthy();
    expect(props().submitReady).toBeTruthy();

    expect(typeof props().onChange).toBe('function');
    expect(typeof props().onChange('name')).toBe('function');
    expect(typeof props().onClear).toBe('function');
  });
});
