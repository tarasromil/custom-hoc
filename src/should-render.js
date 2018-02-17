import { createFactory } from 'react';


/**
 * @param shouldRenderFunction {Function}
 * @returns {HoC} Height-Order Component
 */
const shouldRender = (shouldRenderFunction = () => true) => (BaseComponent) => {
  const showRenderFactory = createFactory(BaseComponent);

  const ShouldRender = (props) => {
    if (shouldRenderFunction(props)) {
      return showRenderFactory(props);
    }

    return null;
  };

  return ShouldRender;
};


export default shouldRender;
