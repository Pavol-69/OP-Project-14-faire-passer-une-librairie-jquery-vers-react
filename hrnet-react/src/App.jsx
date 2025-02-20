import HomePage from "./pages/HomePage";
import EmployeeListPage from "./pages/EmployeeListPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/employee-list" element={<EmployeeListPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
