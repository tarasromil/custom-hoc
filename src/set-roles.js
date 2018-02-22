/** @module custom-hoc/set-roles */
import { createFactory, Component } from 'react';
import T from 'prop-types';


/**
 * Contains types for roles
 * @type {{roles: Array|String}}
 */
const childContextTypes = {
  roles: T.oneOfType([
    T.string,
    T.array,
  ]).isRequired,
};


/**
 * Returns HoC that sets passed roles to child context
 * @param {function} getRoles - Gets roles from passed props
 * @return {Component}
 */
const setRoles = getRoles => (BaseComponent) => {
  const setRolesFactory = createFactory(BaseComponent);

  /**
   * @class SetRoles
   * @extends React.Component
   */
  class SetRoles extends Component {
    /** @method */
    getChildContext() {
      return { roles: getRoles(this.props) };
    }

    /** @method */
    render() {
      return setRolesFactory(this.props);
    }
  }

  SetRoles.childContextTypes = childContextTypes;

  return SetRoles;
};


export default setRoles;
