import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// тестовые аккаунты
const initialAccounts = [
  { username: "admin", password: "admin", role: "admin" },
  { username: "user", password: "user", role: "user" },
];

const Login = ({ onLogin }) => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      setError("All fields are required");
      return;
    }

    if (isSignUp) {
      // Проверяем, существует ли уже такой пользователь
      if (accounts.find((acc) => acc.username === form.username.trim())) {
        setError("User already exists");
        return;
      }

      const newUser = {
        username: form.username.trim(),
        password: form.password.trim(),
        role: "user",
      };

      setAccounts([...accounts, newUser]);
      onLogin(newUser);
      navigate("/users");
    } else {
      // Вход
      const foundUser = accounts.find(
        (acc) =>
          acc.username === form.username.trim() &&
          acc.password === form.password.trim()
      );

      if (foundUser) {
        onLogin(foundUser);
        navigate("/users");
      } else {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="add-btn">
          {isSignUp ? "Sign up" : "Sign in"}
        </button>
      </form>

      {/* Переключатель между Sign In / Sign Up */}
      <p className="switch-mode">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <span
              className="link"
              onClick={() => {
                setIsSignUp(false);
                setError("");
              }}
            >
              Sign in
            </span>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <span
              className="link"
              onClick={() => {
                setIsSignUp(true);
                setError("");
              }}
            >
              Sign up
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default Login;
