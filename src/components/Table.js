import React, { useState, useRef, useEffect } from "react";

const TableHeader = () => (
  <thead>
    <tr>
      <th>Id</th>
      <th>FirstName</th>
      <th>LastName</th>
      <th>Email</th>
      <th>Action</th>
    </tr>
  </thead>
);

const TableBody = ({ users, removeUser, updateUser, isReadOnly }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [focusField, setFocusField] = useState(null);
  const [updatedIndex, setUpdatedIndex] = useState(null);
  const rowRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [focusField, editIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rowRef.current && !rowRef.current.contains(event.target)) {
        if (editIndex !== null) {
          handleUpdate();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const startEdit = (user, index, field = "firstName") => {
    if (isReadOnly) return;
    setEditIndex(index);
    setEditData(user);
    setFocusField(field);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const sanitizeEmail = (email) =>
    // eslint-disable-next-line
    email.normalize("NFKC").replace(/[^\u0000-\u007F]/g, "");

  const handleUpdate = () => {
    if (!updateUser) return;
    if (!editData.email) return;

    const cleaned = { ...editData, email: sanitizeEmail(editData.email) };
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(cleaned.email)) {
      alert("Введите корректный Email (например: user@gmail.com)");
      return;
    }

    updateUser(cleaned);
    setEditIndex(null);
    setUpdatedIndex(editIndex);
    setTimeout(() => setUpdatedIndex(null), 2000);
  };

  const handleCancel = () => setEditIndex(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdate();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <tbody>
      {users.length > 0 ? (
        users.map((user, index) => (
          <tr
            key={user.id || index}
            ref={editIndex === index ? rowRef : null}
            onDoubleClick={() => startEdit(user, index)}
            className={editIndex === index ? "editing-row" : ""}
          >
            <td>{user.id}</td>
            {["firstName", "lastName", "email"].map((field) => (
              <td
                key={field}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  startEdit(user, index, field);
                }}
              >
                {editIndex === index ? (
                  <input
                    ref={focusField === field ? inputRef : null}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={editData[field] || ""}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  user[field]
                )}
              </td>
            ))}
            <td>
              {editIndex === index && !isReadOnly ? (
                <>
                  <button className="update-btn" onClick={handleUpdate}>
                    Update
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              ) : !isReadOnly ? (
                <>
                  <button className="delete-btn" onClick={() => removeUser(user.id)}>
                    Delete
                  </button>
                  {updatedIndex === index && (
                    <span className="updated-msg">✓ Updated</span>
                  )}
                </>
              ) : (
                <span style={{ color: "#999" }}>View only</span>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" style={{ textAlign: "center" }}>
            Нет пользователей
          </td>
        </tr>
      )}
    </tbody>
  );
};

const Table = ({ users, removeUser, updateUser, isReadOnly }) => (
  <table className="user-table">
    <TableHeader />
    <TableBody
      users={users}
      removeUser={removeUser}
      updateUser={updateUser}
      isReadOnly={isReadOnly}
    />
  </table>
);

export default Table;
