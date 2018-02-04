import { compose, withState, withHandlers } from 'recompose';


const withToggle = (
  propName = 'show',
  toggleName = 'toggle',
  defaultValue = false
) => compose(
  withState(propName, toggleName, defaultValue),
  withHandlers({
    [toggleName]: props => () => props[toggleName](!props[propName]),
  })
);


export default withToggle;
