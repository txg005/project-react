import React from 'react';

const TableHeader = () => {
  return (
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
};

const TableBody = ({ users, removeUser }) => {
  return (
    <tbody>
      {users.length > 0 ? (
        users.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>
              <button className="delete-btn" onClick={() => removeUser(index)}>
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" style={{ textAlign: 'center' }}>
            Нет пользователей
          </td>
        </tr>
      )}
    </tbody>
  );
};

const Table = ({ users, removeUser }) => {
  return (
    <table>
      <TableHeader />
      <TableBody users={users} removeUser={removeUser} />
    </table>
  );
};

export default Table;