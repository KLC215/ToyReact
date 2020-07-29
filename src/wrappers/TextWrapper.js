export default class TextWrapper {
  constructor(type) {
    this.root = document.createTextNode(type);
    this.type = "#text";
    this.children = [];
    this.props = Object.create(null);
  }

  mountTo(range) {
    this.range = this.range;

    range.deleteContents();
    range.insertNode(this.root);
  }

  get vdom() {
    return this;
  }
}
