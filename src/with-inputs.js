import { createFactory, Component } from 'react';


const getErrorValue = (validate, value) => (typeof validate === 'function' ? !validate(value) : false);


const isNoErrors = errors => Object.values(errors).every(err => !err);


const getDefaultState = (type = 'string') => {
  const DEFAULT_STATE = {
    string: '',
    date: new Date(),
    number: 0,
  };

  return DEFAULT_STATE[type];
};


const getInitialState = inputs => Object.keys(inputs).reduce((acc, input) => {
  const item = inputs[input];
  const value = item.defaultValue || getDefaultState(item.type);

  return {
    ...acc,
    [input]: value,
    errors: {
      ...acc.errors,
      [input]: getErrorValue(item.validate, value),
    },
  };
}, {});


const withInputs = inputs => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  const initialState = getInitialState(inputs);

  class WithInputs extends Component {
    constructor(props) {
      super(props);

      this.state = initialState;
    }

    handleOnChange(input) {
      return (event) => {
        const { value } = event.target;

        const item = inputs[input];

        this.setState({
          [input]: value,
          errors: {
            ...this.state.errors,
            [input]: getErrorValue(item.validate, value),
          },
        });
      };
    }

    handleClear() {
      this.setState(initialState);
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
