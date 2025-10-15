import React, { useState } from "react";
import Form from "../components/Form";
import Table from "../components/Table";
import UserAPI from "../api/service";

const Users = ({ currentUser, onLogout }) => {
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
    <div>
      <div className="user-header">
        <h2>
          Welcome, {currentUser.username}{" "}
          <span style={{ color: "#888" }}>({currentUser.role})</span>
        </h2>
        <button onClick={onLogout} className="cancel-btn">
          Logout
        </button>
      </div>

      {/* Только админ может добавлять */}
      {currentUser.role === "admin" && (
        <>
          <h2>Add User</h2>
          <Form
            handleSubmit={addUser}
            inUser={{ firstName: "", lastName: "", email: "" }}
          />
        </>
      )}

      <h2>Users</h2>
      <Table
        users={users}
        removeUser={
          currentUser.role === "admin" ? removeUser : undefined
        }
        updateUser={
          currentUser.role === "admin" ? updateUser : undefined
        }
        isReadOnly={currentUser.role !== "admin"}
      />
    </div>
  );
};

export default Users;
