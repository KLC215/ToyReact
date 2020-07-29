export default class Component {
  constructor() {
    this.children = [];
    this.props = Object.create(null);
  }

  get type() {
    return this.constructor.name;
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
    let vdom = this.vdom;

    if (this.oldVdom) {
      console.log("new: ", vdom);
      console.log("old: ", this.vdom);

      let isSameNode = (node1, node2) => {
        if (node1.type !== node2.type) {
          return false;
        }
        for (let name in node1.props) {
          if (
            typeof node1.props[name] === "object" &&
            typeof node2.props[name] === "object" &&
            JSON.stringify(node1.props[name]) === JSON.stringify(node2.props[name])
          ) {
            continue;
          }

          if (node1.props[name] !== node2.props[name]) {
            return false;
          }
        }
        if (Object.keys(node1.props).length !== Object.keys(node2.props).length) {
          return false;
        }

        return true;
      };

      let isSameTree = (node1, node2) => {
        if (!isSameNode(node1, node2)) {
          return false;
        }
        if (node1.children.length !== node2.children.length) {
          return false;
        }
        for (let i = 0; i < node1.children.length; i++) {
          if (!isSameTree(node1.children[i], node2.children[i])) {
            return false;
          }
        }

        return true;
      };

      let replace = (newTree, oldTree) => {
        if (isSameTree(newTree, oldTree)) {
          return;
        }
        if (!isSameNode(newTree, oldTree)) {
          newTree.mountTo(oldTree.range);
        } else {
          for (let i = 0; i < newTree.children.length; i++) {
            replace(newTree.children[i], oldTree.children[i]);
          }
        }
      };

      replace(vdom, this.oldVdom);
    } else {
      vdom.mountTo(this.range);
    }

    this.oldVdom = vdom;
  }

  get vdom() {
    return this.render().vdom;
  }

  appendChild(vchild) {
    this.children.push(vchild);
  }

  setState(state) {
    let merge = (oldState, newState) => {
      for (let prop in newState) {
        if (typeof newState[prop] === "object" && newState[prop] !== null) {
          if (typeof oldState[prop] !== "object") {
            if (newState[prop] instanceof Array) {
              oldState[prop] = [];
            } else {
              oldState[prop] = {};
            }
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
