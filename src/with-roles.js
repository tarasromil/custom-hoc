import { createFactory } from 'react';
import { branch } from 'recompose';


const withRoles = allowedRoles => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  const WithRoles = (props, context) => branch(
    () => allowedRoles.includes(context.role),
    factory(props, context)
  );

  return WithRoles;
};


export default withRoles;
