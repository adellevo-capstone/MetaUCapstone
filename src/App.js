import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
// import DietaryProfile from "./components/DietaryProfile/DietaryProfile";

// temp data
const data = ["almonds", "peanuts", "Thai", "ice cream", "berries", "pasta"];

function App() {
  return (
    <div className="App">
      <Dashboard data={data} />
    </div>
  );
}

export default App;
