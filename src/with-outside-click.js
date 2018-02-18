import React, { createFactory, Component } from 'react';

import { eventStackFactory } from './utils';


const EventStack = eventStackFactory({ capture: true });


/**
 * @param getOnClick {Function} Receives props and returns onClickOutsideCallback
 * @param useEscape {Boolean} State of using "Escape" key for calling callback
 * @returns {Function|HoC}
 */
const withOutsideClick = (getOnClick = () => null, useEscape = true) => (BaseComponent) => {
  const factory = createFactory(BaseComponent);


  class WithOutsideClick extends Component {
    constructor(props) {
      super(props);

      const clickOutside = getOnClick(props);

      this.onClick = (event) => {
        if (this.isMouseClick(event) || this.isEscape(event)) {
          clickOutside(event);
        }
      };
    }

    componentDidMount() {
      let events = { click: this.onClick };

      if (useEscape) {
        events = { ...events, keydown: this.onClick };
      }

      EventStack.push(events);
    }

    componentWillUnmount() {
      EventStack.pop();
    }

    isMouseClick(event) {
      return (
        event.type === 'click'
        && event.which === 1
        && !this.node.contains(event.target)
      );
    }

    isEscape(event) {
      return (
        useEscape
        && event.type === 'keydown'
        && event.keyCode === 27
      );
    }

    render() {
      return (
        <div
          style={{ display: 'inline-block' }}
          className="withOutsideClick"
          ref={(node) => { this.node = node; }}
        >
          {factory(this.props)}
        </div>
      );
    }
  }

  return WithOutsideClick;
};


export default withOutsideClick;
