import { createFactory, Component } from 'react';
import { createPortal } from 'react-dom';


const appendToBody = (className = '') => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  class AppendToBody extends Component {
    constructor(props) {
      super(props);

      this.node = window.document.createElement('div');
      const newClasses = className ? ` ${className}` : className;
      this.node.classList = `append-to-body${newClasses}`;
      window.document.body.appendChild(this.node);
    }

    componentWillUnmount() {
      window.document.body.removeChild(this.node);
    }

    render() {
      const PortalComponent = factory(this.props);
      return createPortal(PortalComponent, this.node);
    }
  }

  return AppendToBody;
};


export default appendToBody;
