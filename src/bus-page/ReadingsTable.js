import React from "react";
import { Table } from "react-bootstrap";

function ReadingsTable({ readings }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {readings &&
          readings.map((reading, index) => (
            <tr key={reading.id} role="button">
              <td>{index + 1}</td>
              <td>{reading.createdAt.toDate().toLocaleString()}</td>
              <td>{reading.count}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default ReadingsTable;
