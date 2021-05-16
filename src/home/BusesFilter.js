import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";

export class BusesFilter extends Component {
  state = { key: "", value: "" };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSearch(this.state);
  };

  render() {
    return (
      <Card>
        <Card.Body>
          <Form
            onSubmit={this.onSubmit}
            inline
            className="align-items-baseline"
          >
            <Form.Label className="mx-2">Search By: </Form.Label>
            <Form.Control
              onChange={(e) => this.setState({ key: e.target.value })}
              value={this.state.key}
              as="select"
              className="my-1 mr-sm-2"
              custom
            >
              <option value="">Choose...</option>
              <option value="id">Bus ID</option>
              <option value="name">Bus Name</option>
              <option value="driver">Driver Name</option>
              <option value="overcrowded">Only Overcrowded</option>
            </Form.Control>
            <Form.Control
              onChange={(e) => this.setState({ value: e.target.value })}
              disabled={this.state.key === "overcrowded"}
              className="mb-2 mr-sm-2"
              placeholder="What to search"
            />
            <Button type="submit" className="mb-2 mx-1">
              Search
            </Button>
            <Button onClick={this.props.onReset} className="mb-2">
              Reset
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default BusesFilter;
