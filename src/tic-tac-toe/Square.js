import ToyReact, { Component } from '../ToyReact';

export default class Square extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    }
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: 'X'})}>
        {this.state.value ? this.state.value : ''}
      </button>
    )
  }
}