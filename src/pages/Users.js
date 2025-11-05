import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "../components/Form";
import Table from "../components/Table";
import { addUser, deleteUser, updateUser } from "../redux/actions/userActions";
import { logoutUser } from "../redux/actions/authActions";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersState.users);
  const currentUser = useSelector((state) => state.authState.currentUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <div className="user-header">
        <h2>
          Welcome, {currentUser.username}{" "}
          <span style={{ color: "#888" }}>({currentUser.role})</span>
        </h2>
        <button onClick={handleLogout} className="cancel-btn">
          Logout
        </button>
      </div>

      {currentUser.role === "admin" && (
        <>
          <h2>Add User</h2>
          <Form
            handleSubmit={(user) => dispatch(addUser(user))}
            inUser={{ firstName: "", lastName: "", email: "" }}
          />
        </>
      )}

      <h2>Users</h2>
      <Table
        users={users}
        removeUser={
          currentUser.role === "admin"
            ? (id) => dispatch(deleteUser(id))
            : undefined
        }
        updateUser={
          currentUser.role === "admin"
            ? (user) => dispatch(updateUser(user))
            : undefined
        }
        isReadOnly={currentUser.role !== "admin"}
      />
    </div>
  );
};

export default Users;
