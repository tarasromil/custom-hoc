import { createFactory, Component } from 'react';


const determineCallback = callback => (typeof callback === 'function' ? callback : null);


const withToggle = (
  propName = 'isOpened',
  toggleName = 'toggle',
  defaultValue = false
) => (BaseComponent) => {
  const factory = createFactory(BaseComponent);


  class WithToggle extends Component {
    constructor(...args) {
      super(...args);

      this.state = { [propName]: defaultValue };

      this[toggleName] = this[toggleName].bind(this);
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
    }

    [toggleName](callback) {
      const afterCallback = determineCallback(callback);
      this.setState({ [propName]: !this.state[propName] }, afterCallback);
    }

    show(callback) {
      const afterCallback = determineCallback(callback);
      this.setState({ [propName]: true }, afterCallback);
    }

    hide(callback) {
      const afterCallback = determineCallback(callback);
      this.setState({ [propName]: false }, afterCallback);
    }

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
