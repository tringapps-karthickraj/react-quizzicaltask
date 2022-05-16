
import './App.css';
import Quizzical from './components/quizzical';
import Startquiz from './components/startquiz';
import {
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="" element={<Startquiz />} />
        <Route path="/quiz" element={<Quizzical />} />
      </Routes>
    </div>
  );
}

export default App;
