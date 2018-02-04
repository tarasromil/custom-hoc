import { createFactory } from 'react';
import { withStateHandlers } from 'recompose';


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


const getInitialState = inputs => Object.keys(inputs).reduce((acc, input) => {
  const { defaultValue, type, validate } = inputs[input];
  const value = defaultValue || getDefaultState(type);

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

  const WithInputs = props => factory({
    ...props,
    submitReady: isNoErrors(props.errors),
  });

  const hoc = withStateHandlers(
    initialState,
    {
      onClear: () => initialState,
      onChange: state => input => event => ({
        [input]: event.target.value,
        errors: {
          ...state.errors,
          [input]: getErrorValue({
            validate: inputs[input].validate,
            value: event.target.value,
          }),
        },
      }),
    }
  );

  return hoc(WithInputs);
};


export default withInputs;
