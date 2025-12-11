import React, { useState, useRef, useEffect } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UsersTable = ({ users, removeUser, updateUser, isReadOnly }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [editIndex]);

  const startEdit = (user, index) => {
    if (isReadOnly) return;
    setEditIndex(index);
    setEditData(user);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditData({});
  };

  const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  const saveEdit = () => {
    if (!editData.email) return;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(editData.email)) {
      alert("Введите корректный Email (например: user@gmail.com)");
      return;
    }
    setLoadingId(editData.id);
    setTimeout(() => {
      updateUser(editData);
      setLoadingId(null);
      setEditIndex(null);
      setEditData({});
    }, 500);
  };

  const handleDelete = (id) => {
    setLoadingId(id);
    setTimeout(() => {
      removeUser(id);
      setLoadingId(null);
    }, 500);
  };

  return (
    <TableContainer component={Paper} className="table-paper">
      <MuiTable className="user-table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography align="center">Нет пользователей</Typography>
              </TableCell>
            </TableRow>
          )}
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              onDoubleClick={() => startEdit(user, index)}
              className={editIndex === index ? "editing-row" : ""}
            >
              <TableCell>{user.id}</TableCell>

              <TableCell>
                {editIndex === index ? (
                  <TextField
                    name="firstName"
                    value={editData.firstName || ""}
                    onChange={handleChange}
                    inputRef={inputRef}
                    onKeyDown={handleKeyDown}
                    variant="outlined"
                    size="small"
                    className="mui-input"
                  />
                ) : (
                  user.firstName
                )}
              </TableCell>

              <TableCell>
                {editIndex === index ? (
                  <TextField
                    name="lastName"
                    value={editData.lastName || ""}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    variant="outlined"
                    size="small"
                    className="mui-input"
                  />
                ) : (
                  user.lastName
                )}
              </TableCell>

              <TableCell>
                {editIndex === index ? (
                  <TextField
                    name="email"
                    value={editData.email || ""}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    variant="outlined"
                    size="small"
                    className="mui-input"
                  />
                ) : (
                  user.email
                )}
              </TableCell>

              <TableCell>
                {editIndex === index && !isReadOnly ? (
                  <>
                    <button className="update-btn" onClick={saveEdit}>Update</button>
                    <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                    {loadingId === user.id && <CircularProgress size={22} className="spinner" />}
                  </>
                ) : !isReadOnly ? (
                  <>
                    <IconButton
                      onClick={() => handleDelete(user.id)}
                      size="small"
                      aria-label="delete"
                      className="mui-delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                    {loadingId === user.id && <CircularProgress size={22} className="spinner" />}
                  </>
                ) : (
                  <Typography variant="body2" color="textSecondary">View only</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default UsersTable;