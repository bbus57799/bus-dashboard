import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import qs from "query-string";
import { firestore } from "../firebase";
import BusesTable from "./BusesTable";
import BusesFilter from "./BusesFilter";
import BusModal from "../bus-page/BusModal";
import config from "../config.json";

export class HomePage extends Component {
  state = { key: "", value: "", showBusModal: false };
  searchUnsubscriber = null;

  componentDidMount() {
    this.fetchBuses();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location?.search !== prevProps.location?.search) {
      this.fetchBuses();
    }
  }

  fetchBuses = () => {
    const query = qs.parse(this.props.location.search);
    let firestoreQuery = firestore.collection("buses");
    if (query.key === "overcrowded") {
      firestoreQuery = firestoreQuery.where(
        "highestCountToday",
        ">=",
        config.overcrowded_threshold
      );
    } else if (query.key && query.value) {
      firestoreQuery = firestoreQuery
        .where(query.key, ">=", query.value)
        .where(query.key, "<=", query.value + "\uf8ff");
    }
    this.searchUnsubscriber = firestoreQuery.onSnapshot((snapshot) => {
      this.setState({
        buses: snapshot.docs.map((d) => ({ ...d.data(), id: d.id })),
      });
    });
  };

  componentWillUnmount() {
    if (this.searchUnsubscriber) this.searchUnsubscriber();
  }

  closeBusModal = () => {
    this.setState({ showBusModal: false });
  };

  openBusModal = () => {
    this.setState({ showBusModal: true });
  };

  render() {
    return (
      <Container className="my-2">
        <BusModal onClose={this.closeBusModal} show={this.state.showBusModal} />
        <BusesFilter
          onSearch={(s) =>
            this.props.history.push(`/?key=${s.key}&value=${s.value}`)
          }
          onReset={() => this.props.history.push(`/`)}
        />
        <div className="d-flex">
          <Button className="m-1" onClick={this.openBusModal}>
            + New Bus
          </Button>
        </div>
        <BusesTable buses={this.state.buses} />
      </Container>
    );
  }
}

export default withRouter(HomePage);
