import Component from "./Component";
import { ElementWrapper, TextWrapper } from "./wrappers";

const ToyReact = {
  createElement(type, attributes, ...children) {
    let element;

    if (typeof type === "string") {
      element = new ElementWrapper(type);
    } else {
      element = new type();
    }

    for (let name in attributes) {
      element.setAttribute(name, attributes[name]);
    }

    let insertChildren = (children) => {
      for (let child of children) {
        if (typeof child === "object" && child instanceof Array) {
          insertChildren(child);
        } else {
          if (child == null) {
            child = "";
          }
          if (!(child instanceof Component) && !(child instanceof ElementWrapper) && !(child instanceof TextWrapper)) {
            child = String(child);
          }
          if (typeof child === "string") {
            child = new TextWrapper(child);
          }
          element.appendChild(child);
        }
      }
    };

    insertChildren(children);

    return element;
  },
  render(vdom, element) {
    let range = document.createRange();

    if (element.children) {
      range.setStartAfter(element.lastChild);
      range.setEndAfter(element.lastChild);
    } else {
      range.setStart(element, 0);
      range.setEnd(element, 0);
    }

    vdom.mountTo(range);
  },
  Component,
};

export { default as Component } from "./Component";
export default ToyReact;
