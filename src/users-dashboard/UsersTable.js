import React from "react";
import { Table } from "react-bootstrap";

function UsersTable({ users, onSelected }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, index) => (
            <tr key={user.id} role="button" onClick={() => onSelected(user)}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default UsersTable;
