/** @module custom-hoc/with-roles */
import { createFactory } from 'react';
import T from 'prop-types';


/**
 * Contains types for roles
 * @type {{roles: Array|String}}
 */
const contextTypes = {
  roles: T.oneOfType([
    T.string,
    T.array,
  ]),
};


/**
 * @throws Exception if "roles" is not Array or String
 * @param roles {*}
 */
const checkAllowedRoles = (roles) => {
  if (typeof roles !== 'string' && !Array.isArray(roles)) {
    throw new Error('You must pass right roles (Array or String)');
  }
};


/**
 * @param {string|Array} contextRoles - Roles from parent context
 * @param {string|Array} allowedRoles - Roles from passed arguments
 * @return {boolean}
 */
const areRolesMatchs = (contextRoles, allowedRoles) => {
  const arrayContextRoles = [].concat(contextRoles);
  const arrayAllowedRoles = [].concat(allowedRoles);

  return arrayContextRoles.some(role => arrayAllowedRoles.includes(role));
};


/**
 * Compares roles from context and passed allowed roles
 * and checks cases when component should render.
 * @param {function|string|Array} getAllowedRoles
 * @returns {Component}
 */
const withRoles = getAllowedRoles => (BaseComponent) => {
  const withRolesFactory = createFactory(BaseComponent);

  /** @function WithRoles */
  const WithRoles = (props, context) => {
    const allowedRoles = typeof getAllowedRoles === 'function' ?
      getAllowedRoles(props) :
      getAllowedRoles;

    checkAllowedRoles(allowedRoles);

    const rolesMatchs = areRolesMatchs(context.roles, allowedRoles);

    return rolesMatchs ? withRolesFactory({ ...props, roles: context.roles }) : null;
  };

  WithRoles.contextTypes = contextTypes;

  return WithRoles;
};


export default withRoles;
