import { withStateHandlers } from 'recompose';


const withToggle = (
  propName = 'isOpened',
  toggleName = 'toggle',
  defaultValue = false
) => withStateHandlers(
  { [propName]: defaultValue },
  {
    show: props => () => props[toggleName](true),
    hide: props => () => props[toggleName](false),
    [toggleName]: props => () => props[toggleName](!props[propName]),
  }
);


export default withToggle;
