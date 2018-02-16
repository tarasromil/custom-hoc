import { createFactory, Component } from 'react';


const getErrorValue = ({ validate, value }) => (typeof validate === 'function' ? !validate(value) : false);


const isNoErrors = errors => Object.values(errors).every(err => !err);


const getDefaultState = (type = 'string') => {
  const DEFAULT_STATE = {
    string: '',
    date: new Date(),
    number: 0,
  };

  return DEFAULT_STATE[type];
};


const determineValue = (defaultValue, type) => {
  const value = defaultValue || getDefaultState(type);

  switch (type) {
    case 'number':
      return Number.parseInt(value, 10);
    case 'date':
      return new Date(value);
    default:
      return value;
  }
};


const getInitialState = inputs => Object.keys(inputs).reduce((acc, input) => {
  const { defaultValue, type, validate } = inputs[input];
  const value = determineValue(defaultValue, type);

  return {
    ...acc,
    [input]: value,
    errors: {
      ...acc.errors,
      [input]: getErrorValue({ validate, value }),
    },
  };
}, {});


const withInputs = inputs => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  const initialState = getInitialState(inputs);

  class WithInputs extends Component {
    constructor(...args) {
      super(...args);

      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleClear = this.handleClear.bind(this);

      this.state = initialState;
    }

    handleOnChange(input, callback) {
      return (event) => {
        const { value } = event.target;

        const { validate } = inputs[input];

        this.setState(
          {
            [input]: value,
            errors: {
              ...this.state.errors,
              [input]: getErrorValue({ validate, value }),
            },
          },
          callback,
        );
      };
    }

    handleClear(callback) {
      this.setState(initialState, callback);
    }

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
