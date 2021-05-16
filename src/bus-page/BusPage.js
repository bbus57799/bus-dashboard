import React, { Component } from "react";
import { Container, Card, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { firestore } from "../firebase";
import BusForm from "./BusForm";
import ReadingsTable from "./ReadingsTable";

const getIsoDateString = (date) => {
  const year = `${date.getFullYear()}`.padStart(4, "0");
  const month = `${date.getMonth()}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getIsoDate = (isoString) => {
  const parts = isoString.split("-");
  return new Date(+parts[0], +parts[1], +parts[2]);
};

class BusPage extends Component {
  state = {
    date: new Date(new Date().toDateString()),
    bus: null,
    readings: null,
  };
  searchUnsubscriber = null;
  docUnsubscriber = null;

  componentDidMount() {
    this.fetchReadings();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match?.params !== prevProps.match?.params) {
      this.fetchReadings();
    }
  }

  fetchReadings = () => {
    const busId = this.props.match.params.busId;
    const nextDay = new Date(this.state.date);
    nextDay.setDate(nextDay.getDate() + 1);

    let firestoreQuery = firestore
      .collection("buses")
      .doc(`${busId}`)
      .collection("readings")
      .where("createdAt", ">=", this.state.date)
      .where("createdAt", "<", nextDay);

    this.searchUnsubscriber = firestoreQuery.onSnapshot((snapshot) => {
      this.setState({
        readings: snapshot.docs.map((d) => ({ ...d.data(), id: d.id })),
      });
    });

    this.docUnsubscriber = firestore
      .collection("buses")
      .doc(`${busId}`)
      .onSnapshot((d) => {
        this.setState({ bus: { ...d.data(), id: d.id } });
      });
  };

  componentWillUnmount() {
    if (this.searchUnsubscriber) this.searchUnsubscriber();
    if (this.docUnsubscriber) this.docUnsubscriber();
  }

  onUpdateBus = async (busInfo) => {
    await firestore.collection("buses").doc(busInfo.id).update({
      name: busInfo.name,
      driverName: busInfo.driverName,
    });
  };

  render() {
    return (
      <Container className="my-2">
        <Card className="p-2 m-2">
          <Form.Group>
            <Form.Label className="mx-1">Redings During:</Form.Label>
            <input
              value={getIsoDateString(this.state.date)}
              onChange={(e) => {
                this.setState(
                  { date: getIsoDate(e.target.value) },
                  this.fetchReadings
                );
              }}
              type="date"
            />
          </Form.Group>
        </Card>
        <Card className="p-2 m-2">
          {this.state.bus && (
            <BusForm
              onSubmit={this.onUpdateBus}
              onClose={this.props.history.goBack}
              readOnlyId
              busInfo={{ ...this.state.bus }}
            />
          )}
        </Card>
        <Card className="p-2 m-2">
          <h3 className="text-center">
            Current Count: {this.state.bus?.count}
          </h3>
        </Card>
        <ReadingsTable readings={this.state.readings} />
      </Container>
    );
  }
}

export default withRouter(BusPage);
