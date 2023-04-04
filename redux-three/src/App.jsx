import Income from "./components/Income";
import Expenses from "./components/Expenses";
import List from "./components/List";

const App = () => {



  return (
    <div className="App" style={{ textAlign: "center" }}>
      <Income />
      <Expenses />
      <List />
    </div>
  );
};

export default App;
