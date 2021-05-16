import React from "react";
import { Table } from "react-bootstrap";
import { withRouter } from "react-router";
import config from "../config.json";

function BusesTable({ buses, history }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Bus Name</th>
          <th>Count</th>
          <th>Highest Today</th>
          <th>Driver Name</th>
        </tr>
      </thead>
      <tbody>
        {buses &&
          buses.map((bus) => (
            <tr
              className={
                bus.count > config.overcrowded_threshold ||
                bus.highestCountToday > config.overcrowded_threshold
                  ? "table-danger"
                  : ""
              }
              key={bus.id}
              role="button"
              onClick={() => history.push(`/buses/${bus.id}`)}
            >
              <td>{bus.id}</td>
              <td>{bus.name}</td>
              <td>{bus.count}</td>
              <td>{bus.highestCountToday}</td>
              <td>{bus.driverName}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default withRouter(BusesTable);
