let childrenSymbol = Symbol("children");

export default class ElementWrapper {
  constructor(type) {
    this.type = type;
    this.props = Object.create(null);
    this[childrenSymbol] = [];
    this.children = [];
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(vchild) {
    this[childrenSymbol].push(vchild);
    this.children.push(vchild.vdom);
  }

  get vdom() {
    return this;
  }

  mountTo(range) {
    this.range = range;

    let placeholder = document.createComment("placeholder");
    let endRange = document.createRange();

    endRange.setStart(range.endContainer, range.startOffset);
    endRange.setEnd(range.endContainer, range.endOffset);
    endRange.insertNode(placeholder);

    range.deleteContents();

    let element = document.createElement(this.type);

    // setAttribute
    for (let name in this.props) {
      let value = this.props[name];

      if (name.match(/^on([\s\S]+)$/)) {
        let eventName = RegExp.$1.replace(/^[\s\S]/, (str) => str.toLowerCase());
        element.addEventListener(eventName, value);
      }
      if (name === "className") {
        element.setAttribute("class", value);
      }

      element.setAttribute(name, value);
    }

    // appencChild
    for (let child of this.children) {
      let range = document.createRange();

      if (element.children.length) {
        range.setStartAfter(element.lastChild);
        range.setEndAfter(element.lastChild);
      } else {
        range.setStart(element, 0);
        range.setEnd(element, 0);
      }

      child.mountTo(range);
    }

    range.insertNode(element);
  }
}
