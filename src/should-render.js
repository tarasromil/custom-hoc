/** @module custom-hoc/should-render */
import { createFactory } from 'react';


/**
 * @param {function} getCondition - Returns condition statement that handles rendering Component
 * @returns {Component}
 */
const shouldRender = (getCondition = () => true) => (BaseComponent) => {
  const shouldRenderFactory = createFactory(BaseComponent);

  /** @function ShouldRender */
  const ShouldRender = (props) => {
    if (getCondition(props)) {
      return shouldRenderFactory(props);
    }

    return null;
  };

  return ShouldRender;
};


export default shouldRender;
