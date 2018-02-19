import { createFactory, Component } from 'react';
import T from 'prop-types';


const setRoles = getRoles => (BaseComponent) => {
  const setRolesFactory = createFactory(BaseComponent);

  class SetRoles extends Component {
    getChildContext() {
      return { roles: getRoles(this.props) };
    }

    render() {
      return setRolesFactory(this.props);
    }
  }

  SetRoles.childContextTypes = {
    roles: T.oneOfType([
      T.string,
      T.array,
    ]).isRequired,
  };

  return SetRoles;
};


export default setRoles;
