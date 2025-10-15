import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Users from "./pages/Users";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Страница входа */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Страница пользователей */}
          <Route
            path="/users"
            element={
              currentUser ? (
                <Users currentUser={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Перенаправление по умолчанию */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
