/** @module custom-hoc/with-inputs */
import { createFactory, Component } from 'react';


/**
 * @param {HTMLElement} target - Checking element
 * @param {string[]} oldValues - Current values from state
 * @returns {string[]}
 */
const getChecked = (target, oldValues) => {
  const newSet = new Set(oldValues);
  if (target.checked) {
    newSet.add(target.value);
  } else {
    newSet.delete(target.value);
  }
  return [...newSet];
};


/**
 * @param {HTMLElement} select - Checking element
 * @returns {string[]}
 */
const getSelected = select => ([...select]
  .filter(option => option.selected)
  .map(option => option.value));


/**
 * Checks for selected type
 * @param {HTMLElement} target - Checking element
 * @returns {boolean}
 */
const isSelectTarget = target => target.checked === undefined && target.type === 'select-multiple';


/**
 * @param {HTMLElement} target - Checking element
 * @param {string[]} oldValues - Current values from state
 * @returns {string[]} - Returns array of selected or checked items
 */
const getArrayValue = (target, oldValues) => (isSelectTarget(target) ?
  getSelected(target) :
  getChecked(target, oldValues));


/**
 * @param {function} validate - Validator function
 * @param {string|number|Date|Array} value - Value to validate
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
 * @returns {string|number|Date|Array} - Default value for state
 */
const getDefaultState = (type = 'string') => {
  const DEFAULT_STATE = {
    string: '',
    number: 0,
    date: new Date(),
    array: [],
  };

  return DEFAULT_STATE[type];
};


/**
 * @param {string|number|Date|Array} defaultValue - Value that will sets by default to state
 * @param {string} type - Type of state value
 * @returns {string|number|Date|Array} - Value for state according to type
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
    case 'array':
      return [].concat(value);
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
    errors: {},
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
        const { validate, type } = inputs[input];

        const value = (type === 'array') ?
          getArrayValue(event.target, this.state[input]) :
          event.target.value;

        const state = { [input]: value };

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
