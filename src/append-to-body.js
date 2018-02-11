import { createFactory, Component } from 'react';
import { createPortal } from 'react-dom';
import T from 'prop-types';
import { withOffset, shouldOpen } from './index';


const DEFAULT_ROOT_STYLE = {
  position: 'absolute',
  zIndex: 1100,
  top: 0,
  left: 0,
};


/**
 * Overwrites element's style
 * @param node {HTMLElement|Node} HTML element to update styles
 * @param styles {Object}
 */
const updateRootStyle = (node, styles = {}) => {
  const updateStyles = { ...DEFAULT_ROOT_STYLE, ...styles };

  Object.keys(updateStyles).forEach((styleKey) => {
    // eslint-disable-next-line no-param-reassign
    node.style[styleKey] = updateStyles[styleKey];
  });
};


/**
 * @param shouldOpen {Function}
 * @param withOffset {Object}
 * @param style {Object}
 * @returns {HOC}
 */
const appendToBody = ({
  shouldOpen: shouldOpenFunction,
  withOffset: withOffsetObject,
  style,
}) => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  class AppendToBody extends Component {
    componentWillMount() {
      updateRootStyle(this.props.root, style);
    }

    componentWillUnmount() {
      window.document.body.removeChild(this.props.root);
    }

    render() {
      const { offset, root, ...props } = this.props;

      if (withOffsetObject) {
        updateRootStyle(root, offset);
      }

      const PortalComponent = factory(props);
      return createPortal(PortalComponent, root);
    }
  }


  AppendToBody.propTypes = {
    root: T.oneOfType([
      T.node,
      T.element,
    ]).isRequired,
    offset: T.object,
  };


  // In case if withOffset was passed - extends with "withOffset" HOC
  const AppendToBodyContainer = withOffsetObject ?
    withOffset(withOffsetObject)(AppendToBody) :
    AppendToBody;


  return shouldOpen(
    props => shouldOpenFunction(props),
    () => {
      const root = window.document.createElement('div');
      root.classList = 'append-to-body-root';

      window.document.body.appendChild(root);

      return { root };
    }
  )(AppendToBodyContainer);
};


export default appendToBody;
