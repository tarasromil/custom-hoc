/** @module custom-hoc/with-inputs */
import { createFactory, Component } from 'react';


/**
 * @param {function} validate - Validator function
 * @param {string|number|Date} value - Value to validate
 * @returns {boolean} - Validation result
 */
const getErrorValue = (validate, value) => !validate(value);


/**
 * @param {object} errors - List of errors
 * @default {object}
 * @returns {boolean} - State of errors
 */
const isNoErrors = (errors = {}) => Object.values(errors).every(err => !err);


/**
 * @param {string} type - Type of state value
 * @returns {string|number|Date} - Default value for state
 */
const getDefaultState = (type = 'string') => {
  const DEFAULT_STATE = {
    string: '',
    number: 0,
    date: new Date(),
  };

  return DEFAULT_STATE[type];
};


/**
 * @param {string|number|Date} defaultValue - Value that will sets by default to state
 * @param {string} type - Type of state value
 * @returns {string|number|Date} - Value for state according to type
 */
const determineValue = (defaultValue, type) => {
  const value = defaultValue || getDefaultState(type);

  switch (type) {
    case 'string':
      return value;
    case 'number':
      return Number.parseInt(value, 10);
    case 'date':
      return new Date(value);
    default:
      return value;
  }
};


/**
 * @function
 * @param {object} inputs - List of input fields
 * @returns {object} - Initial state for Component
 */
const getInitialState = inputs => Object.keys(inputs).reduce((acc, input) => {
  const { defaultValue, type, validate } = inputs[input];
  const value = determineValue(defaultValue, type);

  const state = {
    ...acc,
    [input]: value,
  };

  if (typeof validate === 'function') {
    state.errors = {
      ...acc.errors,
      [input]: getErrorValue(validate, value),
    };
  }

  return state;
}, {});


/**
 * @function
 * @param {object} inputs - List of input fields
 * @returns {Component}
 */
const withInputs = inputs => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  /**
   * @const Contains generated initial state
   * @type {object}
   */
  const initialState = getInitialState(inputs);

  /**
   * @class WithInputs
   * @extends React.Component
   */
  class WithInputs extends Component {
    /** @constructor */
    constructor() {
      super();

      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleClear = this.handleClear.bind(this);

      this.state = initialState;
    }

    /**
     * @method
     * @returns {function} - Event handler for input onChange
     */
    handleOnChange(input, callback) {
      /** @callback */
      return (event) => {
        const { value } = event.target;

        const state = { [input]: value };


        const { validate } = inputs[input];

        if (typeof validate === 'function') {
          state.errors = {
            ...this.state.errors,
            [input]: getErrorValue(validate, value),
          };
        }

        this.setState(state, callback);
      };
    }

    /**
     * @method Resets to initial state
     * @param {function} callback - Will call after setState
     */
    handleClear(callback) {
      this.setState(initialState, callback);
    }

    /** @method */
    render() {
      return factory({
        ...this.props,
        ...this.state,
        submitReady: isNoErrors(this.state.errors),
        onChange: this.handleOnChange,
        onClear: this.handleClear,
      });
    }
  }


  return WithInputs;
};


export default withInputs;
