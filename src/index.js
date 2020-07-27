import ToyReact, { Component } from "./ToyReact";

class MyComponent extends Component {
  render() {
    return (
      <div>
        <span>Hello </span>
        <span>World!</span>
        <div>
          {true}
          {this.children}
        </div>
      </div>
    );
  }
}

ToyReact.render(
  <MyComponent name="a" id="ida">
    <div>123</div>
  </MyComponent>,
  document.body
);
