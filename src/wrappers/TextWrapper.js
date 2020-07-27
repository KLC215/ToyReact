export default class TextWrapper {
  constructor(type) {
    this.root = document.createTextNode(type);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}
