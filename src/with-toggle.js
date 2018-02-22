/** @module custom-hoc/with-toggle */
import { createFactory, Component } from 'react';


/**
 * @function
 * @param {function} callback - Callback to determine
 * @returns {function|null} - Returns callback if is function or null
 */
const determineCallback = callback => (typeof callback === 'function' ? callback : null);


/**
 * Returns component for handling boolean state
 * @param {string} propName - Name of state value
 * @param {string} toggleName - Name of state handler value
 * @param {boolean} defaultValue - Initial default value
 * @returns {Component}
 */
const withToggle = (
  propName = 'isOpened',
  toggleName = 'toggle',
  defaultValue = false
) => (BaseComponent) => {
  const factory = createFactory(BaseComponent);


  /**
   * @class WithToggle
   * @extends React.Component
   */
  class WithToggle extends Component {
    /** @constructor */
    constructor() {
      super();

      this.state = { [propName]: defaultValue };

      this[toggleName] = this[toggleName].bind(this);
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
    }

    /**
     * @method For toggling boolean state
     * @param {functions} callback - Fires after setState
     */
    [toggleName](callback) {
      const afterCallback = determineCallback(callback);
      this.setState({ [propName]: !this.state[propName] }, afterCallback);
    }


    /**
     * @method Sets state to true
     * @param {functions} callback - Fires after setState
     */
    show(callback) {
      const afterCallback = determineCallback(callback);
      this.setState({ [propName]: true }, afterCallback);
    }


    /**
     * @method Sets state to false
     * @param {functions} callback - Fires after setState
     */
    hide(callback) {
      const afterCallback = determineCallback(callback);
      this.setState({ [propName]: false }, afterCallback);
    }

    /** @method */
    render() {
      return factory({
        ...this.state,
        ...this.props,
        [toggleName]: this[toggleName],
        show: this.show,
        hide: this.hide,
      });
    }
  }


  return WithToggle;
};


export default withToggle;
