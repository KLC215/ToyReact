// class MyComponent extends Component {
//   render() {
//     return (
//       <div>
//         <span>Hello </span>
//         <span>World!</span>
//         <div>
//           {true}
//           {this.children}
//         </div>
//       </div>
//     );
//   }
// }
import ToyReact from "./ToyReact";
import { Board } from "./tic-tac-toe";

ToyReact.render(<Board />, document.body);
