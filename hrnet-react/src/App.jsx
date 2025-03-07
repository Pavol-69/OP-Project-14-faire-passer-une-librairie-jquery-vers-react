import HomePage from "./pages/HomePage";
import EmployeeListPage from "./pages/EmployeeListPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/employees-list" element={<EmployeeListPage />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </Provider>
  );
}

export default App;
