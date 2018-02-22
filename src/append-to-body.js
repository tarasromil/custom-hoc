/** @module custom-hoc/append-to-body */
import { createFactory, Component } from 'react';
import { createPortal } from 'react-dom';


/**
 * @param {string} className - Additional class(es) for Element
 * @returns {Component} Returns HoC that append wrapped component to body Element
 */
const appendToBody = (className = '') => (BaseComponent) => {
  const appendToBodyFactory = createFactory(BaseComponent);

  /**
   * @class AppendToBody
   * @extends React.Component
   */
  class AppendToBody extends Component {
    /** @constructor */
    constructor(props) {
      super(props);

      this.node = window.document.createElement('div');
      const newClasses = className ? ` ${className}` : className;
      this.node.classList = `append-to-body${newClasses}`;

      window.document.body.appendChild(this.node);
    }

    /** @method */
    componentWillUnmount() {
      window.document.body.removeChild(this.node);
    }

    /** @method */
    render() {
      const PortalComponent = appendToBodyFactory(this.props);
      return createPortal(PortalComponent, this.node);
    }
  }

  return AppendToBody;
};


export default appendToBody;
