import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhaserGame from './pages/PhaserGame'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/phaserGame" element={<PhaserGame />} />
      </Routes>
    </Router>
  );
}

export default App;
