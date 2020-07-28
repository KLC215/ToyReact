export default class Component {
  constructor() {
    this.children = [];
    this.props = Object.create(null);
  }
  setAttribute(name, value) {
    this.props[name] = value;
    this[name] = value;
  }

  mountTo(range) {
    this.range = range;
    this.update();
  }

  update() {
    // A little hack for real dom, will update it
    let placeholder = document.createComment("placeholder");
    let range = document.createRange();

    range.setStart(this.range.endContainer, this.range.endOffset);
    range.setEnd(this.range.endContainer, this.range.endOffset);
    range.insertNode(placeholder);

    this.range.deleteContents();

    let vdom = this.render();
    vdom.mountTo(this.range);

    // placeholder.parentNode.removeChild(placeholder);
  }

  appendChild(vchild) {
    this.children.push(vchild);
  }

  setState(state) {
    let merge = (oldState, newState) => {
      for (let prop in newState) {
        if (typeof newState[prop] === "object") {
          if (typeof oldState[prop] !== "object") {
            oldState[prop] = {};
          }
          merge(oldState[prop], newState[prop]);
        } else {
          oldState[prop] = newState[prop];
        }
      }
    };

    if (!this.state && state) {
      this.state = {};
    }

    merge(this.state, state);

    this.update();
  }
}
