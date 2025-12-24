import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Paper, Typography, Button } from "@mui/material";
import Form from "../components/Form";
import UsersTable from "../components/Table";
import { addUserAsync, deleteUserAsync, updateUserAsync } from "../redux/slices/usersSlice";
import { logoutUserAsync } from "../redux/slices/authSlice";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersState.users);
  const currentUser = useSelector((state) => state.authState.currentUser);

  const handleLogout = () => dispatch(logoutUserAsync());

  return (
    <Box p={2}>
      <Paper elevation={2} className="user-header-paper">
        <Box display="flex" justifyContent="space-between" alignItems="center" className="user-header">
          <Typography variant="h6">
            Welcome, {currentUser.username} <span className="muted">({currentUser.role})</span>
          </Typography>
          <Button variant="outlined" className="cancel-btn" onClick={handleLogout}>Logout</Button>
        </Box>
      </Paper>

      {currentUser.role === "admin" && (
        <Box mt={2}>
          <Typography variant="h6">Add User</Typography>
          <Form handleSubmit={(user) => dispatch(addUserAsync(user))} inUser={{ firstName: "", lastName: "", email: "" }} />
        </Box>
      )}

      <Box mt={3}>
        <Typography variant="h6">Users</Typography>
        <UsersTable
          users={users}
          removeUser={currentUser.role === "admin" ? (id) => dispatch(deleteUserAsync(id)) : undefined}
          updateUser={currentUser.role === "admin" ? (user) => dispatch(updateUserAsync(user)) : undefined}
          isReadOnly={currentUser.role !== "admin"}
        />
      </Box>
    </Box>
  );
};

export default Users;