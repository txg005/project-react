import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Stack, CircularProgress } from "@mui/material";

const Form = ({ handleSubmit, inUser }) => {
  const [user, setUser] = useState(inUser);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => setUser(inUser), [inUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!user.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!user.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!user.email?.trim()) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email))
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      handleSubmit(user);
      setLoading(false);
      setUser(inUser);
    }, 500);
  };

  return (
    <Box component="form" onSubmit={onSubmit} className="user-form mui-form">
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
        <TextField
          label="FirstName"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          variant="outlined"
          className="mui-input"
        />
        <TextField
          label="LastName"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          variant="outlined"
          className="mui-input"
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          variant="outlined"
          className="mui-input"
        />
        <Button type="submit" variant="contained" className="add-btn">
          {user.id ? "Update User" : "Add User"}
        </Button>

        {loading && <CircularProgress size={23} className="spinner" />}
      </Stack>

      <div style={{ marginTop: 6 }}>
        {errors.firstName && <div className="error">{errors.firstName}</div>}
        {errors.lastName && <div className="error">{errors.lastName}</div>}
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
    </Box>
  );
};

export default Form;