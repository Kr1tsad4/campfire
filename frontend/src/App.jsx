import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Homepage />} /> 
        <Route path="/auth" element={<AuthPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
