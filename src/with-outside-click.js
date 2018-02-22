/** @module custom-hoc/with-outside-click */
import React, { createFactory, Component } from 'react';

import { eventStackFactory } from 'event-stack-factory';


/** @type {{push: (function(Object)), pop: (function())}} */
const EventStack = eventStackFactory({ capture: true });


/**
 * @param {function} getOnClick - Receives props and returns onClickOutsideCallback
 * @param {boolean} useEscape - State of using "Escape" key for firing callback
 * @param {Array} additionalKeyCodes - Array with keyCodes for firing callback
 * @returns {Component}
 */
const withOutsideClick = (getOnClick = () => null, useEscape = true, additionalKeyCodes = []) => (BaseComponent) => {
  const withOutsideFactory = createFactory(BaseComponent);

  let keyCodes = additionalKeyCodes.slice();

  if (useEscape && !keyCodes.includes(27)) {
    keyCodes = keyCodes.concat(27);
  }

  /**
   * @class WithOutsideClick
   * @extends React.Component
   */
  class WithOutsideClick extends Component {
    /** @method */
    componentDidMount() {
      const clickOutside = getOnClick(this.props);

      const onClick = (event) => {
        if (this.isClick(event) || this.isKeydown(event)) {
          clickOutside(event);
        }
      };

      const events = (keyCodes.length > 0) ?
        { click: onClick, keydown: onClick } :
        { click: onClick };

      EventStack.push(events);
    }

    /** @method */
    componentWillUnmount() {
      EventStack.pop();
    }

    /**
     * @method
     * @param event
     * @returns {boolean}
     */
    isClick(event) {
      return (
        event.type === 'click'
        && event.which === 1
        && !this.node.contains(event.target)
      );
    }

    /**
     * @method
     * @param event
     * @returns {boolean}
     */
    isKeydown(event) {
      const isKeydown = (
        keyCodes.length > 0
        && event.type === 'keydown'
        && keyCodes.includes(event.keyCode)
      );

      if (isKeydown) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }

      return isKeydown;
    }

    /**
     * @method
     * @returns {JSX}
     */
    render() {
      return (
        <div
          style={{ display: 'inline-block' }}
          className="withOutsideClick"
          ref={(node) => { this.node = node; }}
        >
          {withOutsideFactory(this.props)}
        </div>
      );
    }
  }

  return WithOutsideClick;
};


export default withOutsideClick;
