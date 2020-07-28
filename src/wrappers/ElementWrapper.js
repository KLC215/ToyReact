export default class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }

  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      let eventName = RegExp.$1.replace(/^[\s\S]/, (str) => str.toLowerCase());
      this.root.addEventListener(eventName, value);
    }
    if (name === "className") {
      name = "class";
    }
    this.root.setAttribute(name, value);
  }

  appendChild(vchild) {
    let range = document.createRange();

    if (this.root.children.length) {
      range.setStartAfter(this.root.lastChild);
      range.setEndAfter(this.root.lastChild);
    } else {
      range.setStart(this.root, 0);
      range.setEnd(this.root, 0);
    }

    vchild.mountTo(range);
  }
  mountTo(range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}
