import { compose, withState, withHandlers } from 'recompose';


const withToggle = (
  propName = 'isOpened',
  toggleName = 'toggle',
  defaultValue = false
) => compose(
  withState(propName, toggleName, defaultValue),
  withHandlers({
    [toggleName]: props => () => props[toggleName](!props[propName]),
    show: props => () => props[toggleName](true),
    hide: props => () => props[toggleName](false),
  })
);


export default withToggle;
