import { createFactory, Component } from 'react';



const withToggle = (
  propName = 'show',
  toggleName = 'toggle',
  defaultValue = false
) => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  class WithToggle extends Component {
    state = {
      [propName]: defaultValue,
    };

    handleToggle = () => this.setState({ [propName]: !this.state[propName] });

    render() {
      return factory({
        ...this.props,
        ...this.state,
        [toggleName]: this.handleToggle,
      });
    }
  }


  return WithToggle;
};


export default withToggle;
