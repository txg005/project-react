import React, { useState, useEffect } from "react";

const Form = ({ handleSubmit, inUser }) => {
  const [user, setUser] = useState(inUser);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUser(inUser);
  }, [inUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!user.firstName.trim()) newErrors.firstName = "First name is required";
    if (!user.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    handleSubmit(user);
    setUser(inUser);
  };

  return (
    <form onSubmit={onSubmit} className="user-form">
      <div className="form-group">
        <input
          type="text"
          name="firstName"
          placeholder="FirstName"
          value={user.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="lastName"
          placeholder="LastName"
          value={user.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <button type="submit" className="add-btn">
        {user.id ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default Form;
