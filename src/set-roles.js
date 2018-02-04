import { withContext } from 'recompose';
import T from 'prop-types';

const setRoles = getRole => withContext({
  childContextTypes: {
    role: T.string,
  },
  getChildContext: props => ({ role: getRole(props) }),
});


export default setRoles;
