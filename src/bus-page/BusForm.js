import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { getErrorMessage } from "../utils";

export class BusForm extends Component {
  state = {
    id: "",
    name: "",
    driverName: "",
    isLoading: false,
    error: "",
  };

  componentDidMount() {
    this.setState({ ...this.props.busInfo });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { onSubmit } = this.props;
    this.setState({ isLoading: true, error: "" });
    try {
      await onSubmit(this.state);
    } catch (error) {
      const errorMessage = getErrorMessage(e);
      this.setState({ error: errorMessage });
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Bus ID"
            value={this.state.id}
            disabled={this.props.readOnlyId}
            onChange={this.handleChange("id")}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Bus Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bus name"
            onChange={this.handleChange("name")}
            value={this.state.name}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Driver Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter driver name"
            onChange={this.handleChange("driverName")}
            value={this.state.driverName}
          />
        </Form.Group>

        <p className="text-danger">{this.state.error}</p>
        <Button variant="primary" type="submit" disabled={this.state.isLoading}>
          Save
        </Button>
        <Button
          onClick={this.props.onClose}
          className="mx-1"
          variant="secondary"
        >
          Close
        </Button>
      </Form>
    );
  }

  handleChange =
    (fieldName) =>
    ({ target: { value } }) =>
      this.setState({ [fieldName]: value, error: "" });
}

export default BusForm;
