import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { getErrorMessage } from "../utils";

export class AddUserForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "normal",
    isLoading: false,
    error: "",
  };

  componentWillMount() {
    if (this.props.initialData) {
      this.setState({
        name: this.props.initialData.name,
        email: this.props.initialData.email,
        phone: this.props.initialData.phone,
        role: this.props.initialData.role,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { onSubmit } = this.props;
    this.setState({ isLoading: true, error: "" });
    try {
      await onSubmit(this.state);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ error: errorMessage });
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="User Name"
            value={this.state.name}
            onChange={this.handleChange("name")}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={this.handleChange("email")}
            value={this.state.email}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            placeholder="Enter phone"
            onChange={this.handleChange("phone")}
            value={this.state.phone}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange("password")}
            required={!this.props.initialData}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control
            onChange={this.handleChange("role")}
            value={this.state.role}
            as="select"
          >
            <option value="normal">Normal User</option>
            <option value="admin">Admin</option>
          </Form.Control>
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

export default AddUserForm;
