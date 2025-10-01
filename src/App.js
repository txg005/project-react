import React, { useState } from 'react';
import './App.css';
import Table from './Table';
import UserAPI from './api/service';

function App() {
  const [users, setUsers] = useState(UserAPI.all()); // загружаем "из API"
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); // сброс ошибки при вводе
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newUser = UserAPI.add(formData);
    setUsers([...users, newUser]);

    setFormData({ firstName: '', lastName: '', email: '' });
  };

  const removeUser = (index) => {
    const user = users[index];
    UserAPI.delete(user.id);
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="FirstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="lastName"
            placeholder="LastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <button type="submit" className="add-btn">Add User</button>
      </form>

      <h2>Users</h2>
      <Table users={users} removeUser={removeUser} />
    </div>
  );
}

export default App;