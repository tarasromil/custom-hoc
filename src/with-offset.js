/* eslint-disable no-undef */
import { Component, createFactory } from 'react';
import T from 'prop-types';


const DEFAULT_OFFSET = {
  top: 0,
  left: 0,
  overflow: 'auto',
};


/**
 * @param value {Number} Position value
 * @returns {String} Value in pixels
 */
const toPX = value => `${Math.round(value)}px`;


/**
 * @param position {Number} Offset position of element
 * @returns {Number} Returns position not less than "0"
 */
const determinePosition = position => (position < 0 ? 0 : position);


/**
 * @param sourceBounds {Object} DOMRect object if source Element
 * @param rootBounds {Object} DOMRect object if root Element
 * @returns {Number} Top position
 */
const calculateTop = (sourceBounds, rootBounds) => {
  let { top } = sourceBounds;

  const underSourceTop = top + sourceBounds.height;

  if ((underSourceTop + rootBounds.height) < window.innerHeight) {
    top = underSourceTop;
  } else {
    top -= rootBounds.height;
  }

  return determinePosition(top);
};


/**
 * @param sourceBounds {Object} DOMRect object if source Element
 * @param rootBounds {Object} DOMRect object if root Element
 * @returns {Number} Left position
 */
const calculateLeft = (sourceBounds, rootBounds) => {
  let left = determinePosition(sourceBounds.left);

  const rightPosition = rootBounds.width + left;

  if (rightPosition > window.innerWidth) {
    const difference = rightPosition - window.innerWidth;
    left = determinePosition(left - difference);
  }

  return left;
};


/**
 * @param source {String} Element for calculate
 * @param rootElement {HTMLElement|Node} Element which calculate
 * @returns {Object} position object
 */
const calculateOffset = (source, rootElement) => {
  const sourceElement = document.querySelector(source);

  if (sourceElement) {
    const sourceBounds = sourceElement.getBoundingClientRect();
    const rootBounds = rootElement.getBoundingClientRect();

    const top = calculateTop(sourceBounds, rootBounds);
    const left = calculateLeft(sourceBounds, rootBounds);

    return {
      top: toPX(top),
      left: toPX(left),
    };
  }

  return DEFAULT_OFFSET;
};


/**
 * This HOC calculate position for children component
 * @param selector {String} Source querySelector
 * @param transition {Number} Time of animation
 * @returns {HOC} Height-Order Component
 */
const withOffset = ({ selector, transition = 0 }) => (BaseComponent) => {
  const calculateOffsetFactory = createFactory(BaseComponent);

  class WithOffset extends Component {
    constructor(props) {
      super(props);

      let initState = DEFAULT_OFFSET;
      if (transition > 0) {
        initState = {
          ...initState,
          transition: `top ${transition}ms, left ${transition}ms`,
        };
      }


      this.state = initState;


      this.calculateOffsetHandler = () => {
        const offset = calculateOffset(selector, props.root);
        this.setState(offset);
      };

      window.addEventListener('resize', this.calculateOffsetHandler);
    }

    componentDidMount() {
      this.calculateOffsetHandler();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.calculateOffsetHandler);
    }

    render() {
      return calculateOffsetFactory({
        ...this.props,
        offset: this.state,
      });
    }
  }


  WithOffset.propTypes = {
    root: T.oneOfType([
      T.node,
      T.element,
    ]).isRequired,
  };

  return WithOffset;
};


export default withOffset;
