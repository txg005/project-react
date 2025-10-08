import React, { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Form from "./components/Form";
import UserAPI from "./api/service";

function App() {
  const [users, setUsers] = useState(UserAPI.all());

  const addUser = (user) => {
    const newUser = UserAPI.add(user);
    setUsers([...users, newUser]);
  };

  const removeUser = (index) => {
    const user = users[index];
    UserAPI.delete(user.id);
    setUsers(users.filter((_, i) => i !== index));
  };

  const updateUser = (user) => {
    UserAPI.update(user);
    setUsers([...UserAPI.all()]);
  };

  return (
    <div className="App">
      <h2>Add User</h2>
      <Form
        handleSubmit={addUser}
        inUser={{ firstName: "", lastName: "", email: "" }}
      />

      <h2>Users</h2>
      <Table users={users} removeUser={removeUser} updateUser={updateUser} />
    </div>
  );
}

export default App;
