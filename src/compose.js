/** @module custom-hoc/compose */

/**
 * Combines multiple Higher-order components into one Higher-order component
 * @param {...function} functions - Unlimited number of functions
 * @returns {function} - Higher-order Component
 */
const compose = (...functions) => {
  const numberOfFunctions = functions.length;

  if (numberOfFunctions === 0) {
    return argument => argument;
  }

  if (numberOfFunctions === 1) {
    return functions[0];
  }

  return functions.reduce((aggregated, current) => (...args) => aggregated(current(...args)));
};


export default compose;
