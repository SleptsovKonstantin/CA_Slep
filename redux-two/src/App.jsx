import Income from "./components/Income";
import Expenses from "./components/Expenses";
import List from "./components/List";

const App = () => {
  return (
    <div className="App" style={{ "text-align": "center" }}>
      <Income />
      <Expenses />
      <List />
    </div>
  );
};

export default App;
