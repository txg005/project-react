import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Users from "./pages/Users";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { CustomThemeProvider } from "./theme/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher";

function AppWrapper() {
  const currentUser = useSelector((state) => state.authState.currentUser);

  return (
    <Router>
      <div className="App">
        <ThemeSwitcher />
        <Routes>
          <Route
            path="/login"
            element={
              currentUser ? <Navigate to="/users" replace /> : <Login />
            }
          />
          <Route
            path="/users"
            element={
              currentUser ? <Users /> : <Navigate to="/login" replace />
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <AppWrapper />
      </CustomThemeProvider>
    </Provider>
  );
}
