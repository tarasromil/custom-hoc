import { createFactory, Component } from 'react';


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
      this.setState({ [propName]: !this.state[propName] }, callback);
    }

    show(callback) {
      this.setState({ [propName]: true }, callback);
    }

    hide(callback) {
      this.setState({ [propName]: false }, callback);
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
