import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../redux/slices/authSlice";

const defaultAccounts = [
  { username: "admin", password: "admin", role: "admin" },
  { username: "user", password: "user", role: "user" },
];

const Login = () => {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("accounts");
    if (stored) setAccounts(JSON.parse(stored));
    else {
      localStorage.setItem("accounts", JSON.stringify(defaultAccounts));
      setAccounts(defaultAccounts);
    }
  }, []);

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
      if (accounts.find((acc) => acc.username === form.username.trim())) {
        setError("User already exists");
        return;
      }
      const newUser = {
        username: form.username.trim(),
        password: form.password.trim(),
        role: "user",
      };
      const updatedAccounts = [...accounts, newUser];
      setAccounts(updatedAccounts);
      localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
      dispatch(loginUserAsync(newUser));
      navigate("/users");
    } else {
      const foundUser = accounts.find(
        (acc) =>
          acc.username === form.username.trim() &&
          acc.password === form.password.trim()
      );
      if (foundUser) {
        dispatch(loginUserAsync(foundUser));
        navigate("/users");
      } else {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={8} className="login-root">
      <Paper elevation={6} className="login-container mui-paper">
        <Typography variant="h5" mb={2} align="center">
          {isSignUp ? "Create your account" : "Log into your account"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="mui-input"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="mui-input"
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" className="add-btn">
            {isSignUp ? "Sign up" : "Sign in"}
          </Button>
        </Box>

        <Stack mt={2} alignItems="center">
          {isSignUp ? (
            <Typography variant="body2">
              Already have an account?{" "}
              <Link component="button" onClick={() => { setIsSignUp(false); setError(""); }}>
                Sign in
              </Link>
            </Typography>
          ) : (
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Link component="button" onClick={() => { setIsSignUp(true); setError(""); }}>
                Sign up
              </Link>
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;