import { withContext } from 'recompose';
import T from 'prop-types';

const setRoles = getRole => withContext(
  { role: T.string },
  props => ({ role: getRole(props) }),
);


export default setRoles;
