export default class TextWrapper {
  constructor(type) {
    this.root = document.createTextNode(type);
  }

  mountTo(range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}
