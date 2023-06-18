import { NumberAndScroll, fetchRandomNumber } from "./NumberAndScroll";
import "./App.css";

function App() {
  return (
    <div className="App" >
      <NumberAndScroll asyncFunction={fetchRandomNumber} />
    </div>
  );
}

export default App;
