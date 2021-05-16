import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import UsersFilter from "./UsersFilter";
import UsersTable from "./UsersTable";
import qs from "query-string";
import { firestore } from "../firebase";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";

export class UsersDashboard extends Component {
  state = { key: "", value: "", showAddUser: false, selectedUser: null };
  searchUnsubscriber = null;

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location?.search !== prevProps.location?.search) {
      this.fetchUsers();
    }
  }

  fetchUsers = () => {
    const query = qs.parse(this.props.location.search);
    let firestoreQuery = firestore.collection("users");
    if (query.key && query.value) {
      firestoreQuery = firestoreQuery
        .where(query.key, ">=", query.value)
        .where(query.key, "<=", query.value + "\uf8ff")
        .orderBy(query.key);
    }
    firestoreQuery = firestoreQuery.orderBy("created_at", "desc");
    this.searchUnsubscriber = firestoreQuery.onSnapshot((snapshot) => {
      this.setState({
        users: snapshot.docs.map((d) => ({ ...d.data(), id: d.id })),
      });
    });
  };

  componentWillUnmount() {
    if (this.searchUnsubscriber) this.searchUnsubscriber();
  }

  onUserClicked = (userInfo) => {
    this.setState({ selectedUser: userInfo });
  };

  render() {
    return (
      <Container className="my-2">
        <AddUserModal
          show={this.state.showAddUser}
          onClose={() => this.setState({ showAddUser: false })}
        />
        {this.state.selectedUser && (
          <UpdateUserModal
            userInfo={this.state.selectedUser}
            show
            onClose={() => this.setState({ selectedUser: null })}
          />
        )}
        <UsersFilter
          onSearch={(s) =>
            this.props.history.push(`/users?key=${s.key}&value=${s.value}`)
          }
        />
        <div className="d-flex">
          <Button
            className="m-1"
            onClick={() => this.setState({ showAddUser: true })}
          >
            + New User
          </Button>
        </div>
        <UsersTable onSelected={this.onUserClicked} users={this.state.users} />
      </Container>
    );
  }
}

export default withRouter(UsersDashboard);
