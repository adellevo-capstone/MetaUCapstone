import logo from "./logo.svg";
import ProfileBar from "./components/ProfileBar/ProfileBar";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";

const data = ["almonds", "peanuts", "Thai", "ice cream", "berries", "pasta"];

function App() {
  return (
    <div className="App">
      <Dashboard data={data} />
    </div>
  );
}

export default App;
