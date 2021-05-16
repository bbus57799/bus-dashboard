import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { getErrorMessage } from "../utils";

export class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    rememberMe: true,
    error: "",
    isLoading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { onLogin } = this.props;
    this.setState({ isLoading: true, error: "" });
    try {
      await onLogin(
        this.state.email,
        this.state.password,
        this.state.rememberMe
      );
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      this.setState({ error: errorMessage });
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={this.handleChange("email")}
            value={this.state.email}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange("password")}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            onChange={this.handleCheck("rememberMe")}
            checked={this.state.rememberMe}
            label="Remember Me"
          />
        </Form.Group>

        <p className="text-danger">{this.state.error}</p>
        <Button variant="primary" type="submit" disabled={this.state.isLoading}>
          Login
        </Button>
      </Form>
    );
  }

  handleChange =
    (fieldName) =>
    ({ target: { value } }) =>
      this.setState({ [fieldName]: value, error: "" });

  handleCheck =
    (fieldName) =>
    ({ target: { checked } }) =>
      this.setState({ [fieldName]: checked });
}

export default LoginForm;
