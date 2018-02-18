import React, { Component, createFactory } from 'react';


const DEFAULT_OFFSET = {
  top: 0,
  left: 0,
};


const STYLE = {
  overflow: 'auto',
  position: 'absolute',
  display: 'inline-block',
};


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
 * @param anchorBounds {Object} DOMRect object if source Element
 * @param rootBounds {Object} DOMRect object if root Element
 * @returns {Number} Left position
 */
const calculateLeft = (anchorBounds, rootBounds) => {
  let left = determinePosition(anchorBounds.left);

  const rightPosition = rootBounds.width + left;

  if (rightPosition > window.innerWidth) {
    const difference = rightPosition - window.innerWidth;
    left -= difference;
    left = determinePosition(left);
  }

  return left;
};


/**
 * @param value {Number} Position value
 * @returns {String} Value in pixels
 */
const toPx = value => `${Math.round(value)}px`;


/**
 * @param top {Number}
 * @param left {Number}
 * @returns {{top: String, left: String}}
 */
const positionToPx = ({ top, left }) => ({ top: toPx(top), left: toPx(left) });


/**
 * @param anchorBounds {Object}
 * @param rootBounds  {Object}
 * @returns {{top: Number, left: Number}}
 */
const getPosition = (anchorBounds, rootBounds) => ({
  top: calculateTop(anchorBounds, rootBounds),
  left: calculateLeft(anchorBounds, rootBounds),
});


/**
 * Returns Node by selector
 * @param selectorOrNode {Element|String}
 * @returns {Node}
 */
const getElement = selectorOrNode => (typeof selectorOrNode === 'string' ?
  window.document.querySelector(selectorOrNode) :
  selectorOrNode);


/**
 * @param anchor {String} Element for calculate
 * @param rootElement {HTMLElement|Node} Element which calculate
 * @returns {Object} position object
 */
const calculateOffset = (anchor, rootElement) => {
  const anchorElement = getElement(anchor);

  if (anchorElement && rootElement) {
    const anchorBounds = anchorElement.getBoundingClientRect();
    const rootBounds = rootElement.getBoundingClientRect();

    return getPosition(anchorBounds, rootBounds);
  }

  return DEFAULT_OFFSET;
};


/**
 * @param getAnchor {Function}
 * @param transition {Number}
 * @returns {HoC}
 */
const withOffset = (getAnchor = () => null, transition = 0) => (BaseComponent) => {
  const withOffsetFactory = createFactory(BaseComponent);

  class WithOffset extends Component {
    constructor(props) {
      super(props);

      this.state = DEFAULT_OFFSET;


      this.calculateOffsetHandler = () => {
        const offset = calculateOffset(getAnchor(props), this.node);
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
      const styleToSet = (transition > 0) ? {
        ...STYLE,
        transition: `top ${transition}ms, left ${transition}ms`,
      } : STYLE;

      return (
        <div
          className="withOffsetNode"
          ref={(node) => { this.node = node; }}
          style={{
            ...styleToSet,
            ...positionToPx(this.state),
          }}
        >
          {withOffsetFactory({
            ...this.props,
            offset: this.state,
          })}
        </div>
      );
    }
  }

  return WithOffset;
};


export default withOffset;
