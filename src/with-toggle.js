import { compose, withState, withHandlers } from 'recompose';


const withToggle = (
  propName = 'isOpened',
  toggleName = 'toggle',
  defaultValue = false
) => compose(
  withState(propName, toggleName, defaultValue),

  withHandlers({
    show: props => () => props[toggleName](true),
    hide: props => () => props[toggleName](false),
    [toggleName]: props => () => props[toggleName](!props[propName]),
  })
);


export default withToggle;
