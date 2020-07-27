export default class Component {
  constructor() {
    this.children = [];
  }
  setAttribute(name, value) {
    this[name] = value;
  }

  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent);
  }

  appendChild(vchild) {
    this.children.push(vchild);
  }
}
