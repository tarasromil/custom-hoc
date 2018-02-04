import { createFactory, Component } from 'react';


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
      [input]: isFunction(item.validate),
    },
  };
}, {});


const isFunction = func => typeof func === 'function';


const isNoErrors = errors => Object.values(errors).every(err => !err);


const withInputs = inputs => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  const initialState = getInitialState(inputs);

  class WithInputs extends Component {
    state = initialState;

    handleOnChange = input => (event) => {
      const value = event.target.value;

      const item = inputs[input];

      const errorValue = isFunction(item.validate) ? !item.validate(value) : false;

      this.setState({
        [input]: value,
        errors: {
          ...this.state.errors,
          [input]: errorValue,
        },
      });
    };

    handleClear = () => this.setState(initialState);

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
