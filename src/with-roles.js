import { createFactory } from 'react';
import T from 'prop-types';


const isString = string => typeof string === 'string';


const isArray = array => Array.isArray(array);


const checkAllowedRoles = (allowedRoles) => {
  if (!isString(allowedRoles) && !isArray(allowedRoles)) {
    throw new Error('You must pass right roles (Array or String)');
  }
};


const withRoles = allowedRoles => (BaseComponent) => {
  checkAllowedRoles(allowedRoles);

  const isAllowedRolesString = isString(allowedRoles);
  const isAllowedRolesArray = isArray(allowedRoles);


  const whenRolesIsArray = (roles) => {
    if (isAllowedRolesArray) {
      return allowedRoles.some(role => roles.includes(role));
    } else if (isAllowedRolesString) {
      return roles.includes(allowedRoles);
    }
    return false;
  };


  const whenRolesIsString = (roles) => {
    if (isAllowedRolesArray) {
      return allowedRoles.includes(roles);
    } else if (isAllowedRolesString) {
      return allowedRoles === roles;
    }
    return false;
  };


  const withRolesFactory = createFactory(BaseComponent);


  const WithRoles = (props, { roles }) => {
    let shouldRender = roles === undefined;

    if (isArray(roles)) {
      shouldRender = whenRolesIsArray(roles);
    } else if (isString(roles)) {
      shouldRender = whenRolesIsString(roles);
    }

    return shouldRender ? withRolesFactory({ ...props, roles }) : null;
  };


  WithRoles.contextTypes = {
    roles: T.oneOfType([
      T.string,
      T.array,
    ]),
  };


  return WithRoles;
};


export default withRoles;
