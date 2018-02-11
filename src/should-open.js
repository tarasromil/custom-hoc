import { createFactory } from 'react';


/**
 * @param func {Function}
 * @returns {Boolean} Type of argument is function
 */
const isFunction = func => typeof func === 'function';


/**
 * @param shouldOpenFunc {Function}
 * @param withPropsFunc {Function}
 * @returns {HOC} Height-Order Component
 */
const shouldOpen = (shouldOpenFunc, withPropsFunc) => (BaseComponent) => {
  const showOpenFactory = createFactory(BaseComponent);

  const ShouldOpen = (props) => {
    const isOpened = isFunction(shouldOpenFunc) ? shouldOpenFunc(props) : true;

    if (isOpened) {
      let newProps = { ...props };

      if (isFunction(withPropsFunc)) {
        newProps = {
          ...newProps,
          ...withPropsFunc(props),
        };
      }

      return showOpenFactory(newProps);
    }

    return null;
  };

  return ShouldOpen;
};


export default shouldOpen;
